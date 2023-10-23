import React from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../components/Navbar'
import menubg from '../assets/menubanner.jpg';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const Menu = () => {

  const menuHeader = {
    backgroundImage: `url(${menubg})`,
    backgroundSize: 'cover',  
    backgroundPosition: 'left top',
    height: '40vh',
  };

  {/*SNACKS LIST*/}
  const snacks = [
    {
      name: "Marty's Cracklin'",
      price: "₱30",
      description: "Vegetarian Chicharon Old-fashioned Style. Salt and Vinegar",
    },
    {
      name: "Super Crunch",
      price: "₱25",
      description: "Tasty Filipino Cornchips. Sweet Corn & Cheese",
    },
    {
      name: "Jack 'n Jill Nova",
      price: "₱30",
      description: "The first multigrain snack in the Philippines. Cheddar & BBQ",
    },
    {
      name: "Jack 'n Jill Piatos'",
      price: "₱30",
      description: "Hexagon-shaped potato crisps. Sour Cream, Cheddar, & BBQ",
    },
  ];

  {/*MAINCOURSE LIST*/}
  const mainCourse = [
    {
      name: "Pork Sisig",
      price: "₱45",
      description: "Fried pig face seasoned with calamansi, onions, and chili peppers.",
      hasStar: true,
    },
    {
      name: "Pork Barbeque",
      price: "₱12",
      description: "Marinated pork slices skewered and grilled.",
    },
    {
      name: "Giniling",
      price: "₱45",
      description: "Ground pork with veggies.",
    },
    {
      name: "Pancit Bihon",
      price: "₱30",
      description: "Filipino noodles mixed with veggies.",
    },
  ];

  {/*COFFEE LIST*/}
  const kape = [
    {
      name: "Kape",
      price: "₱25",
      description: "Coffee sachet. Lami parison og vape/smoke.",
      hasStar: true,
    },
    {
      name: "Iced Coffee",
      price: "₱50",
      description: "Tunay na iced coffee. Mga chuy ray mamalit ani.",
    },
    {
      name: "Caffe Latte",
      price: "₱75",
      description: "Coffee drink made with espresso and steamed milk.",
    },
    {
      name: "Caffè Americano",
      price: "₱50",
      description: "Espresso shot with hot water at a 1:4 ratio.",
    },
  ];

  {/*ALCOHOL LIST*/}
  const tagay = [
    {
      name: "Tanduay Rhum 250 ML",
      price: "₱140",
      description: "Also known as Lapad. Iconic drink ng baz.",
      hasStar: true,
    },
    {
      name: "Pink Gin",
      price: "₱180",
      description: "Kung naay chix kani palita.",
    },
    {
      name: "G.S.M. Blue",
      price: "₱130",
      description: "Chill drinks. Sugar cane alcohol mixed with berries.",
    },
    {
      name: "Red Horse Litro",
      price: "₱120",
      description: "1L Red Horse makabugnaw sa pamati.",
    },
  ];

  return (
    <>
    <Navbar bg="#282828" hasShadow={true}/>

    <div className='py-20 shadow-lg shadow-gray-500 mb-4' style={menuHeader}>
        <div className='max-w-[1240px] mx-auto text-center my-[5rem]'>
          <h1 className='text-white md:text-4xl sm:text-2xl tracking-wide text-xl font-bold'>MENU</h1>
          <div className='md:w-[100px] xs:w-[60px] h-[4px] mx-auto bg-green-600 rounded-md mt-3'></div>
          <p className='text-white mt-2 pt-5 md:text-xl xs:text-base font-sans'>Lorem ipsum dolor sit amet, consectetur 
          adipiscing elit duis sed dapibus leonec.</p>
        </div>
      </div>

    <motion.div className='w-full bg-gray-100 xs:py-[5rem] px-4 mx-auto z-0'
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 1.5, delay: 0.2 }}
    >
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-16 z-10'>
          {/*SNACKS SECTION*/}
          <div className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg bg-gray-50'>
            <h2 className='text-2xl text-center py-3'>SNACKS</h2>
            <div className='w-[60px] h-[3px] mx-auto bg-green-600 rounded-md mt-1 mb-4'></div>
            {snacks.map((snack, index) => (
            <div key={index} className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <ul>
                <li className='px-3 mb-4'>
                  <b className='font-[sans-serif]'>{snack.name}</b>
                  <span className='float-right mr-3 font-semibold'>{snack.price}</span><br />
                  <i>{snack.description}</i>
                </li>
              </ul>
            </div>
          ))}
          </div>
          {/*MAIN COURSE SECTION*/}
          <div className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg bg-gray-50'>
            <h2 className='text-2xl text-center py-3'>MAIN COURSE</h2>
            <div className='w-[60px] h-[3px] mx-auto bg-green-600 rounded-md mt-1 mb-3'></div>
            {mainCourse.map((meal, index) => (
            <div key={index} className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <ul>
                <li className='px-3 mb-4'>
                  <b className='font-[sans-serif]'>{meal.name} {meal.hasStar && <FontAwesomeIcon icon={faStar} className='text-yellow-500' />}</b>
                  <span className='float-right mr-3 font-semibold'>{meal.price}</span><br />
                  <i>{meal.description}</i>
                </li>
              </ul>
            </div>
          ))}
          </div>
          {/*COFFEE SECTION*/}
          <div className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg bg-gray-50'>
            <h2 className='text-2xl text-center py-3'>COFFEE</h2>
            <div className='w-[60px] h-[3px] mx-auto bg-green-600 rounded-md mt-1 mb-3'></div>
            {kape.map((kape, index) => (
            <div key={index} className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <ul>
                <li className='px-3 mb-4'>
                  <b className='font-[sans-serif]'>{kape.name} {kape.hasStar && <FontAwesomeIcon icon={faStar} className='text-yellow-500' />}</b>
                  <span className='float-right mr-3 font-semibold'>{kape.price}</span><br />
                  <i>{kape.description}</i>
                </li>
              </ul>
            </div>
          ))}
          </div>
          {/*ALCOHOL SECTION*/}
          <div className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg bg-gray-50'>   
            <h2 className='text-2xl text-center py-3'>ALCOHOL</h2>
            <div className='w-[60px] h-[3px] mx-auto bg-green-600 rounded-md mt-1 mb-3'></div>
            {tagay.map((tagay, index) => (
            <div key={index} className='w-[-90%] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <ul>
                <li className='px-3 mb-4'>
                  <b className='font-[sans-serif]'>{tagay.name} {tagay.hasStar && <FontAwesomeIcon icon={faStar} className='text-yellow-500' />}</b>
                  <span className='float-right mr-3 font-semibold'>{tagay.price}</span><br />
                  <i>{tagay.description}</i>
                </li>
              </ul>
            </div>
          ))}
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  )
}

export default Menu