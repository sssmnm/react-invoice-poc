import React from 'react';
import ReactDOM from 'react-dom';
import "mdbreact/dist/css/mdb.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LayoutComponent from './LayoutComponent.js';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <LayoutComponent />
  </React.StrictMode>,
  document.getElementById('root')
);
