import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppBar,  Avatar,  Button,  Toolbar, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

import useStyles from './styles'
import memories from '../../images/memories.png';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory()
    

    useEffect(() => {

        setUser(JSON.parse(localStorage.getItem('profile')));
        console.log('local stoage on load', localStorage)
        console.log('user obj on load', user);
    }, []);

    const logOut = () => {
        googleLogout();
        setUser(null);
        dispatch({type: LOGOUT});
        history.push('/')
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height ="60" />
            </div>

            <Toolbar className={classes.profile}>
                {user ? (
                    <div className={classes.profile}>
                        //change these values based on what the user obj holds from console log
                        <Avatar alt={user.name} src={user.picture}>{console.log(user)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>Welcome {user.family_name}!</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logOut}>Logout</Button>
                    </div>

                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>    
        </AppBar>
    )
}

export default Navbar