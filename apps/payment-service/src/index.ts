import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { requestLogger } from './middleware/request.logger.js';

const app = new Hono();

app.use('*', requestLogger);

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    service: 'payment-service',
    uptime: process.uptime(),
    timestamp: new Date().toLocaleString(),
  });
});

const port = process.env.PORT || 3005;
serve({
  fetch: app.fetch,
  port: Number(port),
}, (info) => {
  console.log(`Payment Service is running on ${process.env.PAYMENT_SERVICE_URL}`)
});
