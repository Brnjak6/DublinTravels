import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ItinerariesContextProvider } from './context/ItineraryContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ItinerariesContextProvider>
        <App />
      </ItinerariesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
