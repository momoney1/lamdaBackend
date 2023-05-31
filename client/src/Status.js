import React, {useSate, useContext, useEffect} from 'react';
import {AccountContext} from './user_account';

const Status = () => {
    const [status, setStatus] = useSate(false);
    const [getSession, logout] = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then(session => {
                console.log('Session: ', session);
                setStatus(true);
            })
    }, [])

    return <div>
        {status ? <button onClick={logout}>Logout</button> : 'Please login'}
    </div>

};

export default Status;