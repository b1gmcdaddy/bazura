import React from 'react'
import Navbar from '../components/Navbar'
import contactbanner from '../assets/contactbanner.jpg'
import Footer from '../components/Footer'

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

      <div className='w-full bg-gray-50'>
        <div className='mx-auto max-w-[900px]'>
        <h2 className='text-2xl font-semibold mb-4'>Contact Us</h2>
        <form>
          <div className='mb-4 grid grid-cols-2 gap-8'>
            <input
              type='text'
              id='name'
              name='name'
              className='w-full px-3 py-2 border rounded-md'
              required
            />
            <input
              type='email'
              id='email'
              name='email'
              
              className='w-full px-3 py-2 border rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='message' className='block text-sm font-medium'>
              Message
            </label>
            <textarea
              id='message'
              name='message'
           
              className='w-full px-3 py-2 border rounded-md'
              required
            />
          </div>
          <div className='flex justify-center'>
          <button
            type='submit'
            className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
          >
            Submit
          </button>
          </div>
        </form>
      </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact