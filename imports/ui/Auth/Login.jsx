import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CallMethods from '../../helpers/auth';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { login } = CallMethods();

  const handleLogin = async () => {
    await login({ email, password });
  };

  return (
    <div className="form__parent">
      <div className="form-container">
        <h2>Log In</h2>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
        <Link to="/signin">New user?</Link>
      </div>
    </div>
  );
};

export default Login;
