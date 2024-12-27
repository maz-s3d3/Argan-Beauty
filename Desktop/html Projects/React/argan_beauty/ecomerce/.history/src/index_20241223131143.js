import React from 'react';
import ReactDOM from 'react-dom/client'; // Utilisez 'react-dom/client' pour React 18+
import App from './App';
import { CartProvider } from './Components/CartContext'; // Vérifiez bien le chemin du fichier

// Obtenez l'élément root du DOM
const rootElement = document.getElementById('root');

// Créez la racine React
const root = ReactDOM.createRoot(rootElement);

// Rendre l'application
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
