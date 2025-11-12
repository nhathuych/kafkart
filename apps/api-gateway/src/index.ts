import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { createServiceProxy, services } from './config/proxy.config.js';

const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_CLIENT_URL!, process.env.FRONTEND_ADMIN_URL!],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.set('trust proxy', 1);

// Register proxy routes before body-parsing middlewares.
// This ensures the raw request body is preserved for proxied services.
services.forEach((route) => {
  app.use(route.prefix, createServiceProxy(route));
});

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: (req: any) => (req.user ? 1000 : 100), // limit each IP to 100 requests per windowMs for unauthenticated users
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req: any) => req.ip,
  skip: (req) => (req.path.endsWith('/health') || req.path === '/healthz'),
});
app.use(limiter);

app.get('/healthz', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'api-gateway',
    uptime: process.uptime(),
    timestamp: new Date().toLocaleString(),
  });
});

const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  console.log(`API Gateway is running at ${process.env.API_GATEWAY_URL}`);
});
server.on('error', console.error);
