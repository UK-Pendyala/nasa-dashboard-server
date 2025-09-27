import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import path from 'path';

export async function registerSwagger(app: FastifyInstance) {
  // Register Swagger for OpenAPI specification
  await app.register(swagger, {
    mode: 'static',
    specification: {
      path: path.resolve(process.cwd(), 'docs/openapi.yaml'),
      baseDir: path.resolve(process.cwd(), 'docs'),
    },
  });

  // Register Swagger UI for interactive API documentation
  await app.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'list', deepLinking: false },
  });
}