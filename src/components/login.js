import React, { useState } from 'react';

function LoginForm(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  function handleLoginSubmit(event) {
    event.preventDefault();

    // Static credentials 
    const validUsername = 'admin@gmail.com';
    const validPassword = 'password';

    if (email === validUsername && password === validPassword) {
      const accessToken = generateToken();
      sessionStorage.setItem('accessToken', accessToken);
      props.onLoginSuccess();
    }
    else {
      setLoginError('Invalid username or password.');
    }
  }

  function generateToken() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 20; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  }

  return (
    <form className="mx-auto mt-5" style={{ width: 400 }}>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {loginError && <p className="error-message">{loginError}</p>}
      <button type="submit" className="btn btn-primary" onClick={handleLoginSubmit}>
        Login
      </button>
    </form>
  );
}

export default LoginForm;
