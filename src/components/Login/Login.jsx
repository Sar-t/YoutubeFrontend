import React, { useState } from 'react';

const Login = () => {
  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('Login successful:', result);
      // Handle success (e.g., store token, redirect)
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
