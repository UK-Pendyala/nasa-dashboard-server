import Joi from 'joi';

/**
 * A custom validator compiler for Fastify that uses Joi for schema validation.
 *
 * @function validatorCompiler
 * @param {object} params - The parameters for the validator compiler.
 * @param {Joi.Schema} params.schema - The Joi schema to validate the data against.
 * @returns {Function} A validation function that takes the data to be validated.
 *
 * @description
 * This function validates the provided data against the defined Joi schema. It collects all validation issues,
 * disallows unknown properties, and returns either the validated value or the validation error.
 *
 */

export const validatorCompiler = ({ schema }: { schema: Joi.Schema }) => {
  return (data: unknown) => {
    const { error, value } = schema.validate(data, {
      abortEarly: false, // collect all issues
      allowUnknown: false,
    });
    if (error) return { error };
    return { value };
  };
};