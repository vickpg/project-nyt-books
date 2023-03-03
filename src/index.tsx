import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const API_KEY = "OOZ7G7O3d1VuZ2AIXmaHG3viqKwWNAjJ"

fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`)
  .then(response => response.json())
  .then(data => console.log(data));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
