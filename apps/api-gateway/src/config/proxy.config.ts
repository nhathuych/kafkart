import express from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

export type ServiceRoute = {
  prefix: string;
  rewriteTo: string;
  targetEnv: string;
};

export const services: ServiceRoute[] = [
  {
    prefix: '/api/v1/products',
    rewriteTo: '/products',
    targetEnv: 'PRODUCT_SERVICE_URL',
  },
  {
    prefix: '/api/v1/orders',
    rewriteTo: '/orders',
    targetEnv: 'ORDER_SERVICE_URL',
  },
  {
    prefix: '/api/v1/payments',
    rewriteTo: '/payments',
    targetEnv: 'PAYMENT_SERVICE_URL',
  },
];

export const createServiceProxy = (route: ServiceRoute): express.RequestHandler => {
  const target = process.env[route.targetEnv];
  if (!target) {
    console.error(`Missing environment variable: ${route.targetEnv}`);
    process.exit(1);
  }

  const options: Options = {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${route.prefix}`]: route.rewriteTo,
    },
    on: {
      proxyReq: (proxyReq, req) => {
        (req as any).startTime = Date.now();
        console.log(`\n\nPROXY → ${req.method} ${req.url} → ${target}${proxyReq.path}`);
      },
      proxyRes: (proxyRes, req, res) => {
        const duration = Date.now() - (req as any).startTime;
        console.log(`PROXY ← ${req.method} ${req.url} [${proxyRes.statusCode}] ${duration}ms`);
      },
      error: (err, req, res) => {
        console.error(`Proxy error [${route.prefix} → ${target}]:`, err.message);
        (res as any).status(502).json({
          message: `${route.rewriteTo.slice(1)} service unavailable`,
          error: err.message,
        });
      },
    },
  };

  return createProxyMiddleware(options);
};
