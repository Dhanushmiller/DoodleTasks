const Joi = require("joi");

const createBannerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(1).required(),
    link: Joi.string().uri().required(),
    status: Joi.boolean().optional(),
  });

  return schema.validate(data);
};

module.exports = { createBannerValidation };