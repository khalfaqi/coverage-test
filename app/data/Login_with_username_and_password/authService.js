"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = authenticateUser;
exports.authenticateGoogle = authenticateGoogle;
const crypto_1 = __importDefault(require("crypto"));
const users = [
    {
        id: 'user-1',
        username: 'user_name',
        email: 'user@example.com',
        password_hash: hashMD5('Password@123'),
        failed_login_count: 0,
        is_locked: false
    }
];
const sessions = [];
function hashMD5(value) {
    return crypto_1.default.createHash('md5').update(value).digest('hex');
}
function findUserByUsernameOrEmail(username) {
    return users.find((user) => user.username.toLowerCase() === username.toLowerCase() || user.email.toLowerCase() === username.toLowerCase());
}
function createSession(userId) {
    const token = crypto_1.default.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    sessions.push({ userId, token, expires_at: expiresAt });
    return { token, expires_at: expiresAt };
}
function incrementFailedLogin(user) {
    const newCount = user.failed_login_count + 1;
    user.failed_login_count = newCount;
    if (newCount >= 5) {
        user.is_locked = true;
    }
}
function resetFailedLogin(user) {
    user.failed_login_count = 0;
    user.is_locked = false;
}
function authenticateUser(username, password) {
    const user = findUserByUsernameOrEmail(username);
    if (!user) {
        return {
            status: 'failed',
            status_code: 401,
            error_message: 'Invalid credentials',
            data: []
        };
    }
    if (user.is_locked) {
        return {
            status: 'failed',
            status_code: 403,
            error_message: 'Account is locked due to multiple failed attempts',
            data: []
        };
    }
    if (user.password_hash !== hashMD5(password)) {
        incrementFailedLogin(user);
        return {
            status: 'failed',
            status_code: 401,
            error_message: 'Invalid credentials',
            data: []
        };
    }
    resetFailedLogin(user);
    const session = createSession(user.id);
    return {
        status: 'success',
        userid: user.id,
        auth_token: session.token
    };
}
function authenticateGoogle(payload) {
    const user = findUserByUsernameOrEmail(payload.username) || findUserByUsernameOrEmail(payload.email);
    if (user) {
        if (user.is_locked) {
            return {
                status: 'failed',
                status_code: 403,
                error_message: 'Account is locked due to multiple failed attempts',
                data: []
            };
        }
        resetFailedLogin(user);
        const session = createSession(user.id);
        return {
            status: 'success',
            userid: user.id,
            auth_token: session.token
        };
    }
    const newUser = {
        id: crypto_1.default.randomUUID(),
        username: payload.username,
        email: payload.email,
        password_hash: hashMD5('google-oauth'),
        failed_login_count: 0,
        is_locked: false
    };
    users.push(newUser);
    const session = createSession(newUser.id);
    return {
        status: 'success',
        userid: newUser.id,
        auth_token: session.token
    };
}
