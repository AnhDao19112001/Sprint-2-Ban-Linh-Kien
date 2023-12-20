import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import thunk from "redux-thunk";
import cartReducer from "./component/order/reduce/cartReducer";
import actionChat from "./component/chatbox/reduceChat/actionChat";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";

const middleware = [thunk];
const rootReduce = combineReducers({
    cartReducer,
    actionChat
});

const store = createStore(rootReduce, applyMiddleware(...middleware));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
