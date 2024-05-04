import React from 'react';
import Navbar from '../components/Navbar';
import homebanner from '../assets/homebanner.jpg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {

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
      <Navbar />
      <div style={containerStyle}>
        <motion.div className='absolute md:top-1/2 xs:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 align-middle'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
          >
          <h1 className='text-white md:text-7xl xs:text-3xl' style={contentStyle}>Bazura Grill</h1>
          <h2 className='text-white md:text-2xl text-center tracking-wider'>Cafe / Pub / Imnanan</h2>
          <div className='text-center md:mt-5'>
          <Link to="/about"><button className='md:p-3 xs:p-2 xs:mt-1 md:border-solid md:border-2 border-green-900
            rounded-lg bg-green-900 text-white md:mt-5 hover:bg-green-800 xs:text-sm'>LEARN MORE</button></Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Home;
