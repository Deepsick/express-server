const Joi = require('@hapi/joi');

const productSchema = Joi.object().keys({ 
  name: Joi.string().required().min(3).max(20), 
  price: Joi.string().required(), 
});

const skillsSchema = Joi.object({ 
  age: Joi.number().integer().required().positive(), 
  concerts: Joi.number().integer().required().positive(), 
  cities: Joi.number().integer().required().positive(), 
  years: Joi.number().integer().required().positive(), 
});

module.exports = {
  productSchema,
  skillsSchema,
};