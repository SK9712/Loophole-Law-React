import React, { useState, useEffect, useCallback } from 'react';
import { Scale, ChevronDown, BookOpen } from 'lucide-react';
import LLogo from '../LLogo';

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
  const [currentPath, setCurrentPath] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  // Define navItems
  const navItems = [
    { 
      id: 1, 
      text: 'Home', 
      href: '/'
    },
    { 
      id: 2, 
      text: 'Practice Areas', 
      href: '/practice-areas',
      subItems: [
        { text: 'Criminal Law', href: '/practice-areas/criminal-law' },
        { text: 'Cyber Law', href: '/practice-areas/cyber-law' },
        { text: 'Civil Law', href: '/practice-areas/civil-law' },
        { text: 'Family Law', href: '/practice-areas/family-law' },
        { text: 'Banking Law', href: '/practice-areas/banking-law' },
        { text: 'Registration Law', href: '/practice-areas/registration-law' },
        { text: 'Corporate Law', href: '/practice-areas/corporate-law' },
        { text: 'Intellectual Property', href: '/practice-areas/ip-law' },
        { text: 'Tax Law', href: '/practice-areas/tax-law' }
      ]
    },
    { 
      id: 3, 
      text: 'Our Team', 
      href: '/team/attorneys',
      subItems: [
        { text: 'Attorneys', href: '/team/attorneys' },
        { text: 'Partners', href: '/team/partners' },
        { text: 'Legal Staff', href: '/team/staff' }
      ]
    },
    { 
      id: 4, 
      text: 'Resources', 
      href: '/resources',
      subItems: [
        { text: 'Blog', href: '/resources/blog' },
        { text: 'FAQs', href: '/resources/faqs' }
      ]
    },
    { 
      id: 5, 
      text: 'About', 
      href: '/about',
      subItems: [
        { text: 'Our Story', href: '/about/story' },
        { text: 'Mission & Values', href: '/about/mission' },
        { text: 'Recognition', href: '/about/recognition' },
        { text: 'Careers', href: '/about/careers' }
      ]
    },
    { 
      id: 6, 
      text: 'Contact', 
      href: '/contact'
    }
  ];

  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };
    updatePath();
    window.addEventListener('popstate', updatePath);
    return () => {
      window.removeEventListener('popstate', updatePath);
      if (dropdownTimeout) clearTimeout(dropdownTimeout);
    };
  }, [dropdownTimeout]);

  const handleMouseEnter = useCallback((id) => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setActiveDropdown(id);
  }, [dropdownTimeout]);

  const handleMouseLeave = useCallback(() => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setDropdownTimeout(timeout);
  }, []);

  const handleLinkClick = (href, e) => {
    setCurrentPath(href);
    setNav(false);
  };

  const isActive = (href) => currentPath === href;

  return (
    <div id='llawnavbar' className='bg-black fixed top-0 left-0 right-0 z-50'>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
        {/* Logo Section */}
        <a 
          href="/" 
          className='hover:opacity-90 transition-opacity'
          onClick={(e) => handleLinkClick('/', e)}
        >
          <LLogo />
        </a>

        {/* Desktop Navigation */}
        <ul className='hidden md:flex items-center gap-1'>
          {navItems.map(item => (
            <li 
              key={item.id}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={item.href}
                onClick={(e) => handleLinkClick(item.href, e)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1
                  ${isActive(item.href) 
                    ? 'bg-green-400 text-black font-medium' 
                    : 'text-gray-300 hover:bg-green-400/10 hover:text-green-400'}`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.text}
                {item.subItems && <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />}
              </a>

              {/* Dropdown Menu */}
              {item.subItems && activeDropdown === item.id && (
                <div 
                  className="absolute top-full left-0 pt-2 w-60"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="py-2 bg-slate-900 rounded-lg shadow-xl border border-slate-800">
                    {item.subItems.map((subItem, index) => (
                      <a
                        key={index}
                        href={subItem.href}
                        onClick={(e) => handleLinkClick(subItem.href, e)}
                        className="block px-4 py-2 text-gray-300 hover:bg-green-400/10 hover:text-green-400 transition-colors"
                      >
                        {subItem.text}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setNav(!nav)}
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
            transform transition-transform duration-300 ease-in-out overflow-y-auto
            ${nav ? 'translate-x-0' : 'translate-x-full'}
            p-6
          `}>
            {/* Mobile Menu Header */}
            <div className='flex items-center justify-between mb-8'>
              <LLogo />
              <button
                onClick={() => setNav(false)}
                className='p-2 hover:bg-green-400/10 rounded-lg transition-colors text-green-400'
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <nav>
              <ul className='space-y-4'>
                {navItems.map(item => (
                  <li key={item.id} className="space-y-2">
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(item.href, e)}
                      className={`block px-4 py-2 rounded-lg transition-all duration-200
                        ${isActive(item.href) 
                          ? 'bg-green-400 text-black font-medium' 
                          : 'text-gray-300 hover:bg-green-400/10 hover:text-green-400'}`}
                    >
                      {item.text}
                    </a>
                    {item.subItems && (
                      <div className="pl-4 space-y-1">
                        {item.subItems.map((subItem, index) => (
                          <a
                            key={index}
                            href={subItem.href}
                            onClick={(e) => handleLinkClick(subItem.href, e)}
                            className="block px-4 py-2 text-sm text-gray-400 hover:text-green-400 transition-colors"
                          >
                            {subItem.text}
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLawNavbar;