import React from 'react';
import { Link } from 'react-router-dom';

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-extrabold text-white tracking-tight">AI-PM <span className="text-blue-500">Interns</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering students to find the perfect Product Management internship using advanced AI matching technology.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Get Started</h3>
            <ul className="space-y-3 text-sm text-gray-400 mb-6">
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
            </ul>
            <Link 
              to="/register" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors text-sm"
            >
              Find Internships
            </Link>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} AI-PM Interns. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Not officially affiliated with any government scheme.</p>
        </div>
      </div>
    </footer>
  );
}
