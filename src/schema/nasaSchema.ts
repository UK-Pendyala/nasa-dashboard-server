import Joi from "joi";

export const neoRangeJoi = {
  querystring: Joi.object({
    startDate: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required()
      .messages({
        "any.required": "startDate is required",
        "string.pattern.base": "startDate must be in YYYY-MM-DD format",
      }),
    endDate: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .messages({
        "string.pattern.base": "endDate must be in YYYY-MM-DD format",
      }),
  })
  .custom((value, helpers) => {
    const { startDate, endDate } = value;
    if (startDate && endDate && endDate < startDate) {
      return helpers.error('any.invalid', { message: 'endDate cannot be before startDate' });
    }
    return value;
  })
    .unknown(false)
    .messages({
      "object.unknown": "Only startDate and endDate are allowed",
      "any.invalid": "{{#message}}",
    }),
};
