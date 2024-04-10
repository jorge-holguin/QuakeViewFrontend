import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Asegúrate de que el elemento exista usando una aserción de tipo 'as'.
const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Pasa una función a reportWebVitals si deseas medir el rendimiento.
// Aquí se usa console.log como ejemplo.
reportWebVitals(console.log);

// Si no deseas utilizar reportWebVitals, simplemente puedes comentar o eliminar la línea anterior.
