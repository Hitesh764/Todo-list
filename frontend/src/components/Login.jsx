import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Signup.css";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If a token exists in localStorage, redirect the user to home
    if (localStorage.getItem('token')) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.email) {
      setMessage("Please enter email.");
      setIsSuccess(false);
      return;
    }

    if(!formData.password){
      setMessage("Please enter password.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email: formData.email,
        password: formData.password
      });

      setMessage("Login Successful");
      setIsSuccess(true);
      localStorage.setItem('token', response.data.token);

      setTimeout(() => {
        navigate("/home");
      }, 2000);

    } catch (error) {
      console.error('Login failed', error.response?.data?.message || error.message);
      setMessage(error.response?.data?.message || "Failed to login");
      setIsSuccess(false);
    }
  };

  return (
    <div>
      <div className='signup-container'>
        <div className='signup-section'>
          <h1 style={{ textAlign: "center" }}>Login</h1>

          <form onSubmit={handleSubmit} className='form-sec'>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className='input-form'
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter password'
              className='input-form'
            />
            <button className='signup-btn' type='submit'>Login</button>

            <p className='ortag'>OR</p>

            <button className='email-btn'>
              <img src="https://reliableacademy.com/assets/images/google-icon.png" alt="" className='icon-img' />
              Continue with email
            </button>
          </form>

          <p style={{ textAlign: "center" }}>
            Don't have an account? 
            <Link to="/" className='signup-link'>
              <span> Signup</span>
            </Link>
          </p>

          {message && (
            <p className='pop-msg' style={{ color: isSuccess ? "green" : "red", background: isSuccess ? "#ceead6" : "#fce8e6" }}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
