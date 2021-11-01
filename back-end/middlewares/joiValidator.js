const Joi = require('joi');

const schema = Joi.object({
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

module.exports = {
  schema,
};
