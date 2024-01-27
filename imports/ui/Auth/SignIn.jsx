import React, { useState } from 'react';
import CallMethods from '../../helpers/auth';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();

  const { register } = CallMethods();

  const handleRegister = async () => {
    // Validate inputs
    if (!email || !password || !role) {
      alert('Please fill in all fields.');
      return;
    }

    await register({ email, password, role });
  };

  return (
    <div className="form__parent">
      <div className="form-container">
        <h2>Sign In</h2>
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

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="borrower">Borrower</option>
          <option value="lender">Lender</option>
        </select>

        <button onClick={handleRegister}>Register</button>

        <Link to="/login">Already have an account ?</Link>
      </div>
    </div>
  );
};

export default SignIn;
