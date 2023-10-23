import React from 'react';
import Navbar from '../components/Navbar';
import homebanner from '../assets/homebanner.jpg';

const Home = () => {
  const containerStyle = {
    backgroundImage: `url(${homebanner})`,
    backgroundSize: 'cover',  // Adjust the background size to cover the container
    backgroundPosition: 'center',  // Center the background image
    height: '100vh',  // Set the container's height to the viewport height
  };

  const contentStyle = {
    fontFamily: 'customFont, sans-serif',
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 align-middle'>
          <h1 className='text-white md:text-7xl xs:text-3xl' style={contentStyle}>Bazura Grill</h1>
          <h2 className='text-white md:text-2xl text-center tracking-wider'>Cafe / Pub / Imnanan</h2>
          <div className='text-center md:mt-5'>
            <button className='md:p-3 xs:p-1 md:border-solid md:border-2 border-green-900
            rounded-lg bg-green-900 text-white md:mt-5 hover:bg-green-800'>LEARN MORE</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
