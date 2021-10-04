import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { rootReducer } from './redux/rootReducer'
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

