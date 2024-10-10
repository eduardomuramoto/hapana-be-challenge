import Joi from 'joi';

export const locationValidationSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9\- ]+$/)
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Location name must be at least 3 characters long.',
      'string.max': 'Location name cannot exceed 100 characters.',
      'any.required': 'Location name is required.',
    }),
  type: Joi.string()
    .valid('class', '1-on-1', 'workshop')
    .required()
    .messages({
      'any.only': 'Location type must be one of: class, 1-on-1, workshop.',
      'any.required': 'Location type is required.',
    }),
    tags: Joi.array()
    .items(Joi.string())
    .optional()
    .messages({
      'array.base': 'Tags must be an array of strings.',
    }),
});