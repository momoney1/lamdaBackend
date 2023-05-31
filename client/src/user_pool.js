import {CognitoUserPool} from 'amazon-cognito-identity-js';

const userPoolInfo = {
    UserPoolId: 'us-east-1_GgidSg7RH',
    ClientId: '7ftmd0ihnjnr497gddf2gon4oj'
}

export default new CognitoUserPool(userPoolInfo);