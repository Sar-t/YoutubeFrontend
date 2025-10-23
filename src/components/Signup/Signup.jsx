import React, { use, useState } from 'react';
import userService from "../../../services/userService.js";
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    avatar: null,
    coverImage: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('fullname', data.fullname);
    formData.append('email', data.email);
    formData.append('username', data.username);
    formData.append('password', data.password);
    formData.append('avatar', data.avatar);
    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }

    try {
      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        body: formData   // ✅ Correct - send the FormData object
      });

      const result = await response.json();
      setLoading(false);
      if(result.success){
        dispatch(login({user: result.data.user.loggedInUser, 
                        accessToken: result.data.user.accessToken, 
                        refreshToken: result.data.user.refreshToken
                        }
                      )
        );
        navigate('/');
      }
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='form-container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={data.fullname}
          onChange={(e) => setData({ ...data, fullname: e.target.value })}
          required
        /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        /><br />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          required
        /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        /><br />

        <label>Avatar (required):</label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={(e) => setData({ ...data, avatar: e.target.files[0] })}
          required
        /><br />

        <label>Cover Image (optional):</label>
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={(e) => setData({ ...data, coverImage: e.target.files[0] })}
        /><br />
        {loading && <button>Registering...</button>}
        {!loading && <button type="submit" >Register</button>}
        <div className="toggle-link">
          Already have an account? <Link to = "./signin">Sign in</Link>
        </div>
      </form>
    </div>
  );
};
export default Signup;