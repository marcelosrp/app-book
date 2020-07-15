import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from './utils/setAuthorizationToken'
import { setCurrentUser } from './actions/authActions';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

const token = localStorage.getItem('token');

if(token) {
    setAuthorizationToken(token);
    store.dispatch(setCurrentUser(jwt.decode(token)))
}

ReactDOM.render(
    <Provider store={store}>
        <App />    
    </Provider>, 
    document.getElementById('root')
);