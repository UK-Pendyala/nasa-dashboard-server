import Fastify from 'fastify';
import Joi from 'joi';
import cors from '@fastify/cors';
import nasaRoutes from './src/routes/nasa.routes';
import { validatorCompiler } from './src/core/validatorCompiler';
import { errorHandler } from './src/core/errorHandler';

export async function buildApp() {
  const app = Fastify({ logger: true });

  app.setValidatorCompiler(validatorCompiler);

  app.setErrorHandler(errorHandler);

  await app.register(cors, {
    origin: (origin, cb) => {
      const allowlist = [
        'http://localhost:3001',
        'http://127.0.0.1:3001'
      ];
      if (!origin) return cb(null, true);
      cb(null, allowlist.includes(origin));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  // Register routes
  app.register(nasaRoutes, { prefix: 'amex-challenge/api/nasa' });

  app.get('/', async (request, reply) => {
    reply.send({ message: 'NASA API is up. Use /near-earth-objects endpoint.' });
  });
  return app;
}
