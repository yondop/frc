/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import './styles/style.scss';
import 'font-awesome/css/font-awesome.css';
import App from './components/App';
import configureStore from './store/configureStore';
import {load} from './actions/gameActions';
import grid from './constants/grid';

let store = configureStore();
store.dispatch(load(grid));


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
