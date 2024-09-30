// src/pages/LandingPage.js
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhyChooseUs from '../components/WhyChooseUs';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <Navigation />
      </header>
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <About />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default LandingPage;
