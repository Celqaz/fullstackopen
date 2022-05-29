"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MONGODB_URI = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const MONGODB_URI = process.env.MONGODB_URI;
exports.MONGODB_URI = MONGODB_URI;
const PORT = process.env.PORT;
exports.PORT = PORT;
