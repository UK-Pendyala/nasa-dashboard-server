import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export const errorHandler = (
  err: FastifyError,
  _req: FastifyRequest,
  reply: FastifyReply
) => {
  // @ts-ignore
  const details: any[] = err?.validation?.[0]?.details || err?.details || [];
  if (details.length) {
    const message = details.map(d => d.message.replace(/["]/g, '')).join('; ');
    return reply.status(400).send({ error: 'Bad Request', message });
  }

  // Log the error and send a generic response
  reply.log.error(err);
  reply.status(err.statusCode ?? 500).send({ error: 'Internal Error', message: err.message });
};