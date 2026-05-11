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
      <form className="auth-card" onSubmit={submit}>
        <h1>Login</h1>
       
        {error && <div className="alert">{error}</div>}
        <Input label="Username" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter Username' />
        <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter the  password'/>
        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        <div className="auth-switch">
          <span>New user?</span>
          <button type="button" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
