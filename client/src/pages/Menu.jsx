import React, { useState, useEffect } from 'react'
import { faStar, faPlusCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../components/Navbar'
import menubg from '../assets/menubanner.jpg';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddFoodModal from '../components/AddFoodModal';
import EditFoodModal from '../components/EditFoodModal';


const Menu = () => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null); 
  const [menuItems, setMenuItems] = useState({
    snack: [],
    maincourse: [],
    coffee: [],
    alcohol: []
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081/menu')
      .then(res => {
        if (res.data.Status === "Success") {
          const categorizedMenu = categorizeMenu(res.data.menu);
          setMenuItems(categorizedMenu);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const categorizeMenu = (menu) => {
    const categorizedMenu = {
      snack: [],
      maincourse: [],
      coffee: [],
      alcohol: []
    };
    menu.forEach(item => {
      categorizedMenu[item.category].push(item);
    });
    return categorizedMenu;
  };


  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setUsername(res.data.username);
        } else {
          setAuth(false);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(false);
          setUsername('');
        }
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (foodID) => {
    const selectedItem = Object.values(menuItems).flatMap(items => items).find(item => item.foodID === foodID);
    setEditItem(selectedItem);
    setShowEditModal(true); 
}


  const handleDelete = async (foodID) => {
    try{
        await axios.delete(`http://localhost:8081/menu/${foodID}`)
        window.location.reload()
    }catch(err) {
        console.log(err);
    }
}

  const menuHeader = {
    backgroundImage: `url(${menubg})`,
    backgroundSize: 'cover',  
    backgroundPosition: 'left top',
    height: '30vh',
    marginTop: '5rem',
  };


  return (
    <>
    <Navbar bg="#282828" hasShadow={true} auth={auth} handleLogout={handleLogout}/>

    <div className='relative flex items-center justify-center xs:h-[20vh]
                      shadow-lg shadow-gray-500 mb-4' style={menuHeader}>
        <div className='max-w-[1240px] mx-auto absolute xs:px-10 text-center'>
        <h1 className='text-white md:text-4xl sm:text-2xl tracking-wide text-xl font-bold'>MENU</h1>
          <div className='w-[100px] h-[4px] mx-auto bg-green-600 rounded-md mt-4 mb-3'></div>
          <p className='text-white md:mt-5 md:pt-5 md:text-xl xs:text-base font-sans'>Lorem ipsum dolor sit amet, consectetur adipiscing 
          elit duis sed dapibus leonec.</p>
        </div>
      </div>

    <motion.div className='w-full bg-gray-100 xs:py-[5rem] px-4 mx-auto z-0'
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 1.0, delay: 0.2 }}
    >
          <div className='mx-auto max-w-[1240px] flex md:justify-end xs:justify-center'>
            {auth && (
              <div className='mb-4'>
                <Link to="">
                  <button
                   onClick={() => setShowModal(true)}
                   className='p-2 border-solid border-2 border-green-900 rounded-lg bg-green-900 text-white
                   md:text-lg font-semibold hover:bg-green-800 shadow-md shadow-gray-500'>
                    <FontAwesomeIcon 
                    icon={faPlusCircle}
                    className="cursor-pointer mr-2 md:text-xl"
                     />
                    Add Food
                  </button>
                </Link>
              </div>
            )}
          </div>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-16 z-10'>
          {/*snack section*/}
          {menuItems.snack && (
            <div className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg bg-gray-50'>
              <h2 className='text-2xl text-center py-3'>Snacks</h2>
              <div className='w-[60px] h-[3px] mx-auto bg-green-600 rounded-md mt-1 mb-4'></div>
              {menuItems.snack.map(item => (
                 <div key={item.foodID} className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                 <ul>
                   <li className='px-3 mb-4'>
                     <b className='font-[sans-serif]'>{item.foodName}</b>
                     <span className='float-right mr-3 font-semibold'>PHP {item.price}</span><br />
                     <i>{item.foodDesc}</i>
                     {
                      auth ? (
                        <>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="text-red-800 cursor-pointer mr-3 float-right"
                          onClick={() => handleDelete(item.foodID)}
                        />
                      <FontAwesomeIcon
                          icon={faEdit}
                          className="mr-3 text-gray-500 cursor-pointer float-right"
                          onClick={() => handleEdit(item.foodID)}
                        />
                     
                        </>
                      )
                        :
                        null 
                     }
                   </li>   
                 </ul>
               </div>
             ))}
             </div>
          )}

          {/*main course*/}
          {menuItems.maincourse && (
            <div className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg bg-gray-50'>
              <h2 className='text-2xl text-center py-3'>Main Course</h2>
              <div className='w-[60px] h-[3px] mx-auto bg-green-600 rounded-md mt-1 mb-3'></div>
              {menuItems.maincourse.map(item => (
                 <div key={item.foodID} className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                 <ul>
                   <li className='px-3 mb-4'>
                     <b className='font-[sans-serif]'>{item.foodName}</b>
                     <span className='float-right mr-3 font-semibold'>PHP {item.price}</span><br />
                     <i>{item.foodDesc}</i>
                     {
                      auth ? (
                        <>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="text-red-800 cursor-pointer mr-3 float-right"
                          onClick={() => handleDelete(item.foodID)}
                        />
                      <FontAwesomeIcon
                          icon={faEdit}
                          className="mr-3 text-gray-500 cursor-pointer float-right"
                          onClick={() => handleEdit(item.foodID)}
                        />
                     
                        </>
                      )
                        :
                        null 
                     }
                   </li>
                 </ul>
               </div>
             ))}
             </div>
          )}

          {/* kape*/}
          {menuItems.coffee && (
            <div className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg bg-gray-50'>
              <h2 className='text-2xl text-center py-3'>Coffee <FontAwesomeIcon icon={faStar} className='text-yellow-500' /></h2>
              <div className='w-[60px] h-[3px] mx-auto bg-green-600 rounded-md mt-1 mb-3'></div>
              {menuItems.coffee.map(item => (
                <div key={item.foodID} className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                <ul>
                  <li className='px-3 mb-4'>
                    <b className='font-[sans-serif]'>{item.foodName}</b>
                    <span className='float-right mr-3 font-semibold'>PHP {item.price}</span><br />
                    <i>{item.foodDesc}</i>
                    {
                      auth ? (
                        <>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="text-red-800 cursor-pointer mr-3 float-right"
                          onClick={() => handleDelete(item.foodID)}
                        />
                      <FontAwesomeIcon
                          icon={faEdit}
                          className="mr-3 text-gray-500 cursor-pointer float-right"
                          onClick={() => handleEdit(item.foodID)}
                        />
                     
                        </>
                      )
                        :
                        null 
                     }
                  </li>
                </ul>
              </div>
            ))}
            </div>
          )}

          {/*tagay*/}
          {menuItems.alcohol && (
            <div className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg bg-gray-50'>
              <h2 className='text-2xl text-center py-3'>Alcohol <FontAwesomeIcon icon={faStar} className='text-yellow-500' /></h2>
              <div className='w-[60px] h-[3px] mx-auto bg-green-600 rounded-md mt-1 mb-3'></div>
              {menuItems.alcohol.map(item => (
                <div key={item.foodID} className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                <ul>
                  <li className='px-3 mb-4'>
                    <b className='font-[sans-serif]'>{item.foodName}</b>
                    <span className='float-right mr-3 font-semibold'>PHP {item.price}</span><br />
                    <i>{item.foodDesc}</i>
                    {
                      auth ? (
                        <>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="text-red-800 cursor-pointer mr-3 float-right"
                          onClick={() => handleDelete(item.foodID)}
                        />
                      <FontAwesomeIcon
                          icon={faEdit}
                          className="mr-3 text-gray-500 cursor-pointer float-right"
                          onClick={() => handleEdit(item.foodID)}
                        />
                     
                        </>
                      )
                        :
                        null 
                     }
                  </li>
                </ul>
              </div>
            ))}
            </div>
          )}
        </div>
      </motion.div>
      <EditFoodModal 
        show={showEditModal} 
        onClose={() => setShowEditModal(false)} 
        item={editItem} 
      />
      <AddFoodModal show={showModal} onClose={() => setShowModal(false)} />
      <Footer />
    </>
  );
}

export default Menu;