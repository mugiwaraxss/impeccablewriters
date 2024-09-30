// src/components/Navigation.js
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();  // Set up navigation

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-bold text-2xl text-blue-800 hover:text-blue-600 transition duration-300">
            Impeccable Writers
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/services" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              Services
            </Link>
            <Link to="/samples" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              Samples
            </Link>
            <NavLink href="#contact">Contact</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
            <button
              onClick={() => navigate('/login')}  // Redirect to login page
              className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300"
            >
              Order Now
            </button>
            <NavButton>Dashboard</NavButton>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-800 hover:text-blue-600">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <Link to="/services" className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              Services
            </Link>
            <Link to="/samples" className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              Samples
            </Link>
            <NavLink href="#contact" mobile>Contact</NavLink>
            <NavLink href="#faq" mobile>FAQ</NavLink>
            <button
              onClick={() => navigate('/login')}  // Redirect to login page in mobile view
              className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300"
            >
              Order Now
            </button>
            <NavButton mobile>Dashboard</NavButton>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ href, children, mobile }) => (
  <a
    href={href}
    className={`${mobile ? 'block py-2' : ''} text-gray-700 hover:text-blue-600 font-medium transition duration-300`}
  >
    {children}
  </a>
);

const NavButton = ({ children, primary, mobile }) => (
  <button
    className={`${
      primary ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    } ${mobile ? 'w-full mt-2' : ''} px-4 py-2 rounded-full font-medium transition duration-300`}
  >
    {children}
  </button>
);

export default Navigation;


