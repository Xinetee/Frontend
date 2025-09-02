
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize MSW in development mode
async function initMocks() {
  if (import.meta.env.MODE === 'development') {
    console.log('Development mode detected, initializing MSW...');
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass', // 'warn' to see warnings for unhandled requests
    });
    console.log('MSW worker started');
  }
}

// Start MSW and then render the app
initMocks().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});