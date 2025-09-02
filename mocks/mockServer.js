// src/mocks/mockServer.js
// This file starts the MSW worker in development mode

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./browser');
  worker.start();
}
