import React from 'react';
import Navbar from '../components/Navbar';
import homebanner from '../assets/homebanner.jpg';
import chefsbg from '../assets/chefsbg.jpg';
import chef1 from '../assets/chef1.jpg';
import chef2 from '../assets/chef2.jpg';
import chef3 from '../assets/chef3.jpg';

const About = () => {

  const chefsHeader = {
    backgroundImage: `url(${chefsbg})`,
    backgroundSize: 'cover',  
    backgroundPosition: 'top',
    height: '30vh',
  };

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
            <h3 className='md:text-2xl sm:text-xl text-lg font-medium py-3'>Awards and Chefs</h3>
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
      {/*Chefs Header Section*/}
      <div className='py-20 shadow-lg shadow-gray-500' style={chefsHeader}>
        <div className='max-w-[1240px] mx-auto text-center'>
          <h1 className='text-white md:text-4xl sm:text-2xl tracking-wide text-xl font-bold'>MEET OUR CHEFS</h1>
          <div className='w-[100px] h-[4px] mx-auto bg-green-600 rounded-md mt-4 mb-3'></div>
          <p className='text-white mt-5 pt-5 md:text-xl xs:text-base font-sans'>Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed dapibus leonec.</p>
        </div>
      </div>
      {/*Chefs Cards*/}
      <div className='w-full bg-gray-50 py-[7rem] mt-5 px-4'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-16'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='mx-auto mt-[-3rem] bg-gray-50' src={chef1} alt='/' />
            <h2 className='text-2xl font-bold text-center py-8'>John Doe</h2>
            <p className='text-center text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam.</p>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='mx-auto mt-[-3rem] bg-gray-50' src={chef2} alt='/' />
            <h2 className='text-2xl font-bold text-center py-8'>Vince Doe</h2>
            <p className='text-center text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam.</p>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='mx-auto mt-[-3rem] bg-gray-50' src={chef3} alt='/' />
            <h2 className='text-2xl font-bold text-center py-8'>Edgar Doe</h2>
            <p className='text-center text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
