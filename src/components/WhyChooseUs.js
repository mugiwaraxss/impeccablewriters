import React from 'react';
import { Users, Target, FileCheck, Lock } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Expert Academic Team",
      description: "Our rigorously selected team comprises top-tier academics, researchers, and industry professionals. Their combined expertise ensures your papers are crafted with depth, insight, and academic precision."
    },
    {
      icon: <Target className="w-12 h-12 text-blue-500" />,
      title: "Tailored to Your Needs",
      description: "We understand that each academic project is unique. Our service is designed to align perfectly with your specific requirements, ensuring a customized approach that meets and exceeds your expectations."
    },
    {
      icon: <FileCheck className="w-12 h-12 text-blue-500" />,
      title: "Originality Guaranteed",
      description: "Authenticity is at the core of our service. Every paper we produce is an original creation, meticulously crafted to your specifications and thoroughly checked for plagiarism, ensuring 100% unique content."
    },
    {
      icon: <Lock className="w-12 h-12 text-blue-500" />,
      title: "Your Privacy, Our Priority",
      description: "We understand the importance of discretion in academic services. Our stringent confidentiality policies ensure that your personal information and academic work remain completely secure and private."
    }
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-2">{reason.title}</h3>
              <p className="text-gray-600 text-center">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;