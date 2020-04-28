import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { Provider } from 'react-redux';
import store from './redux/store/store.js';

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>, document.getElementById('root'));
