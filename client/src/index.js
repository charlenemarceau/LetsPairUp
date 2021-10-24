import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers/rootReducer';
import {getUsers } from './actions/users.actions';
import {getPosts } from './actions/post.actions';

// dev tools
import { composeWithDevTools } from "redux-devtools-extension";

// creating store 
const store = createStore (
  rootReducer, composeWithDevTools (applyMiddleware(thunk))
)

store.dispatch(getUsers());
store.dispatch(getPosts());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

