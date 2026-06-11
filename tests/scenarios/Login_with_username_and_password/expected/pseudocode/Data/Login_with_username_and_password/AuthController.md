/**
 * API Endpoint: POST /login/auth
 * Maps incoming request to AuthService and formats JSON responses.
 */
async function handleLoginRequest(req, res) {
    const { username, password } = req.body;
    
    const result = await authenticateUser(username, password);

    if (result.status === "success") {
        return res.status(200).json({
            status: "success",
            userid: result.userid,
            auth_token: result.auth_token
        });
    } else {
        return res.status(result.status_code).json({
            status: "failed",
            status_code: result.status_code,
            error_message: result.error_message,
            data: []
        });
    }
}