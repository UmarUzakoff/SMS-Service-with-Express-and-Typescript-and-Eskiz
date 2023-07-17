"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const random = (max, min) => {
    const randomNumber = Math.floor(Math.random() * max + min - 1);
    return 100000 + randomNumber;
};
exports.random = random;
