import React from 'react';
import Navigation from '../components/Navigation'; // Adjust the import path as needed

const samplePapers = [
  {
    id: 1,
    title: "The Impact of Artificial Intelligence on Modern Healthcare",
    subject: "Technology",
    excerpt: "This paper explores the transformative role of AI in healthcare, discussing its applications in diagnosis, treatment planning, and patient care...",
  },
  {
    id: 2,
    title: "Climate Change: A Comprehensive Analysis of Global Trends",
    subject: "Environmental Science",
    excerpt: "An in-depth look at climate change patterns over the past century, analyzing data from various sources to project future scenarios...",
  },
  {
    id: 3,
    title: "The Evolution of Social Media and Its Influence on Society",
    subject: "Sociology",
    excerpt: "This article traces the development of social media platforms and examines their impact on communication, relationships, and social norms...",
  },
  // Add more sample papers as needed
];

const SamplesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-indigo-50">
      <Navigation />
      <main className="flex-grow container mx-auto p-4 mt-6">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-800 
                       bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Our Academic Writing Showcase
        </h1>
        
        <p className="mb-8 text-lg text-center text-gray-700 max-w-2xl mx-auto">
          Explore our collection of meticulously crafted academic papers. Each piece demonstrates our commitment to excellence, rigorous research, and insightful analysis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {samplePapers.map((paper) => (
            <div key={paper.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
                <h3 className="text-xl font-bold">{paper.title}</h3>
              </div>
              <div className="p-4 flex-grow">
                <p className="text-sm font-semibold text-indigo-600 mb-2">{paper.subject}</p>
                <p className="text-gray-600">{paper.excerpt}</p>
              </div>
              <div className="bg-gray-50 p-4">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full font-medium transition duration-300">
                  Read Full Paper
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">Our Commitment to Excellence</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Each sample represents our dedication to thorough research and academic integrity.</li>
            <li>We prioritize client confidentiality; displayed works are for demonstration only.</li>
            <li>These samples showcase our versatility across various academic disciplines.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default SamplesPage;