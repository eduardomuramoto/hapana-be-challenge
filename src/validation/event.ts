import Joi from 'joi';

export const eventValidationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Event name must be at least 3 characters long.',
      'string.max': 'Event name cannot exceed 100 characters.',
      'any.required': 'Event name is required.',
    }),

  dateTime: Joi.date()
    .iso()
    .required()
    .messages({
      'any.required': 'Event date/time is required.',
    }),

  type: Joi.string()
  .min(3)
  .max(100)
  .required()
  .messages({
    'string.min': 'Event type must be at least 3 characters long.',
    'string.max': 'Event type cannot exceed 100 characters.',
    'any.required': 'Event type is required.',
  }),

  location: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.length': 'Location ID must be a valid 24-character hexadecimal string.',
      'any.required': 'Event location is required.',
    }),

  description: Joi.string()
    .allow('')
    .required()
    .max(500)
    .messages({
      'string.max': 'Event description cannot exceed 500 characters.',
      'any.required': 'Event description is required.',
    }),

  tags: Joi.array()
    .items(Joi.string())
    .optional()
    .messages({
      'array.base': 'Tags must be an array of strings.',
    }),
});
