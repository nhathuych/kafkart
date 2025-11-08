import pino from 'pino';
import pretty from 'pino-pretty';
import { Request, Response, NextFunction } from 'express';

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

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  logger.info('');
  logger.info({
    msg: 'INCOMING',
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    query: req.query,
  });

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const durationMs = (diff[0] * 1e9 + diff[1]) / 1e6;

    logger.info({
      msg: 'RESPONSE',
      statusCode: res.statusCode,
      duration: `${durationMs.toFixed(2)} ms`,
    });
  });

  next();
};

export default logger;
