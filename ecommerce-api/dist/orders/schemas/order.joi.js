"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderSchema = void 0;
const Joi = require("joi");
exports.CreateOrderSchema = Joi.object({
    items: Joi.array()
        .items(Joi.object({
        productId: Joi.string().required().messages({
            'any.required': 'Product ID is required',
        }),
        quantity: Joi.number().integer().min(1).required().messages({
            'number.min': 'Quantity must be at least 1',
            'any.required': 'Quantity is required',
        }),
    }))
        .min(1)
        .required()
        .messages({
        'array.min': 'Order must contain at least one item',
        'any.required': 'Items are required',
    }),
});
//# sourceMappingURL=order.joi.js.map