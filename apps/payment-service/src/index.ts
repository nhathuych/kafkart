import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { requestLogger } from './middleware/request.logger.js';
import { clerkMiddleware } from '@hono/clerk-auth';
import { shouldBeUser } from './middleware/auth.middleware.js';
import sessionRoute from './routes/session.route.js';
import webhookRoute from './routes/webhooks.route.js';
import { consumer, producer } from './utils/kafka.js';

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

app.route('/payments/sessions', sessionRoute);
app.route('/payments/webhooks', webhookRoute);

Promise.all([
  producer.connect(),
  consumer.connect(),
]);
const port = process.env.PORT || 3005;
serve({
  fetch: app.fetch,
  port: Number(port),
}, (info) => {
  console.log(`Payment Service is running on ${process.env.PAYMENT_SERVICE_URL}`)
});
