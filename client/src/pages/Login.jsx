import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import homebanner from '../assets/homebanner.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';



const Login = () => {

  const [values, setValues] = useState({
    email: '',
    password: ''
})

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/login', values)
    .then(res => {
      if(res.data.Status === "Success") {
        navigate('/');
      } else {
        alert(res.data.Error);
      }
    })
    .then(err => console.log(err));
} 

  const containerStyle = {
    backgroundImage: `url(${homebanner})`,
    backgroundSize: 'cover',  
    backgroundPosition: 'center',  
    height: '100vh',  
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <motion.div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        align-middle bg-gray-50 px-8 py-10 rounded-lg shadow-md'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
          >
          <h1 className='text-4xl text-center text-black mb-6'>Log In</h1>
          <form className='text-center' onSubmit={handleSubmit}>
            <input className='block  bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
              type='email' name='email' placeholder='Email' onChange={e => setValues({...values, email: e.target.value})} />
            <input className='block  bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
              type='password' name='password' placeholder='Password' onChange={e => setValues({...values, password: e.target.value})} />
            <button className='w-full bg-green-800 text-white rounded-md px-4 py-2 font-semibold hover:bg-green-600 focus:outline-none focus:bg-green-600'
              type='submit'>Login</button>
          </form>
          <p className='mt-4 text-sm text-gray-600'>Don't have an account? <Link to="/register" className='text-green-500 hover:text-green-700'>Sign up</Link></p>
        </motion.div>
      </div>
    </>
  );
}

export default Login;
