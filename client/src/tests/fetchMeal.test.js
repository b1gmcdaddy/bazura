const axios = require('axios');
const fetchMeal = require('../../fetchMeal');

jest.mock('axios');

describe('fetchMeal', () => {
  test('fetches meal data from the MealDB API through the server', async () => {
    const mealId = '52772';
    const data = {
      meals: [
        {
          idMeal: '52772',
          strMeal: 'Teriyaki Chicken Casserole',
          strCategory: 'Chicken',
          strArea: 'Japanese',
          strInstructions: 'Some instructions...',
        },
      ],
    };
    axios.get.mockResolvedValue({ data });

    const result = await fetchMeal(mealId);

    expect(result).toEqual(data.meals[0]);
    expect(axios.get).toHaveBeenCalledWith(
      `http://localhost:8081/meals?id=${mealId}`,
      { withCredentials: true }
    );
  });

  test('throws an error when the API call fails', async () => {
    const mealId = '52772';
    axios.get.mockRejectedValue(new Error('Error fetching meal data'));

    await expect(fetchMeal(mealId)).rejects.toThrow('Error fetching meal data');
    expect(axios.get).toHaveBeenCalledWith(
      `http://localhost:8081/meals?id=${mealId}`,
      { withCredentials: true }
    );
  });
});
