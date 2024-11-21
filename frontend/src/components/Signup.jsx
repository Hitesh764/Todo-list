import React, { useState } from 'react';
import axios from "axios"
import "../css/Signup.css";

import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  const [formdata, setFormdata] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handelChange = (e) =>{
    setFormdata({...formdata, [e.target.name]: e.target.value});
  };


  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      const responsed = await axios.post("http://localhost:8000/auth/register",{
        username: formdata.username,
        email: formdata.email,
        password: formdata.password,
      });

      setMessage("Registeration successfully")
      setIsSuccess(true)
      console.log(responsed.data);

      setTimeout(() => {
        navigate("/login")
      }, 2000);

    } catch (error) {
      console.error('signup failed: ', error.responsed?.data?.message || error.message)
      
      setMessage(error.response?.data?.message || "Failed to register")
      setIsSuccess(false)
    }
  }


  return (
    <div>
    <div className='signup-container'>
    <div className='signup-section'>
    <h1 style={{textAlign: "center"}}>Signup</h1>
    
    <form onSubmit={handleSubmit} action="" className='form-sec'>
    <input value={formdata.username} onChange={handelChange} type="text" name="username" placeholder='Enter your name' className='input-form' required="true"/>
    <input value={formdata.email} onChange={handelChange} type="email" name="email"  placeholder='Enter your email' className='input-form' required="true"/>
    <input value={formdata.password} onChange={handelChange} type="password" name="password" placeholder='Enter password' className='input-form' required="true"/>

    <button type='submit' className='signup-btn'>Signup</button>

    <p className='ortag'>OR</p>

    <button className='email-btn'><img src="https://reliableacademy.com/assets/images/google-icon.png" alt="" className='icon-img'/> Continue with emial</button>
    
    </form>

    <p style={{textAlign: "center"}}>Alredy have account ?<Link to="/login" className='signup-link'><span> Login</span></Link></p>

    {message && (
      <p className='pop-msg' style={{ color: isSuccess ? "green" : "red", background: isSuccess ? "#ceead6" : "#fce8e6"}}>
        {message}
      </p>
    )}


    </div>
    </div>
    </div>
  )
}

export default Signup
