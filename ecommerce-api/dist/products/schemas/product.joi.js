"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductSchema = exports.CreateProductSchema = void 0;
const Joi = require("joi");
exports.CreateProductSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Product name cannot be empty',
        'any.required': 'Product name is required',
    }),
    description: Joi.string().optional(),
    price: Joi.number().min(0).required().messages({
        'number.min': 'Price must be a positive number',
        'any.required': 'Price is required',
    }),
    stock: Joi.number().integer().min(0).required().messages({
        'number.min': 'Stock must be a positive integer',
        'any.required': 'Stock is required',
    }),
    sku: Joi.string().required().messages({
        'any.required': 'SKU is required',
    }),
    category: Joi.string().optional(),
});
exports.UpdateProductSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().min(0).optional(),
    stock: Joi.number().integer().min(0).optional(),
    sku: Joi.string().optional(),
    category: Joi.string().optional(),
});
//# sourceMappingURL=product.joi.js.map