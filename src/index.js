import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { makeServer } from './server';

import { BrowserRouter as Router } from 'react-router-dom';
import { VideoProvider, ThemeProvider, AuthProvider } from './context';

// Call make Server
makeServer();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <VideoProvider>
        <ThemeProvider>
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </VideoProvider>
    </AuthProvider>
  </React.StrictMode>
);
