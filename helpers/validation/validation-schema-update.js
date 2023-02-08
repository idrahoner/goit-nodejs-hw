const Joi = require('joi');

const schemaUpdate = Joi.object({
  name: Joi.string().min(3).max(30).optional().messages({
    'string.min': 'name length must be at least 3 characters long',
    'string.max':
      'name length must be less than or equal to 30 characters long',
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .optional()
    .messages({
      'string.email': 'email must be valid',
    }),
  phone: Joi.string()
    .pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .optional()
    .messages({
      'string.pattern.base': 'phone number must be digits',
    }),
  favorite: Joi.boolean().optional().messages({
    'boolean.base': 'favorite must be a boolean',
  }),
})
  .min(1)
  .messages({
    'object.unknown': 'extra fields are present',
    'object.min': 'missing fields',
  });

module.exports = {
  schemaUpdate,
};
