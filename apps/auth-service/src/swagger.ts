import swaggerAutogen from 'swagger-autogen';
import 'dotenv/config';

const url = new URL(process.env.AUTH_SERVICE_URL!);
const host = `${url.hostname}:${url.port}`  // "localhost:3002"
const scheme = url.protocol.replace(':', '')  // "http"

const doc = {
  info: {
    title: 'Auth Service API',
    description: 'Automatically generated Swagger documents',
    version: '1.0.0',
  },
  host,
  basePath: '/api/v1/auth',
  schemes: [scheme],
};

const outputFile = "./swagger-output.json";
const endpointFiles = ["./routes/auth.router.ts"];

swaggerAutogen()(outputFile, endpointFiles, doc);
