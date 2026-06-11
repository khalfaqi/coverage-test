"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authSchemas_js_1 = require("../../data/Login_with_username_and_password/authSchemas.js");
const authService_js_1 = require("../../data/Login_with_username_and_password/authService.js");
const authController = (0, express_1.Router)();
async function handleLoginRequest(req, res) {
    const parsed = authSchemas_js_1.loginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            status: 'failed',
            status_code: 400,
            error_message: 'Invalid request body',
            data: []
        });
    }
    const result = (0, authService_js_1.authenticateUser)(parsed.data.username, parsed.data.password);
    if (result.status === 'success') {
        return res.status(200).json(result);
    }
    return res.status(result.status_code).json({
        status: 'failed',
        status_code: result.status_code,
        error_message: result.error_message,
        data: []
    });
}
async function handleGoogleCallback(req, res) {
    const parsed = authSchemas_js_1.googleCallbackSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            status: 'failed',
            status_code: 400,
            error_message: 'Invalid Google callback payload',
            data: []
        });
    }
    const result = (0, authService_js_1.authenticateGoogle)(parsed.data);
    if (result.status === 'success') {
        return res.status(200).json(result);
    }
    return res.status(result.status_code).json({
        status: 'failed',
        status_code: result.status_code,
        error_message: result.error_message,
        data: []
    });
}
authController.post('/login/auth', handleLoginRequest);
authController.post('/auth/login', handleLoginRequest);
authController.post('/auth/google/callback', handleGoogleCallback);
exports.default = authController;
