const Joi = require('joi');

// TODO create enum for subscription
// TODO add error messages
const register = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

module.exports = { register };
