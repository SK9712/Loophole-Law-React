import React, { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';

// Menu Icons as components using SVG
const MenuIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-6 h-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M4 6h16M4 12h16M4 18h16" 
    />
  </svg>
);

const CloseIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-6 h-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M6 18L18 6M6 6l12 12" 
    />
  </svg>
);

const LLawNavbar = () => {
  const [nav, setNav] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: 'Home', href: '/'},
    { id: 2, text: 'Company', href: '/company'},
    { id: 3, text: 'Resources', href: '/resources'},
    { id: 4, text: 'About', href: '/about'},
    { id: 5, text: 'Contact', href: '/contact'},
  ];

  const isActive = (href) => currentPath === href;

  const getLinkStyles = (href) => {
    const baseStyles = 'px-4 py-2 rounded-lg transition-all duration-200';
    const activeStyles = 'bg-green-400 text-black font-medium';
    const inactiveStyles = 'text-gray-300 hover:bg-green-400 hover:text-black';
    
    return `${baseStyles} ${isActive(href) ? activeStyles : inactiveStyles}`;
  };

  const getMobileLinkStyles = (href) => {
    const baseStyles = 'block px-4 py-3 rounded-lg transition-all duration-200';
    const activeStyles = 'bg-green-400 text-black font-medium';
    const inactiveStyles = 'text-gray-300 hover:bg-green-400 hover:text-black';
    
    return `${baseStyles} ${isActive(href) ? activeStyles : inactiveStyles}`;
  };

  return (
    <div id='llawnavbar' className='bg-black fixed top-0 left-0 right-0 z-50'>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
        {/* Logo Section */}
        <a href="/" className='flex items-center gap-2 hover:opacity-90 transition-opacity'>
          <Scale className="w-8 h-8 text-blue-400" />
          <h1 className='text-2xl font-bold text-green-400'>LoopholeLaw.</h1>
        </a>

        {/* Desktop Navigation */}
        <ul className='hidden md:flex items-center gap-1'>
          {navItems.map(item => (
            <li key={item.id}>
              <a
                href={item.href}
                className={getLinkStyles(item.href)}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          onClick={handleNav} 
          className='block md:hidden text-green-400 p-2 hover:bg-green-400/10 rounded-lg transition-colors'
          aria-label={nav ? 'Close menu' : 'Open menu'}
        >
          {nav ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Mobile Navigation Menu */}
        <div className={`
          md:hidden fixed inset-0 bg-black/90 backdrop-blur-sm
          transition-all duration-300 ease-in-out
          ${nav ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}>
          <div className={`
            fixed top-0 right-0 h-full w-[280px] bg-black border-l border-gray-900
            transform transition-transform duration-300 ease-in-out
            ${nav ? 'translate-x-0' : 'translate-x-full'}
            p-6
          `}>
            {/* Mobile Menu Header */}
            <div className='flex items-center justify-between mb-8'>
              <div className='flex items-center gap-2'>
                <Scale className="w-6 h-6 text-blue-400" />
                <span className='text-xl font-bold text-green-400'>LoopholeLaw.</span>
              </div>
              <button
                onClick={handleNav}
                className='p-2 hover:bg-green-400/10 rounded-lg transition-colors text-green-400'
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <nav>
              <ul className='space-y-1'>
                {navItems.map(item => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={getMobileLinkStyles(item.href)}
                      onClick={() => setNav(false)}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Footer */}
            <div className='absolute bottom-8 left-6 right-6'>
              <hr className='border-gray-800 mb-6' />
              <div className='text-sm text-gray-500 flex justify-between'>
                <a href="/privacy" className='hover:text-green-400 transition-colors'>Privacy</a>
                <a href="/terms" className='hover:text-green-400 transition-colors'>Terms</a>
                <a href="/contact" className='hover:text-green-400 transition-colors'>Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLawNavbar;