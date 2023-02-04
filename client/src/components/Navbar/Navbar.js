import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar,  Avatar,  Button,  Toolbar, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

import useStyles from './styles'
import memories from '../../images/memories.png';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch()
    

    useEffect(() => {
        const token = user;

        setUser(JSON.parse(localStorage.getItem('profile')));
        console.log(user);
    }, []);

    const logOut = () => {
        googleLogout();
        setUser(null);
        dispatch({type: 'LOGOUT'})
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
                        <Avatar className={classes.purple} alt={user.name} src={user.picture}>{user.family_name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.family_name}</Typography>
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