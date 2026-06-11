/**
 * Logic for generating session tokens after successful authentication.
 * Asset: assets/759f1a9d-5697-46c2-86c6-b248ca2e6faa.svg
 */

FUNCTION createSession(userId):
    SET tokenValue = GENERATE_SECURE_TOKEN()
    SET expiry = CURRENT_DATETIME + 24_HOURS
    
    // Persist token to AuthToken entity
    DATABASE.create("AuthToken", {
        id: GENERATE_UUID(),
        user_id: userId,
        token: tokenValue,
        expires_at: expiry
    })
    
    RETURN { token: tokenValue, expires_at: expiry }