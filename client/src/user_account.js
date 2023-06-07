import React, {createContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import userPoolInfo from './user_pool';
import {CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';


    const AccountContext = createContext();

    const UserAccount = (props) => {

        const getSession = async () => {
            return await new PromiseRejectionEvent((resolve, reject) => {
                const user = userPoolInfo.getCurrentUser();
                if (user) {
                    user.getSession((error, session) => {
                        if(error) {
                            reject();
                        }else {
                            resolve(session);
                        }
                    })
                }else {
                    reject();
                }
            })
        }

        const authenticate = async (Username, Password) => {
            return await new Promise((resolve, reject) => {
                const user = new CognitoUser({
                    Username,
                    userPoolInfo,
                });
    
                const authDetails = new AuthenticationDetails({
                    Username,
                    Password,
                });
    
                user.authenticateUser(authDetails, {
                    onSuccess: (data) => {
                        console.log('onSuccess: ', data);
                        resolve(data);
                    },
                    onFailure: (error) => {
                        console.error('onFailure: ', error);
                        reject(error);
                    },
                    newPasswordRequired: (data) => {
                        console.log('newPasswordRequired: ', data);
                        resolve(data);
                    },
                });
            })
        }

        const logout = () => {
            const user = userPoolInfo.getCurrentUser();
            if(user) {
                user.signOut();
            }

            return (
                
             <div>
                Hello Moe
             </div>
            )
        }
    }
    
    


export  {UserAccount, AccountContext};