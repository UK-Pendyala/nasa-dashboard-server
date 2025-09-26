import Joi from 'joi';

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