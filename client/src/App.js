import React, { useState, useEffect} from 'react';
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from "react-router-dom";


import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';


const App = () => {

    return(
        
            <BrowserRouter>
                <Container maxwidth="lg">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={Home}/>
                    </Switch>
                    
                </Container>
            </BrowserRouter>
    
            
        
        
        
    )
}

export default App;

