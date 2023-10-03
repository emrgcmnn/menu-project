// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProductProvider } from './ProductContext';
import "./index.css"
ReactDOM.render(
  <ProductProvider>
    <App />
  </ProductProvider>,
  document.getElementById('root')
);
