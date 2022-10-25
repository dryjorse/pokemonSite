import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './redux/store';
import { Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(rootReducer, applyMiddleware(thunk))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);