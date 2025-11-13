import Fastify from 'fastify';
import Clerk from '@clerk/fastify';
import { shouldBeUser } from './hooks/auth.hook.js';
import { connectToOrderDB } from '@repo/order-db';
import { orderRoute } from './routes/order.route.js';

const fastify = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
        singleLine: true,
        messageFormat: '{msg}',
      },
    },
  },
  disableRequestLogging: true,
});

fastify.addHook('onRequest', async (request, reply) => {
  (request as any).startTime = process.hrtime();
  request.log.info({
    msg: 'INCOMING',
    method: request.method,
    url: request.url,
    ip: request.ip,
    query: request.query,
  });
});

fastify.addHook('onResponse', async (request: any, reply) => {
  const diff = process.hrtime(request.startTime);
  const durationMs = (diff[0] * 1e9 + diff[1]) / 1e6;

  request.log.info({
    msg: 'RESPONSE',
    statusCode: reply.statusCode,
    ip: request.ip,
    duration: `${durationMs.toFixed(2)} ms`,
  });
  console.log();
});

fastify.register(Clerk.clerkPlugin);
fastify.register(orderRoute, { prefix: '/orders' });

fastify.get('/health', { preHandler: shouldBeUser }, async (request, reply) => {
  reply.status(200).send({
    status: 'ok',
    service: 'order-service',
    uptime: process.uptime(),
    timestamp: new Date().toLocaleString(),
    userId: request.userId,
  });
});

await connectToOrderDB();
const port = process.env.PORT || 3004;
fastify.listen({ port: Number(port) }, (err, address) => {
  if (err) throw err;
  console.log(`Order Service is running at ${process.env.ORDER_SERVICE_URL}`);
});
