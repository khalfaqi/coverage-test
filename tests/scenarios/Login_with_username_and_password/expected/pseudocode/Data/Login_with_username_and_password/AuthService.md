/**
 * Handles authentication logic, database verification, and security locking.
 */
function authenticateUser(username, password) {
    const user = Database.findUserByUsername(username);

    if (!user) {
        return { status: "failed", status_code: 401, error_message: "Invalid credentials" };
    }

    if (user.is_locked) {
        return { status: "failed", status_code: 403, error_message: "Account is locked due to multiple failed attempts" };
    }

    // Verify password hash (MD5)
    if (user.password_hash !== hashMD5(password)) {
        incrementFailedLogin(user);
        return { status: "failed", status_code: 401, error_message: "Invalid credentials" };
    }

    // Reset failed attempts on successful login
    resetFailedLogin(user);

    const token = generateAuthToken(user.id);
    return {
        status: "success",
        userid: user.id,
        auth_token: token
    };
}

function incrementFailedLogin(user) {
    const newCount = user.failed_login_count + 1;
    if (newCount >= 5) {
        Database.updateUser(user.id, { failed_login_count: newCount, is_locked: true });
    } else {
        Database.updateUser(user.id, { failed_login_count: newCount });
    }
}

function resetFailedLogin(user) {
    Database.updateUser(user.id, { failed_login_count: 0, is_locked: false });
}