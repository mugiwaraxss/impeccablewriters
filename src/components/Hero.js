import React, { useState, useEffect } from 'react';
import { Calculator, FileText, GraduationCap, Clock } from 'lucide-react';

const Hero = () => {
  const [pages, setPages] = useState(1);
  const [urgency, setUrgency] = useState(24);
  const [urgencyUnit, setUrgencyUnit] = useState('hours');
  const [workType, setWorkType] = useState('Writing');
  const [academicLevel, setAcademicLevel] = useState('University');
  const [price, setPrice] = useState(0);

  const calculatePrice = () => {
    let pricePerPage;

    // Determine base price based on work type and academic level
    if (workType === 'Editing') {
      pricePerPage = 6;
    } else if (workType === 'Writing') {
      pricePerPage = (academicLevel === 'High School' || academicLevel === 'University') ? 9 : 13;
    } else if (workType === 'Rewriting') {
      pricePerPage = (academicLevel === 'High School' || academicLevel === 'University') ? 8 : 11;
    }

    // Convert urgency to hours if it's in days
    const urgencyInHours = urgencyUnit === 'days' ? urgency * 24 : urgency;

    // Adjust price based on urgency
    if (urgencyInHours > 24) {
      const daysOver24 = Math.floor((urgencyInHours - 24) / 24);
      pricePerPage = Math.max(pricePerPage - daysOver24, 1); // Ensure price doesn't go below $1
    }

    return (pricePerPage * pages).toFixed(2);
  };

  useEffect(() => {
    setPrice(calculatePrice());
  }, [pages, urgency, urgencyUnit, workType, academicLevel]);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-left mb-8 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Academic Writing <br />
            <span className="text-yellow-300">Service</span> Delivering the <br />
            Best Help Online
          </h1>
          <p className="text-xl mb-8">
            Are you looking for an academic writer? Delve into our professional writing
            services online. Opt-in for the best all-inclusive help with academic writing by
            industry-leading subject virtuosos.
          </p>
        </div>
        <div className="lg:w-1/2 w-full max-w-md">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-blue-100 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Calculator className="text-blue-600 mr-2" size={24} />
                <h2 className="text-xl font-semibold text-blue-600">Price Calculator</h2>
              </div>
              <span className="text-3xl font-bold text-blue-600">${price}</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <FileText className="text-gray-400" size={20} />
                <select 
                  className="flex-grow p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                >
                  <option>Writing</option>
                  <option>Editing</option>
                  <option>Rewriting</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <GraduationCap className="text-gray-400" size={20} />
                <select 
                  className="flex-grow p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  value={academicLevel}
                  onChange={(e) => setAcademicLevel(e.target.value)}
                >
                  <option>High School</option>
                  <option>University</option>
                  <option>Master's</option>
                  <option>Ph.D.</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <FileText className="text-gray-400" size={20} />
                <div className="flex-grow flex items-center">
                  <button onClick={() => setPages(Math.max(1, pages - 1))} className="bg-gray-100 px-3 py-2 rounded-l-md hover:bg-gray-200 transition text-gray-700">-</button>
                  <input 
                    type="number" 
                    value={pages} 
                    onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))} 
                    className="w-full text-center border-t border-b border-gray-300 p-2 text-gray-700" 
                  />
                  <button onClick={() => setPages(pages + 1)} className="bg-gray-100 px-3 py-2 rounded-r-md hover:bg-gray-200 transition text-gray-700">+</button>
                </div>
                <span className="text-gray-700">pages</span>
              </div>
              <div className="flex items-center space-x-4">
                <Clock className="text-gray-400" size={20} />
                <div className="flex-grow flex items-center">
                  <button onClick={() => setUrgency(Math.max(1, urgency - 1))} className="bg-gray-100 px-3 py-2 rounded-l-md hover:bg-gray-200 transition text-gray-700">-</button>
                  <input 
                    type="number" 
                    value={urgency} 
                    onChange={(e) => setUrgency(Math.max(1, parseInt(e.target.value) || 1))} 
                    className="w-full text-center border-t border-b border-gray-300 p-2 text-gray-700" 
                  />
                  <button onClick={() => setUrgency(urgency + 1)} className="bg-gray-100 px-3 py-2 rounded-r-md hover:bg-gray-200 transition text-gray-700">+</button>
                </div>
                <select
                  className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  value={urgencyUnit}
                  onChange={(e) => setUrgencyUnit(e.target.value)}
                >
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
            <div className="p-6 bg-blue-50">
              <button className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 shadow-md">
                Continue →
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;