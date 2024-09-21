// src/components/Contact.js
import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <div className="max-w-md mx-auto">
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            <input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            <textarea placeholder="Your Message" rows="4" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">Send Message</button>
          </form>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600 flex items-center justify-center"><Mail className="w-5 h-5 mr-2" /> contact@impeccablewriters.com</p>
          <p className="text-gray-600 flex items-center justify-center mt-2"><Phone className="w-5 h-5 mr-2" /> (123) 456-7890</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;