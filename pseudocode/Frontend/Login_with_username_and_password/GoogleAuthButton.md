/**
 * Component: GoogleAuthButton
 * Asset: assets/759f1a9d-5697-46c2-86c6-b248ca2e6faa.svg
 */
export const GoogleAuthButton = () => {
  const handleGoogleLogin = async () => {
    // Payload mapping based on POST /auth/google/callback
    const payload = {
      email: "user@example.com", // Derived from Google Auth provider
      username: "user_name",     // Derived from Google Auth provider
      auth_system: "google"
    };

    const response = await fetch('/auth/google/callback', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const userData = await response.json();
      // Persisted data fields: id, username, email
      console.log("Authenticated user:", userData.username);
      window.location.href = '/dashboard';
    } else {
      // Handle 401
      console.error("Authentication failed");
    }
  };

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
};