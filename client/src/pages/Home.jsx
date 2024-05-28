import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import homebanner from '../assets/homebanner.jpg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { faUserAlt, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('https://bazura.onrender.com')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setUsername(res.data.username);
        } else {
          setAuth(false);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    axios.get('https://bazura.onrender.com/logout')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(false);
          setUsername('');
        }
      })
      .catch(err => console.log(err));
  };

  const containerStyle = {
    backgroundImage: `url(${homebanner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  const contentStyle = {
    fontFamily: 'customFont, sans-serif',
  };

  return (
    <>
      <Navbar auth={auth} handleLogout={handleLogout} />
      <div style={containerStyle}>
        <motion.div className='absolute md:top-1/2 xs:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 align-middle'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          
          <h1 className='text-white md:text-7xl xs:text-3xl' style={contentStyle}>Bazura Grill</h1>
          <h2 className='text-white md:text-2xl text-center tracking-wider'>Cafe / Pub / Imnanan</h2>
          {
            auth ?
              <div className='text-center md:mt-5'>
                <button className='md:p-3 xs:p-2 xs:mt-1 md:border-solid md:border-2 border-green-900
            rounded-lg bg-green-900 text-white md:mt-5 md:text-lg hover:bg-green-800 xs:text-sm' onClick={handleLogout}>
              <FontAwesomeIcon 
                    icon={faRightFromBracket}
                    className="cursor-pointer mr-2 md:text-xl"
                     />
              Log Out</button>
              </div>
              :
              <div className='text-center md:mt-5'>
                <Link to="/login"><button className='md:p-3 xs:p-2 xs:mt-1 md:border-solid md:border-2 border-green-900
            rounded-lg bg-green-900 text-white md:mt-5 md:text-lg hover:bg-green-800 xs:text-sm'>
              <FontAwesomeIcon 
                    icon={faUserAlt}
                    className="cursor-pointer mr-2 md:text-xl"
                     />
              Log In</button></Link>
              </div>
          }
        </motion.div>
      </div>
    </>
  );
}

export default Home;
