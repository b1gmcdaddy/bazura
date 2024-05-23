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
            const response = await axios.get('http://localhost:8081/meals');
            setMealData(response.data.meals);
        } catch (error) {
            console.error('Error fetching data from server:', error);
        }
    };
    fetchMealData();
}, []);


  const galleryHeader = {
    backgroundImage: `url(${galleryBg})`,
    backgroundSize: 'cover',  
    backgroundPosition: 'center',
    height: '30vh',
    marginTop: '5rem',
  };
  
  return (
    <>
      <Navbar bg="#282828" hasShadow={true}/>

      <div className='relative flex items-center justify-center xs:h-[20vh]
                      shadow-lg shadow-gray-500 mb-4' style={galleryHeader}>
        <div className='max-w-[1240px] mx-auto absolute xs:px-10 text-center'>
        <h1 className='text-white md:text-4xl sm:text-2xl tracking-wide text-xl font-bold'>GALLERY</h1>
          <div className='w-[100px] h-[4px] mx-auto bg-green-600 rounded-md mt-4 mb-3'></div>
          <p className='text-white md:mt-5 md:pt-5 md:text-xl xs:text-base font-sans'>Lorem ipsum dolor sit amet, consectetur adipiscing 
          elit duis sed dapibus leonec.</p>
        </div>
      </div>

      <div className="xs:py-[5rem] z-0 max-w-[1440px] bg-gray-50 mx-auto grid md:grid-cols-4 gap-16">
        {mealData.slice(0, 16).map((meal, index) => (
          <motion.div key={index} className="gallery-item shadow-xl rounded-lg"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 1.2 }}
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