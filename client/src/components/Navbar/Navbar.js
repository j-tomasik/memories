import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar,  Avatar,  Button,  Toolbar, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

import useStyles from './styles'
import memories from '../../images/memories.png';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    console.log(user);

    useEffect(() => {
        const token = user;

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height ="60" />
            </div>

            <Toolbar className={classes.profile}>
                {user ? (
                    <div className={classes.profile}>
                        //make sure to console.log the profile to check and make sure where can be rendered
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.family_name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.family_name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={googleLogout}>Logout</Button>
                    </div>

                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>    
        </AppBar>
    )
}

export default Navbar