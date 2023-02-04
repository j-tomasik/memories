import React, { useState, useEffect } from 'react';
import { createOrGetUser } from '../../api/index';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes'
// import { useHistory } from 'react-router-dom';

// import Icon from './icon';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import useStyles from './styles';
// import Input from './Input';

import { GoogleLogin } from '@react-oauth/google';





const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    console.log('local storage at auth', localStorage)
    
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

