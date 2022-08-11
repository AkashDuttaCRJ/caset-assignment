import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PicstoreProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PicstoreProvider>
      <App />
    </PicstoreProvider>
  </React.StrictMode>
);
