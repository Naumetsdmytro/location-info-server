"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const registerSchema = joi_1.default.object({
    subscription: joi_1.default.string().valid("starter", "pro", "business").required(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().min(6).required(),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().min(6).required(),
});
const updateSubscriptionSchema = joi_1.default.object({
    subscription: joi_1.default.string().valid("starter", "pro", "business").required(),
});
exports.default = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
};
//# sourceMappingURL=users.request-schemas.js.map