// src/controllers/nasaController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { getNeoBriefs } from '../services/nasaService';
import { GetNeoBriefsParams } from '../types/';
import { addDays } from '../utils/date';

type Query = GetNeoBriefsParams;

/**
 * Handles the request to fetch Near-Earth Objects (NEOs) within a specified date range.
 *
 * @function getNeoObjects
 * @param {FastifyRequest<{ Querystring: GetNeoBriefsParams }>} req - The Fastify request object containing query parameters.
 * @param {FastifyReply} reply - The Fastify reply object used to send the response.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 *
 * @description
 * This controller processes the request to fetch NEO data:
 * - Calls the `getNeoBriefs` service to retrieve NEO summaries.
 * - Responds with the NEO data, including the start date, end date (defaulted to startDate + 7 days), count, and items.
 * - Handles errors from the upstream NASA API and logs them.
 */
export async function getNeoObjects(
  req: FastifyRequest<{ Querystring: Query }>,
  reply: FastifyReply,
) {
  const { startDate, endDate } = req.query;

  try {
    // Default endDate to startDate + 7 days if not provided (As per NASA API)
    const effectiveEndDate = endDate ? endDate : addDays(startDate, 7);
    const { items } = await getNeoBriefs({ startDate, effectiveEndDate });

    return reply.send({
      startDate,
      endDate: effectiveEndDate,
      count: items.length,
      items,
    });
  } catch (err: any) {
    req.log.error({ err }, 'Failed to fetch/transform NASA NEO feed');

    const status =
      (err?.response && Number.isInteger(err.response.status) && err.response.status) || 502;

    return reply.status(status).send({
      message: `Upstream NASA API failed. STATUS_CODE: ${status}`,
      error: err?.message ?? 'Unknown error',
    });
  }
}
