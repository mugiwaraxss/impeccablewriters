// src/components/Navigation.js
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl text-blue-600">Impeccable Writers</div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Order Now</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300">Dashboard</button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <a href="#services" className="block py-2 text-gray-700 hover:text-blue-600">Services</a>
            <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600">About</a>
            <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600">Contact</a>
            <a href="#samples" className="block py-2 text-gray-700 hover:text-blue-600">Samples</a>
            <a href="#faq" className="block py-2 text-gray-700 hover:text-blue-600">FAQ</a>
            <button className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Order Now</button>
            <button className="w-full mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300">Dashboard</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;