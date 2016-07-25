import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Life from './components/Life';

ReactDOM.render(<Life />, document.getElementById('app'));