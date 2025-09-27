import Fastify from 'fastify';
import cors from '@fastify/cors';
import nasaRoutes from './src/routes/nasa.routes';
import { validatorCompiler } from './src/core/validatorCompiler';
import { errorHandler } from './src/core/errorHandler';
import corsConfig from './src/core/corsConfig';
import path from 'path';


import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';



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

  await app.register(swagger, {
    mode: 'static',
    specification: {
      path: path.resolve(process.cwd(), 'docs/openapi.yaml'),
      baseDir: path.resolve(process.cwd(), 'docs'),
    },
  });
  await app.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'list', deepLinking: false }
  });
  return app;
}
