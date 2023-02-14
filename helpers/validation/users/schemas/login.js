const Joi = require('joi');

// TODO add error messages
const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});

module.exports = { login };
