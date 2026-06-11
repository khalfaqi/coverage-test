"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authFailureSchema = exports.authSuccessSchema = exports.googleCallbackSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1)
});
exports.googleCallbackSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    username: zod_1.z.string().min(1),
    auth_system: zod_1.z.literal('google')
});
exports.authSuccessSchema = zod_1.z.object({
    status: zod_1.z.literal('success'),
    userid: zod_1.z.string(),
    auth_token: zod_1.z.string()
});
exports.authFailureSchema = zod_1.z.object({
    status: zod_1.z.literal('failed'),
    status_code: zod_1.z.number(),
    error_message: zod_1.z.string(),
    data: zod_1.z.array(zod_1.z.any())
});
