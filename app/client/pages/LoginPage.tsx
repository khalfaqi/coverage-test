import { LoginForm } from '../components/LoginForm';
import { GoogleAuthButton } from '../components/GoogleAuthButton';

export default function LoginPage() {
  return (
    <div className="page-shell">
      <div className="login-card">
        <div className="login-hero">
          <div className="hero-badge">Welcome Back</div>
          <div className="hero-heading">Secure account access</div>
          <p className="hero-copy">
            Sign in with email and password or continue quickly with Google. Your credentials are validated on each attempt, and the interface delivers immediate feedback.
          </p>
          <div className="hero-illustration" aria-hidden="true">
            <div className="hero-panel" />
            <div className="hero-detail-row">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="form-header">
            <p className="form-subtitle">Sign in to continue</p>
            <h1>Login with username and password</h1>
          </div>

          <LoginForm />

          <div className="divider-row">
            <span />
            <span>or continue with</span>
            <span />
          </div>

          <GoogleAuthButton />
        </div>
      </div>
    </div>
  );
}
