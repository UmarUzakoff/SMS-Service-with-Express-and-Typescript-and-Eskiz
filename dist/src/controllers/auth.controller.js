"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPhone = exports.registerController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = __importDefault(require("../models/User.model"));
const custom_error_1 = require("../utils/custom-error");
const auth_validation_1 = require("../validations/auth.validation");
const sms_service_1 = require("../utils/sms.service");
const registerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, password } = req.body;
        const { error } = (0, auth_validation_1.registerSchema)({ phone, password });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        const user = yield User_model_1.default.findOne({ phone, isVerified: true });
        if (user)
            throw new custom_error_1.CustomError("User already registered", 403);
        const hashedPass = yield bcrypt_1.default.hash(password, 10);
        yield User_model_1.default.create({ phone, password: hashedPass });
        const code = Math.floor(100000 + Math.random() * 900000);
        res.cookie("code", code, { maxAge: 120 * 100 * 60 });
        res.cookie("phone", phone, { maxAge: 120 * 100 * 60 });
        yield (0, sms_service_1.send)(phone, code);
        res.status(201).json({ message: "SMS sent to your phone number" });
    }
    catch (error) {
        next(error);
    }
});
exports.registerController = registerController;
const verifyPhone = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { code, phone } = req.cookies;
            const { verifyCode } = req.body;
            if (code != verifyCode) {
                throw new custom_error_1.CustomError("Incorrect code", 403);
            }
            yield User_model_1.default.findOneAndUpdate({ phone }, {
                $set: {
                    isVerified: true,
                },
            });
            res.status(200).json({ message: "Success" });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.verifyPhone = verifyPhone;
