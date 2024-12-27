// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './Compenents/CartContext'; // Assurez-vous que le chemin et la casse du dossier sont corrects

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
