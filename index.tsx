import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // We use a relative path to the current window location to ensure 
    // the service worker is registered on the correct origin.
    const swPath = new URL('./sw.js', window.location.href).pathname;
    navigator.serviceWorker.register(swPath).catch(err => {
      console.error('SW registration failed: ', err);
    });
  });
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);