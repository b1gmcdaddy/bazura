import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const Navlinks = [
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Chefs', path: '/chefs' },
    { name: 'Contact', path: '/contact' },
  ];

  const [openMenu, setOpenMenu] = useState(false);

  const style = {
    fontFamily: 'customFont, sans-serif',
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-10">
      <div className="md:flex items-center md:mx-64 justify-between py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-white">
          <span className="text-4xl mr-1 pt-2 md:tracking-newLS" style={style}>BAZ</span>
        </div>
        <div onClick={() => setOpenMenu(!openMenu)} className='text-3xl absolute right-8 top-6 text-white cursor-pointer md:hidden'>
        <FontAwesomeIcon icon={openMenu ? faXmark : faBars } />
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] 
        left-0 top-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${openMenu ? 'top-20':'top-[-490px]'}`}>

          {Navlinks.map((link, index) => (
            <li key={index} className='md:ml-8 uppercase xs:my-2 md:my-0 my-7'>
              <Link to={link.path} className="text-white md:text-lg font-medium hover:text-xl hover:transition-all duratiotion-500 ease-in">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
