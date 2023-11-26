import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENTID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT
      }}
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);
