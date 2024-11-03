import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';

const LLawNavbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 
      "text-white-600" : "text-gray-600 hover:text-white-600";
  };
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Home' , component: '/'},
    { id: 2, text: 'Company' , component: '/company'},
    { id: 3, text: 'Resources' , component: '/resources'},
    { id: 4, text: 'About' , component: '/about'},
    { id: 5, text: 'Contact', component: '/contact'},
  ];

  return (
    <div id='llawnavbar' className='bg-black flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      {/* Logo */}
      <img id="logo-navbar" className='w-10 m-4' src="assets/llaw-logo.jpg" />
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Loophole Law.</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
          >
            <Link to={item.component} className={`transition-colors duration-200 ${isActive(item.component)}`}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <img id="logo-navbar" className='w-10 m-4' src="assets/llaw-logo.jpg" />
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>Loophole Law.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LLawNavbar;