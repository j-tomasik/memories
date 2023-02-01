import React from "react";
import  ReactDOM  from "react-dom";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, legacy_createStore} from 'redux'
import {  applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';


import reducers from './reducers'

import App from "./App";
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";


require('dotenv').config();

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(

        <GoogleOAuthProvider client_id={process.env.GOOGLE_API_TOKEN}>
            <Provider store={store}>           
                <App />               
            </Provider>,
        </GoogleOAuthProvider>,
            

    document.getElementById('root'));