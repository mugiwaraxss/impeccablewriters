// src/components/Hero.js
import React from 'react';

const Hero = () => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Elevate Your Academic Writing</h1>
        <p className="text-xl mb-8">Precision in Every Word, Excellence in Every Paper</p>
        <a href="#contact" className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300">Get Started</a>
      </div>
    </header>
  );
};

export default Hero;