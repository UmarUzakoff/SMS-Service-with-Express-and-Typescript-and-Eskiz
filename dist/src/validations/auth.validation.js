"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const registerSchema = (payload) => {
    return joi_1.default.object({
        phone: joi_1.default.string()
            .regex(/^\+998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/)
            .required(),
        password: joi_1.default.string()
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
            .required(),
    }).validate(payload);
};
exports.registerSchema = registerSchema;
