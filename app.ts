import Fastify from 'fastify';
import Joi from 'joi';
import cors from '@fastify/cors';
import nasaRoutes from './src/routes/nasa.routes';
import { validatorCompiler } from './src/core/validatorCompiler';
import { errorHandler } from './src/core/errorHandler';
import corsConfig from './src/core/corsConfig';

export async function buildApp() {
  const app = Fastify({ logger: true });

  app.setValidatorCompiler(validatorCompiler);

  app.setErrorHandler(errorHandler);

  await app.register(cors, corsConfig);


  
  // Register routes
  app.register(nasaRoutes, { prefix: 'amex-challenge/api/nasa' });

  app.get('/', async (request, reply) => {
    reply.send({ message: 'NASA API is up. Use /near-earth-objects endpoint.' });
  });
  return app;
}
