import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isEmailValid = useMemo(() => {
    const trimmed = email.trim();
    return trimmed.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  }, [email]);

  const isPasswordValid = useMemo(() => {
    const trimmed = password.trim();
    const policyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return trimmed.length > 0 && policyRegex.test(trimmed);
  }, [password]);

  const isFormValid = isEmailValid && isPasswordValid;

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading || !isFormValid) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email.trim(), password: password.trim() })
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setError(body?.error_message ?? 'Invalid email or password');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <label>
        Email or username
        <input
          type="text"
          placeholder="Enter email or username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmail(email.trim())}
        />
      </label>
      {!isEmailValid && email.length > 0 && <span className="field-error">Invalid email format</span>}

      <label>
        Password
        <div className="password-field">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPassword(password.trim())}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
          >
            {isPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
      </label>
      {!isPasswordValid && password.length > 0 && (
        <span className="field-error">
          Password must contain uppercase, lowercase, number, and special character.
        </span>
      )}

      {error && <p className="form-error">{error}</p>}

      <button className="primary-button" type="submit" disabled={!isFormValid || isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
};
