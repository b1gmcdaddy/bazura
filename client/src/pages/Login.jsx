import React from 'react';
import Navbar from '../components/Navbar';
import homebanner from '../assets/homebanner.jpg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {

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
        <motion.div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 align-middle bg-gray-50 px-8 py-10 rounded-lg shadow-md'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
          >
          <h1 className='text-4xl text-center text-black mb-6'>Log In</h1>
          <form className='text-center'>
            <input className='block  bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
              type='text' placeholder='Username' />
            <input className='block  bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
              type='password' placeholder='Password' />
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
