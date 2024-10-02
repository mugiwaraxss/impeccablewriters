import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';  // Import Firebase auth

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // State for checking login status
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-bold text-2xl text-blue-800 hover:text-blue-600 transition duration-300">
            Impeccable Writers
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/services" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              Services
            </Link>
            <Link to="/samples" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              Samples
            </Link>
            <NavLink href="#contact">Contact</NavLink>
            <NavLink href="#faq">FAQ</NavLink>

            {isAuthenticated ? (
              // Show dashboard button if user is logged in
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300"
              >
                Dashboard
              </button>
            ) : (
              // Show login button if user is not logged in
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-800 hover:text-blue-600">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <Link to="/services" className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              Services
            </Link>
            <Link to="/samples" className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              Samples
            </Link>
            <NavLink href="#contact" mobile>Contact</NavLink>
            <NavLink href="#faq" mobile>FAQ</NavLink>

            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ href, children, mobile }) => (
  <a
    href={href}
    className={`${mobile ? 'block py-2' : ''} text-gray-700 hover:text-blue-600 font-medium transition duration-300`}
  >
    {children}
  </a>
);

export default Navigation;
