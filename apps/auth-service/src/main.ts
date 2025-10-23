import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send({ 'message': 'Hello from Auth Service!'});
});

const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  console.log(`Auth service is running at ${process.env.AUTH_SERVICE_URL}`);
})
server.on('error', console.error);
