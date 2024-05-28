import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const AddFoodModal = ({ show, onClose }) => {
  const [foodName, setFoodName] = useState('');
  const [foodDesc, setFoodDesc] = useState('');
  const [category, setCategory] = useState('snack');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    axios.post('https://bazura.onrender.com/addFood', {
      foodName,
      foodDesc,
      category,
      price
    })
    .then(res => {
      if(res.data.Status === "Success") {
        alert("Food item added successfully!");
        onClose();
      }
    })
    .catch(err => console.log(err));
  }

  if(!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-auto">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-xl text-center mb-4">ADD TO MENU</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Food Name</label>
            <input 
              type="text" 
              value={foodName} 
              onChange={(e) => setFoodName(e.target.value)} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Food Description</label>
            <input 
              type="text" 
              value={foodDesc} 
              onChange={(e) => setFoodDesc(e.target.value)} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <div className="relative">
              <div className="flex">
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="snack">Snack</option>
                  <option value="maincourse">Main Course</option>
                  <option value="coffee">Coffee</option>
                  <option value="alcohol">Alcohol</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700">
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
            <input 
              type="text" 
              value={price} 
              placeholder='PHP'
              onChange={(e) => setPrice(e.target.value)} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button 
              type="submit" 
              className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 mr-3 rounded focus:outline-none focus:shadow-outline"
            >
              ADD
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              CLOSE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFoodModal;
