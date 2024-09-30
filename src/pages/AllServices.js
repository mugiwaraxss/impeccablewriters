import React from 'react';
import { Pen, BookOpen, ClipboardList, FileText, PieChart, Briefcase, GraduationCap, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom'; // Updated import
import Navigation from '../components/Navigation';

const AllServices = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <section id="all-services" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">All Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Pen />}
              title="Essay Writing"
              description="Custom essays tailored to your specific requirements and academic standards."
            />
            <ServiceCard
              icon={<BookOpen />}
              title="Research Assistance"
              description="Expert help with literature reviews, data analysis, and research methodologies."
            />
            <ServiceCard
              icon={<ClipboardList />}
              title="Editing & Proofreading"
              description="Polishing your work to perfection with our meticulous editing services."
            />
            <ServiceCard
              icon={<FileText />}
              title="Book Report"
              description="Detailed book reports that highlight the main points and critical insights."
            />
            <ServiceCard
              icon={<PieChart />}
              title="Movie Review"
              description="Well-structured movie reviews focusing on critical analysis and themes."
            />
            <ServiceCard
              icon={<Briefcase />}
              title="Article Critique"
              description="Comprehensive critiques of academic articles, reviewing arguments and methodologies."
            />
            <ServiceCard
              icon={<GraduationCap />}
              title="Dissertation Writing"
              description="Expert assistance in crafting high-quality dissertations across various disciplines."
            />
            <ServiceCard
              icon={<Microscope />}
              title="Lab Report"
              description="Precise and well-structured lab reports for scientific experiments and studies."
            />
            <ServiceCard
              icon={<FileText />}
              title="Case Study Analysis"
              description="In-depth analysis of case studies with practical insights and recommendations."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 group relative overflow-hidden">
    <div className="text-blue-600 mb-4">
      {React.cloneElement(icon, { size: 48 })}
    </div>
    <h3 className="text-2xl font-semibold mb-4 text-blue-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
    <div className="absolute inset-0 bg-blue-600 bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Link to="/login"> {/* Updated Link */}
        <button className="bg-yellow-500 text-blue-900 px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition duration-300">
          Get Help
        </button>
      </Link>
    </div>
  </div>
);

export default AllServices;
