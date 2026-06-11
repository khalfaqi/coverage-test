import React, { useState, useMemo } from 'react';

/**
 * Component: LoginForm
 * Asset: assets/63eb6653-0af4-42de-8c42-91ae3d471e1d.svg
 */
export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validation Logic
  const isEmailValid = useMemo(() => {
    const trimmed = email.trim();
    return trimmed.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  }, [email]);

  const isPasswordValid = useMemo(() => {
    const trimmed = password.trim();
    // Policy: Uppercase, lowercase, numbers, special chars
    const policyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return trimmed.length > 0 && policyRegex.test(trimmed);
  }, [password]);

  const isFormValid = isEmailValid && isPasswordValid;

  const handleLogin = async () => {
    if (isLoading || !isFormValid) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Logic call to authentication process
      // Note: API CONTRACTS is empty, using standard auth flow
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ 
          email: email.trim(), 
          password: password.trim() 
        })
      });

      if (!response.ok) {
        setError("Invalid email or password");
      } else {
        // Navigate to homepage/dashboard
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Enter email or username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setEmail(email.trim())}
      />
      {!isEmailValid && email.length > 0 && <span>Invalid email format</span>}

      <input
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setPassword(password.trim())}
      />
      <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
        {isPasswordVisible ? "Hide" : "Show"}
      </button>
      {!isPasswordValid && password.length > 0 && <span>Invalid password format</span>}

      {error && <p>{error}</p>}

      <button 
        disabled={!isFormValid || isLoading} 
        onClick={handleLogin}
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};