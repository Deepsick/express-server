const Joi = require('@hapi/joi'); 

const loginSchema = Joi.object().keys({ 
  email: Joi.string().email().required().min(3).max(20),
  password: Joi.string().required().min(5).max(20), 
});

module.exports = loginSchema;