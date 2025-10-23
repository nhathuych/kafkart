import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from '@packages/error-handler/error-middleware';
import authRouter from './routes/auth.router';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(errorMiddleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/docs-json', (req, res) => {
  res.json(swaggerDocument);
})

app.get('/', (req, res) => {
  res.send({ 'message': 'Hello from Auth Service!'});
});

app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  console.log(`Auth service is running at ${process.env.AUTH_SERVICE_URL}`);
  console.log(`Swagger Docs available at ${process.env.AUTH_SERVICE_URL}/api-docs`)
})
server.on('error', console.error);
