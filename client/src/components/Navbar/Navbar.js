import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar,  Avatar,  Button,  Toolbar, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { googleLogout } from '@react-oauth/google';

import useStyles from './styles'
import memories from '../../images/memories.png';
import memories_header from '../../images/memories_header.png';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    

    useEffect(() => {

        setUser(JSON.parse(localStorage.getItem('profile')));
        // console.log('user in useEffect', user);
        // console.log('local storage in useEffect', localStorage)
        // if(user && Object.keys(user).length === 0) {
        //     setUser(null);
        // };
        // console.log('user after if check', user)
    }, [location]);

    const logOut = () => {
        googleLogout();
        
        dispatch({type: LOGOUT});
        history.push('/auth');
        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to='/' className={classes.brandContainer}>
                {/* <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Photos</Typography> */}
                <img src={memories_header} alt="icon" height="45px" />
                <img className={classes.image} src={memories} alt="memories" height ="60" />
            </Link>

            <Toolbar className={classes.profile}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar alt={user.name} src={user.picture} color='blue'></Avatar>
                        <Typography className={classes.userName} variant='h6'>Welcome {user.given_name}!</Typography>
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