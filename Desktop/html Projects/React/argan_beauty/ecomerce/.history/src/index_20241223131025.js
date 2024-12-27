import React from 'react';
import ReactDOM from 'react-dom/client'; // Utilisation de 'react-dom/client' pour React 18+
import App from './App';
import './index.css'; // Si vous avez un fichier CSS global

const root = ReactDOM.createRoot(document.getElementById('root')); // Créer un root pour l'application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
