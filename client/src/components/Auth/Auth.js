import React from 'react';
import { createOrGetUser } from '../../api/index';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes'


import { GoogleLogin } from '@react-oauth/google';





const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    
    return (
    
            <GoogleLogin
                onSuccess={(response) => {
                    let decodedData = createOrGetUser(response);
                    dispatch({ type: AUTH, data: decodedData});

                    history.push('/'); 
                }}
                onError={() => {
                    console.log('Login Failed');
            }}/>
    
        
//        
    )
}

export default Auth;

