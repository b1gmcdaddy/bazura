import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import galleryBg from '../assets/galleryBg.jpg';
import { motion } from 'framer-motion';


const Gallery = () => {

  const [mealData, setMealData] = useState([]);

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=',);
        setMealData(response.data.meals);
      } catch (error) {
        console.error('Error fetching data mein:', error);
      }
    };
    fetchMealData();
  }, []);

  const galleryHeader = {
    backgroundImage: `url(${galleryBg})`,
    backgroundSize: 'cover',  
    backgroundPosition: 'center',
    height: '40vh',
  };
  
  return (
    <>
      <Navbar bg="#282828" hasShadow={true}/>

      <div className='py-20 shadow-lg shadow-gray-500 mb-4' style={galleryHeader}>
        <div className='max-w-[1240px] mx-auto text-center md:my-[5rem] xs:my-[2rem]'>
          <h1 className='text-white md:text-4xl sm:text-2xl tracking-wide text-xl font-bold'>GALLERY</h1>
          <div className='md:w-[100px] xs:w-[60px] h-[4px] mx-auto bg-green-600 rounded-md mt-3'></div>
          <p className='text-white xs:mt-0 md:mt-2 pt-5 md:text-xl xs:text-base font-sans'>Lorem ipsum dolor sit amet, consectetur 
          adipiscing elit duis sed dapibus leonec.</p>
        </div>
      </div>

      <div className="xs:py-[5rem] z-0 max-w-[1440px] bg-gray-50 mx-auto grid md:grid-cols-4 gap-16">
        {mealData.slice(0, 16).map((meal, index) => (
          <motion.div key={index} className="gallery-item shadow-xl rounded-lg"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 2 }}
          >
          <img src={meal.strMealThumb} alt={meal.strMeal} className='outline outline-white 
          outline-1 outline-offset-[-10px] hover:scale-105 duration-300' />
          </motion.div>
          
        ))}
      
      </div>
      
    </>
  );
};

export default Gallery