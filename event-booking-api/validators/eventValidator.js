const Joi = require("joi");

const eventSchema = Joi.object({
  title: Joi.string().min(3).required(),

  description: Joi.string().min(5).required(),

  location: Joi.string().required(),

  latitude: Joi.number().required(),

  longitude: Joi.number().required(),

  start_time: Joi.date().required(),

  end_time: Joi.date().greater(Joi.ref("start_time")).required()
});

module.exports = eventSchema;