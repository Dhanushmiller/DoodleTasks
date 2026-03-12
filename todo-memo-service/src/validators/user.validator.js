const Joi = require("joi");

const signupSchema = Joi.object({

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .required(),

  name: Joi.string()
    .min(3)
    .required()

});

const loginSchema = Joi.object({

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required()

});

module.exports = {
  signupSchema,
  loginSchema
};