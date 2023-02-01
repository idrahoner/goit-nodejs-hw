const Joi = require('joi');

const schemaAdd = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'missing required name field',
    'string.min': 'name length must be at least 3 characters long',
    'string.max':
      'name length must be less than or equal to 30 characters long',
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({
      'any.required': 'missing required email field',
      'string.email': 'email must be valid',
    }),
  phone: Joi.string()
    .pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .required()
    .messages({
      'any.required': 'missing required phone field',
      'string.pattern.base': 'phone number must be digits',
    }),
}).messages({ 'object.unknown': 'extra fields are present' });

module.exports = {
  schemaAdd,
};
