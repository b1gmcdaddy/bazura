import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ bg, hasShadow }) => {

  const Navlinks = [
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const [openMenu, setOpenMenu] = useState(false);

  const style = {
    fontFamily: 'customFont, sans-serif',
  };
  const shadowBelowNav = hasShadow ? 'shadow-lg shadow-gray-500' : '';

  return (
    <nav className={`w-full fixed top-0 left-0 z-10 ${shadowBelowNav}`} style={{ backgroundColor: bg }}>
      <div className="md:flex items-center md:mx-64 justify-between py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-white">
        <Link to="/" className="text-4xl mr-1 pt-2 md:tracking-newLS" style={style}>BAZ</Link>
        </div>
        <div onClick={() => setOpenMenu(!openMenu)} className='text-3xl absolute right-8 top-6 text-white cursor-pointer md:hidden'>
        <FontAwesomeIcon icon={openMenu ? faXmark : faBars } />
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] 
        left-0 top-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${openMenu ? 'top-20':'top-[-490px]'}`}>

          {Navlinks.map((link, index) => (
            <li key={index} className='md:ml-8 uppercase xs:my-2 md:my-0 my-7'>
              <NavLink to={link.path} className="text-white md:text-lg font-medium hover:text-xl hover:transition-all duration-500 ease-in">
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
