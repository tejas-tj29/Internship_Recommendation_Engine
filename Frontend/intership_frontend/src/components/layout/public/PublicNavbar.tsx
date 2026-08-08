import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-extrabold text-blue-600 tracking-tight">AI-PM Interns</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4 ml-6">
              <Link 
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-3 border border-gray-300 rounded-lg text-base font-bold text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg text-base font-bold hover:bg-blue-700 shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
