const axios = require('axios');

const fetchMeal = async (mealId) => {
  try {
    const response = await axios.get(`http://localhost:8081/meals?id=${mealId}`, { withCredentials: true });
    return response.data.meals[0];
  } catch (error) {
    throw new Error('Error fetching meal data');
  }
};

module.exports = fetchMeal;