import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';

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
  
  return (
    <>
      <Navbar bg="#282828" hasShadow={true}/>
      <div className="gallery flex">
        {mealData.slice(0, 16).map((meal, index) => (
          <div key={index} className="gallery-item">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery