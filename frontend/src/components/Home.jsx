import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
  const fetchUser = async() =>{

    try {
      const token = localStorage.getItem("token");

      if(!token){
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:8000/auth/getuser", {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })

      setUsername(response.data.username);
      setEmail(response.data.email);
    } catch (error) {
      console.error("Error to fatching user : ", error.message);
      navigate("/login")
      
    }
  }

  fetchUser()
  }, [navigate])

  const handelLogout = () =>{
    localStorage.removeItem('token');
    navigate("/login")
  }

  return (
    <div>
      <h1>Hello, {username || "Guest"}</h1>

      <h3>{email}</h3>

      <button onClick={handelLogout}>Logout</button>
    </div>
  )
}

export default Home
