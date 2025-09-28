import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

/**
 * Custom error handler for Fastify to handle validation and internal server errors.
 *
 * @function errorHandler
 * @param {FastifyError} err - The error object thrown during request processing.
 * @param {FastifyRequest} _req - The incoming Fastify request.
 * @param {FastifyReply} reply - The Fastify reply object used to send the response.
 *
 * @description
 * This error handler processes both validation errors and internal server errors:
 * - Validation Errors:
 *   - Extracts validation details from the error object.
 *   - Constructs a user-friendly error message by joining all validation messages.
 *   - Responds with a 400 Bad Request status and the constructed message.
 * - Internal Server Errors:
 *   - Logs the error for debugging purposes.
 *   - Responds with a 500 Internal Error status and the error message.
 */
export const errorHandler = (err: FastifyError, _req: FastifyRequest, reply: FastifyReply) => {
  // @ts-expect-error  @typescript-eslint/ban-ts-comment
  const details: any[] = err?.validation?.[0]?.details || err?.details || [];
  if (details.length) {
    const message = details.map((d) => d.message.replace(/["]/g, '')).join('; ');
    return reply.status(400).send({ error: 'Bad Request', message });
  }
  reply.log.error(err);
  reply.status(err.statusCode ?? 500).send({ error: 'Internal Error', message: err.message });
};
