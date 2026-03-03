import { createProxyMiddleware } from 'http-proxy-middleware';
import { RequestHandler } from 'express';

export function createServiceProxy(target: string): RequestHandler {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    timeout: 30000,
    proxyTimeout: 30000,
    onError: (err, req, res) => {
      console.error(`Proxy Error for ${target}: ${err.message}`);
      res.status(502).send({
        error: 'Bad Gateway',
        message: 'The upstream service is currently unavailable or timed out.',
        target
      });
    }
  });
}
