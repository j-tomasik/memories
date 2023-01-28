// import React, { useState, useEffect } from 'react';
// import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'

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
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
        }}/>
//        
    )
}

export default Auth;

