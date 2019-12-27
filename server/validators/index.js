const Joi = require('@hapi/joi');

const indexSchema = Joi.object().keys({ 
  name: Joi.string().required().min(3).max(20), 
  message: Joi.string().required().min(5), 
  email: Joi.string().email().required().min(3).max(20),
});

module.exports = indexSchema;