import React from "react";
import  ReactDOM  from "react-dom";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, legacy_createStore} from 'redux'
import {  applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';


import reducers from './reducers'

import App from "./App";
import './index.css';
import { FronteggProvider } from '@frontegg/react';
const contextOptions = {
    baseUrl: 'https://app-f7gyelfdzkyf.frontegg.com',
    clientId: 'af65d531-028c-4fd1-bf6b-918aabf8a4fe'
};

require('dotenv').config();

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
        <Provider store={store}>
            <App />
        </Provider>
    </FronteggProvider>,
    document.getElementById('root'));