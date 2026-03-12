const Joi = require("joi");

const createTodoSchema = Joi.object({

  task_name: Joi.string()
    .min(3)
    .required(),

  expiry: Joi.date()
    .optional()

});

const updateTodoSchema = Joi.object({

  task_name: Joi.string()
    .optional(),

  completion_status: Joi.boolean()
    .optional(),

  expiry: Joi.date()
    .optional()

});

module.exports = {
  createTodoSchema,
  updateTodoSchema
};