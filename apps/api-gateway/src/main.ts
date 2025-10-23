/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import proxy from 'express-http-proxy';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(cors({
  origin: [process.env.API_GATEWAY_URL!],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req: any) => (req.user ? 1000 : 100),
  message: { error: 'Too many requests. Please try again later!' },
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req: any) => req.ip,
});
app.use(limiter);

app.get('/health-check', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

app.use('/', proxy(process.env.AUTH_SERVICE_URL!))

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Listening at ${process.env.API_GATEWAY_URL}`);
});
server.on('error', console.error);
