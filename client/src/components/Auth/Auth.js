import React, { useState, useEffect } from 'react';
import { createOrGetUser } from '../../api/index';

// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// import Icon from './icon';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import useStyles from './styles';
// import Input from './Input';

import { GoogleLogin } from '@react-oauth/google';





const Auth = () => {
    
    return (
    
            <GoogleLogin
                onSuccess={(response) => {
                    createOrGetUser(response);
                }}
                onError={() => {
                    console.log('Login Failed');
            }}/>
    
        
//        
    )
}

export default Auth;

