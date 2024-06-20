import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Redux/store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// import * as serviceWorkerRegistration from './service-worker';
const root = ReactDOM.createRoot(document.getElementById('root'));
// chek the registraion of service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}



root.render(
  <React.StrictMode>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
     
      <App />
    
      </PersistGate>
      </Provider>
  
  </React.StrictMode>
);

// Register the service worker
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
