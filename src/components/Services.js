// src/components/Services.js
import React from 'react';
import { Pen, BookOpen, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();  // Set up navigation

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Our Top Services</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            icon={<Pen className="w-8 h-8 text-blue-500" />}
            title="Essay Writing"
            description="Custom essays tailored to your specific requirements and academic standards."
          />
          <ServiceCard
            icon={<BookOpen className="w-8 h-8 text-blue-500" />}
            title="Research Assistance"
            description="Expert help with literature reviews, data analysis, and research methodologies."
          />
          <ServiceCard
            icon={<ClipboardList className="w-8 h-8 text-blue-500" />}
            title="Editing & Proofreading"
            description="Polishing your work to perfection with our meticulous editing services."
          />
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/services')}
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Explore All Services
          </button>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, description }) => {
  const navigate = useNavigate();  // Set up navigation for "Get Help" button

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button
        onClick={() => navigate('/login')}  // Redirect to login page when "Get Help" is clicked
        className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Get Help
      </button>
    </div>
  );
};

export default Services;
