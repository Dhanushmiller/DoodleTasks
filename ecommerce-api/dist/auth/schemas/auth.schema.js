"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.RegisterSchema = void 0;
const Joi = require("joi");
exports.RegisterSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name cannot be empty',
        'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
    }),
});
exports.LoginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    }),
});
//# sourceMappingURL=auth.schema.js.map