// src/pages/AllServices.js
import React from 'react';
import { Pen, BookOpen, ClipboardList, FileText } from 'lucide-react';

const AllServices = () => {
  return (
    <section id="all-services" className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">All Our Services</h2>
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
          <ServiceCard
            icon={<ClipboardList className="w-12 h-12 text-blue-600 mb-4" />}
            title="Book Report"
            description="Detailed book reports that highlight the main points and critical insights."
          />
          <ServiceCard
            icon={<FileText className="w-12 h-12 text-blue-600 mb-4" />}
            title="Movie Review"
            description="Well-structured movie reviews focusing on critical analysis and themes."
          />
          <ServiceCard
            icon={<FileText className="w-12 h-12 text-blue-600 mb-4" />}
            title="Article Critique"
            description="Comprehensive critiques of academic articles, reviewing arguments and methodologies."
          />
          {/* Continue with all other services */}
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

export default AllServices;
