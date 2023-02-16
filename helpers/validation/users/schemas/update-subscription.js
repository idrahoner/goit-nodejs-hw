const Joi = require('joi');

// TODO create enum for subscription
// TODO add error messages
const updateSubscription = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

module.exports = { updateSubscription };
