import express, { NextFunction, Request, Response } from 'express';
import { requestLogger } from './middleware/request.logger.js';
import { clerkMiddleware } from '@clerk/express';
import { shouldBeUser } from './middleware/auth.middleware.js';
import productRouter from './routes/product.route.js';
import categoryRouter from './routes/category.route.js';
import { consumer, producer } from './utils/kafka.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(clerkMiddleware());

app.get('/health', shouldBeUser, (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'product-service',
    uptime: process.uptime(),
    timestamp: new Date().toLocaleString(),
    userId: req.userId,
  });
});

app.use('/products', productRouter);
app.use('/categories', categoryRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  return res.status(error.status || 500).json({ message: error.message || 'Internal Server Error!' });
});

Promise.all([
  producer.connect(),
  consumer.connect(),
]);
const port = process.env.PORT || 3003;
const server = app.listen(port, () => {
  console.log(`Product Service is running at ${process.env.PRODUCT_SERVICE_URL}`);
});
server.on('error', console.error);
