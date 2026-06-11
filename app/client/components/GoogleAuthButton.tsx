import { useNavigate } from 'react-router-dom';

export const GoogleAuthButton = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const payload = {
      email: 'user@example.com',
      username: 'user_name',
      auth_system: 'google'
    };

    try {
      const response = await fetch('/api/auth/google/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        console.error('Authentication failed');
      }
    } catch (err) {
      console.error('Authentication failed', err);
    }
  };

  return (
    <button type="button" className="google-button" onClick={handleGoogleLogin}>
      <span className="google-icon" aria-hidden="true">G</span>
      Sign in with Google
    </button>
  );
};
