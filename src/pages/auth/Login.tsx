import { useState } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../hooks/useAuth';
import { navigate } from '../../routes/AppRoutes';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-visual">
          <span className="auth-kicker">EMS Portal</span>
          <h1>Welcome back to your workforce command center.</h1>
          <p>
            Sign in to manage employee records, departments, roles, and project assignments from
            one focused dashboard.
          </p>
          <div className="auth-stats" aria-label="Application highlights">
            <div>
              <strong>4</strong>
              <span>Core modules</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Admin access</span>
            </div>
          </div>
        </div>

        <form className="auth-card" onSubmit={submit}>
          <span className="form-kicker">Secure access</span>
          <h2>Login</h2>
          <p>Enter your backend user credentials to continue.</p>

          {error && <div className="alert">{error}</div>}
          <Input label="Username" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
          <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
          <Button className="btn-full" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Login;

