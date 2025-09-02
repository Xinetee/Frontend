import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// Add a console log to confirm when MSW is loaded
console.log('MSW browser module loaded');
