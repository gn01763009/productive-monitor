import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const html = `<div id="root"></div>`;
document.querySelector('body').innerHTML = html;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
