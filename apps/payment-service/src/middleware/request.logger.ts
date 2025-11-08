import { Context, Next } from 'hono';
import pino from 'pino';
import pretty from 'pino-pretty';

const logger = pino(
  { level: 'info' },
  pretty({
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname',
    singleLine: true,
    messageFormat: '{msg}',
  })
);

export const requestLogger = async (c: Context, next: Next) => {
  const start = process.hrtime();

  logger.info('');
  logger.info({
    msg: 'INCOMING',
    method: c.req.method,
    url: c.req.path,
    ip: c.env?.incoming?.socket?.remoteAddress || c.env?.incoming?.connection?.remoteAddress || 'unknown',
    query: Object.fromEntries(new URL(c.req.url).searchParams),
  });

  await next();

  const diff = process.hrtime(start);
  const durationMs = (diff[0] * 1e9 + diff[1]) / 1e6;

  logger.info({
    msg: 'RESPONSE',
    statusCode: c.res.status,
    duration: `${durationMs.toFixed(2)} ms`,
  });
};

export default logger;
