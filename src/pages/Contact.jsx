import React from 'react'
import Navbar from '../components/Navbar'
import contactbanner from '../assets/contactbanner.jpg'

const Contact = () => {

  const contactHeader = {
    backgroundImage: `url(${contactbanner})`,
    backgroundSize: 'cover',  
    backgroundPosition: 'bottom',
    height: '20vh',
    marginTop: '5rem',
  };

  return (
    <>
    <Navbar bg="#282828"/>

    <div className='relative flex items-center justify-center xs:h-[20vh]
    shadow-lg shadow-gray-500 mb-4' style={contactHeader}>
        <div className='max-w-[1240px] mx-auto absolute xs:px-10'>
          <h1 className='text-white text-center tracking-wide md:text-3xl'>
            WANT TO MAKE A RESERVATION? CALL <b>0967 243 9625</b>
          </h1>
        </div>
      </div>

     

    </>
  )
}

export default Contact