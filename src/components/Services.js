// src/components/Services.js
import React from 'react';
import { Pen, BookOpen, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate(); // React Router hook to navigate to the services page

  return (
    <section id="services" className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Our Top Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Pen className="w-12 h-12 text-blue-600 mb-4" />}
            title="Essay Writing"
            description="Custom essays tailored to your specific requirements and academic standards."
          />
          <ServiceCard
            icon={<BookOpen className="w-12 h-12 text-blue-600 mb-4" />}
            title="Research Assistance"
            description="Expert help with literature reviews, data analysis, and research methodologies."
          />
          <ServiceCard
            icon={<ClipboardList className="w-12 h-12 text-blue-600 mb-4" />}
            title="Editing & Proofreading"
            description="Polishing your work to perfection with our meticulous editing services."
          />
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/services')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Show More
          </button>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    {icon}
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Services;
