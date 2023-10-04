// src/index.js
import React from 'react';
import App from './App';
import { ProductProvider } from './ProductContext';
import "./index.css";
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');
const appRoot = createRoot(root);

appRoot.render(
  <ProductProvider>
    <App />
  </ProductProvider>
);
