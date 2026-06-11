/**
 * Logic for handling Google OAuth callback and user synchronization.
 * Asset: assets/63eb6653-0af4-42de-8c42-91ae3d471e1d.svg
 */

FUNCTION handleGoogleCallback(googleProfileData):
    // 1. Extract user identity from Google provider
    SET userEmail = googleProfileData.email
    SET userName = googleProfileData.name
    
    // 2. Check if User exists in our system
    SET existingUser = DATABASE.find("User", { email: userEmail })
    
    IF existingUser IS NULL:
        // 3. Create new user record if not found
        SET newUser = DATABASE.create("User", {
            id: GENERATE_UUID(),
            username: userName,
            email: userEmail,
            auth_system: "google",
            failed_login_count: 0,
            is_locked: false,
            last_failed_at: NULL
        })
        RETURN newUser
    ELSE:
        // 4. Update existing user auth_system if necessary
        IF existingUser.auth_system != "google":
            DATABASE.update("User", existingUser.id, { auth_system: "google" })
            
        RETURN existingUser