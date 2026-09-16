import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { CartProvider } from './context/CartContext';
import SkipLink from './components/common/SkipLink';
import { registerServiceWorker } from './utils/swRegister';
import './index.css';

// Register PWA service worker
registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <NotificationProvider>
          <CartProvider>
            <SkipLink />
            <App />
          </CartProvider>
        </NotificationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);


