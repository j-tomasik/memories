import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { getPosts } from './actions/posts'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './images/memories.png';
import useStyles from './styles';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    
    return(
        <Container maxwidth="lg">
            <Navbar />
            <Home />
        </Container>
    )
}

export default App;

{/* <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height ="60" />
            </AppBar> */}