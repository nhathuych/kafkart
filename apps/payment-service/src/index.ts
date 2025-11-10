import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { requestLogger } from './middleware/request.logger.js';
import { clerkMiddleware } from '@hono/clerk-auth';
import { shouldBeUser } from './middleware/auth.middleware.js';

const app = new Hono();

app.use('*', requestLogger);
app.use('*', clerkMiddleware())

app.get('/health', shouldBeUser, (c) => {
  return c.json({
    status: 'ok',
    service: 'payment-service',
    uptime: process.uptime(),
    timestamp: new Date().toLocaleString(),
    userId: c.get('userId'),
  });
});

const port = process.env.PORT || 3005;
serve({
  fetch: app.fetch,
  port: Number(port),
}, (info) => {
  console.log(`Payment Service is running on ${process.env.PAYMENT_SERVICE_URL}`)
});
