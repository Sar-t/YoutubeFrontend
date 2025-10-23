import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import {login} from "../../store/authSlice.js"
import { Link } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

      const result = await response.json(); // ✅ parse body
      console.log("Login successful:", result);
      console.log(result.data);
      console.log(result.data.user);
      // API returns user at result.data.user.loggedInUser
      dispatch(login({user: result.data.user.loggedInUser, 
                      accessToken: result.data.user.accessToken, 
                      refreshToken: result.data.user.refreshToken}
                    )
              );
        
      

      navigate("/");
      // Handle success (e.g., store token, redirect)
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>Sign In</h1>
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
        <button type="submit" className="submit">Sign In</button>
      </form>
      <p>Don't have an account?{" "}<Link to="/signup" className="text-blue-700">Sign Up</Link></p>
    </div>
  );
};

export default Login;
