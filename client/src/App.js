import React from "react";
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from "react-router-dom";


import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from "./components/Auth/Auth";

const App = () => {



    return(
        <BrowserRouter>
            <Container maxwidth="lg">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/auth" exact component={Auth}/>
                </Switch>
                
            </Container>
        </BrowserRouter>
        
    )
}

export default App;

{/* <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height ="60" />
            </AppBar> */}