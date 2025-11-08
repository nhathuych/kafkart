import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_CLIENT_URL!, process.env.FRONTEND_ADMIN_URL!],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: (req: any) => (req.user ? 1000 : 100), // limit each IP to 100 requests per windowMs for unauthenticated users
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req: any) => req.ip,
});
app.use(limiter);

app.get('/health-check', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

// app.use(
//   '/api/v1/products',
//   createProxyMiddleware({
//     target: process.env.PRODUCT_SERVICE_URL!,
//     changeOrigin: true,
//     pathRewrite: { '^/api/v1/products': '/products' },
//     on: {
//       error: (err, req, res) => {
//         console.error('Proxy error:', err);
//         (res as any).status(502).json({ message: 'Product service unavailable', error: err.message });
//       },
//     },
//   })
// );

const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  console.log(`API Gateway is running at ${process.env.API_GATEWAY_URL}`);
});
server.on('error', console.error);
