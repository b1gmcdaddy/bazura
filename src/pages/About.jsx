import React from 'react';
import Navbar from '../components/Navbar';
import homebanner from '../assets/homebanner.jpg';
import chefsbg from '../assets/chefsbg.jpg';

const About = () => {
  return (
    <>
      <Navbar bg="#282828" hasShadow={true}/>
      <div className='w-full bg-gray-50 py-24 px-4 mt-20'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
          <img className='w-[500px] mx-auto my-4 shadow-lg shadow-gray-500 border-solid border-[1px] rounded-md border-black' src={homebanner} alt='/' />
          <div className='flex flex-col justify-center'>
            <h1 className='md:text-4xl sm:text-3xl tracking-wider text-2xl font-bold py-3'>OUR RESTAURANT</h1>
            <div className='w-[80px] h-[4px] bg-green-800 rounded-md mb-3'></div>
            <p className='text-justify font-[Georgia] mb-3'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              Corrupti recusandae excepturi ullam natus
               ut totam amet sed porro tempora velit, 
              sit exercitationem sequi est quas 
              sunt pariatur vel, molestiae sapiente.
            </p>
            <h3 className='md:text-2xl sm:text-xl text-lg font-medium py-3'>OUR RESTAURANT</h3>
            <p className='text-justify font-[Georgia]'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              Corrupti recusandae excepturi ullam natus
               ut totam amet sed porro tempora velit, 
              sit exercitationem sequi est quas 
              sunt pariatur vel, molestiae sapiente.
            </p>
          </div>
        </div>
      </div>
      {/*Chefs Section*/}
      <div>

      </div>
    </>
  );
};

export default About;
