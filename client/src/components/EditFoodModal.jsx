import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditFoodModal = ({ show, onClose, item }) => {
  const [foodName, setFoodName] = useState('');
  const [foodDesc, setFoodDesc] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (item) {
      setFoodName(item.foodName);
      setFoodDesc(item.foodDesc);
      setPrice(item.price);
    }
  }, [item]);

  const handleSubmit = (e) => {
    axios.put(`http://localhost:8081/menu/${item.foodID}`, {
      foodName,
      foodDesc,
      price
    })
    .then(res => {
      if(res.data.Status === "Success") {
        alert("Food item updated successfully!");
        onClose();
      }
    })
    .catch(err => console.log(err));
  }

  if(!show || !item){
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-auto">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-xl text-center mb-4">EDIT MENU ITEM</h2>
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
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
            <input 
              type="text" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mr-3 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              SAVE
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

export default EditFoodModal;
