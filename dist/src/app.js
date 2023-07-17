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
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const mongoose_1 = require("mongoose");
const routes_1 = __importDefault(require("./routes"));
const error_handler_1 = require("./middlewares/error-handler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const PORT = config_1.default.get("port");
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api", routes_1.default);
app.use(error_handler_1.errorHandler);
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/sms-test");
    app.listen(PORT, () => {
        console.log(PORT);
    });
});
bootstrap();
