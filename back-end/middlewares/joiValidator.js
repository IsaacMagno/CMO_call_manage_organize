const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .required(),
});

const registerSchema = Joi.object({
  username: Joi.string()
    .max(30)
    .min(3)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    .required(),
});

const taskSchema = Joi.object({
  task: Joi.string()
    .min(10)
    .max(100)
    .required(),
  priority: Joi.string()
    .min(3)
    .max(10)
    .required(),
});

const idSchema = Joi.object({
  id: Joi.objectId()
    .required(),
});

module.exports = {
  loginSchema,
  registerSchema,
  taskSchema,
  idSchema,
};
