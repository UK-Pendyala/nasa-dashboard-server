import Fastify from 'fastify';
import Joi from 'joi';
import cors from '@fastify/cors';
import nasaRoutes from './src/routes/nasa.routes';

export async function buildApp() {
  const app = Fastify({ logger: true });

  app.setValidatorCompiler(({ schema }) => {
    // schema here is a Joi schema
    return (data) => {
      const { error, value } = (schema as Joi.Schema).validate(data, {
        abortEarly: false, // collect all issues
        allowUnknown: false
      });
      if (error) return { error };
      return { value };
    };
  });

  app.setErrorHandler((err, _req, reply) => {
    // @ts-ignore
    const details: any[] = err?.validation?.[0]?.details || err?.details || [];
    if (details.length) {
      const message = details.map(d => d.message.replace(/["]/g, '')).join('; ');
      return reply.status(400).send({ error: 'Bad Request', message });
    }
    app.log.error(err);
    reply.status(err.statusCode ?? 500).send({ error: 'Internal Error', message: err.message });
  });

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
