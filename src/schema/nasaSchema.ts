import Joi from 'joi';
import { addDays } from '../utils/date';

/**
 * @constant neoRangeJoi
 * Joi schema for validating the query parameters for fetching NEO data within a date range.
 *
 * @property {object} querystring - The schema for the query parameters.
 *   @property {string} startDate - The start date in YYYY-MM-DD format (required).
 *     - Validation: Must match the pattern /^\d{4}-\d{2}-\d{2}$/.
 *     - Error Messages:
 *       - "startDate is required"
 *       - "startDate must be in YYYY-MM-DD format"
 *   @property {string} [endDate] - The optional end date in YYYY-MM-DD format.
 *     - Validation: Must match the pattern /^\d{4}-\d{2}-\d{2}$/.
 *     - Error Message:
 *       - "endDate must be in YYYY-MM-DD format"
 *   @custom Validation:
 *     - Ensures `endDate` is not earlier than `startDate`.
 *     - Error Message: "endDate cannot be before startDate"
 *   @unknown(false):
 *     - Ensures no additional properties are allowed.
 *     - Error Message: "Only startDate and endDate are allowed"
 */
export const neoRangeJoi = {
  querystring: Joi.object({
    startDate: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required()
      .messages({
        'any.required': 'start date is required',
        'string.pattern.base': 'start date must be in YYYY-MM-DD format',
      }),
    endDate: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .messages({
        'string.pattern.base': 'end date must be in YYYY-MM-DD format',
      }),
  })
    .custom((value, helpers) => {
      const { startDate, endDate } = value;

      if (startDate && endDate) {
        if (new Date(addDays(startDate, 7)) < new Date(endDate)) {
          return helpers.error('any.invalid', {
            message: 'Maximum range you can select is 7 days',
          });
        }
        if (new Date(endDate) < new Date(startDate)) {
          return helpers.error('any.invalid', { message: 'End date cannot be before start date' });
        }
      }
      return value;
    })
    .unknown(false)
    .messages({
      'object.unknown': 'Only start date and end date are allowed',
      'any.invalid': '{{#message}}',
    }),
};
