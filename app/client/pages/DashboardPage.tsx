import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-shell">
      <div className="dashboard-card">
        <h1>Welcome to your dashboard</h1>
        <p>Your login was successful. This page confirms your session and provides a starting point for secure workflows.</p>
        <button className="secondary-button" onClick={() => navigate('/')}>Back to login</button>
      </div>
    </div>
  );
}
