import express, { Request, Response } from 'express';
import { requestLogger } from './middleware/request.logger.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'product-service',
    uptime: process.uptime(),
    timestamp: new Date().toLocaleString(),
  });
});

const port = process.env.PORT || 3003;
const server = app.listen(port, () => {
  console.log(`Product Service is running at ${process.env.PRODUCT_SERVICE_URL}`);
});
server.on('error', console.error);
