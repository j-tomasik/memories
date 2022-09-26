import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux';

import useStyles from './styles'
import memories from '../../images/memories.png';
import { ContextHolder } from '@frontegg/rest-api';
import { useAuth, useLoginWithRedirect, AdminPortal, useAuthActions } from "@frontegg/react";

const Navbar = () => {
    const classes = useStyles();
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // const dispatch = useDispatch();
    // const history = useHistory();
    // const location = useLocation();

    const { switchTenant } = useAuthActions();
    const { user, isAuthenticated } = useAuth();
    const loginWithRedirect = useLoginWithRedirect();

    useEffect(() => {
        if (!isAuthenticated) {
            loginWithRedirect();
        }
    }, [isAuthenticated, loginWithRedirect]);

    const logout = () => {
        const baseUrl = ContextHolder.getContext().baseUrl;
        window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
    };

    const handleClick = () => {
        AdminPortal.show();
    };

    const handleSwitchTenant = () => {
        switchTenant({ tenantId: 'new-tenant-id' });
    }

    

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height ="60" />
            </div>
            <Toolbar className={classes.toolbar}>

                <div className="App">
                    {isAuthenticated ? (
        <div>
            <div>
                <img src={user?.profilePictureUrl} alt={user?.name}/>
            </div>
            <div>
                <span>Logged in as: {user?.name}</span>
            </div>
            <div>
                <button onClick={() => alert(user.accessToken)}>What is my access token?</button>
            </div>
            <div>
                <button onClick={() => logout()}>Click to logout</button>
            </div>
            <button onClick={handleClick}>Settings</button>
            <button onClick={handleSwitchTenant}>Select Active Tenant</button>
        </div>
        ) : (
            <div>
            <button onClick={() => loginWithRedirect()}>Click me to login</button>
            </div>
        )}
                </div>
            </Toolbar>
    </AppBar>
    )
}

export default Navbar