import { useState } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { navigate } from '../../routes/AppRoutes';

const Register = () => {
  const [message, setMessage] = useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('Registration API is not available in the current Spring Boot backend. Please login with an existing backend user.');
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h1>Register</h1>
        <p>Create account support needs a backend register endpoint.</p>
        {message && <div className="alert">{message}</div>}
        <Input label="Username" required />
        <Input label="Email" type="email" required />
        <Input label="Password" type="password" required />
        <Input label="Confirm Password" type="password" required />
        <Button type="submit">Register</Button>
        <div className="auth-switch">
          <span>Already registered?</span>
          <button type="button" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </form>
    </main>
  );
};

export default Register;
