import React from 'react';
import { PublicNavbar } from '../components/layout/public/PublicNavbar';
import { PublicFooter } from '../components/layout/public/PublicFooter';
import { Target, Search, Compass, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <PublicNavbar />
      
      <main className="grow">
        
        {/* Header */}
        <section className="bg-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">About AI-PM Interns</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are on a mission to bridge the gap between talented students and life-changing product management opportunities.
            </p>
          </div>
        </section>

        {/* The Problem & The Solution */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">The Problem: Too Many Opportunities, Too Little Direction</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  The PM Internship Scheme provides incredible opportunities for students, but navigating them can be overwhelming. Students often struggle to identify which roles actually align with their specific academic background and skill set.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Without personalized guidance, many talented candidates either apply to roles they aren't suited for or miss out entirely on opportunities where they would have thrived.
                </p>
              </div>
              <div className="bg-gray-100 rounded-3xl p-10 flex items-center justify-center h-80">
                <Search size={120} className="text-gray-300" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Purpose */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">How AI Changes the Game</h2>
              <p className="text-xl text-gray-400">
                AI-PM Interns serves as a smart layer between the student and the scheme, utilizing artificial intelligence to make discovery personalized and efficient.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-8 rounded-2xl">
                <Target size={32} className="text-blue-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">Precision Matching</h3>
                <p className="text-gray-400 leading-relaxed">Our system breaks down job descriptions and student profiles into data points, creating a mathematical match rather than relying on keyword searches.</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-2xl">
                <Lightbulb size={32} className="text-yellow-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">Skill Illumination</h3>
                <p className="text-gray-400 leading-relaxed">We help students understand which of their skills are most valuable by highlighting exactly why they matched with a specific role.</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-2xl">
                <Compass size={32} className="text-green-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">Guided Discovery</h3>
                <p className="text-gray-400 leading-relaxed">By filtering out the noise, students can focus their energy entirely on applying to the roles where they have the highest probability of success.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-16 bg-blue-50 border-t border-blue-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Important Notice</h3>
            <p className="text-gray-600 text-sm">
              AI-PM Interns is an independent platform built to assist students in discovering opportunities. We are not officially affiliated with, endorsed by, or representing the official PM Internship Scheme or the government. All final applications and selections are processed through the official portals.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Ready to find your match?</h2>
          <Link 
            to="/register"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
          >
            Create Your Free Profile
          </Link>
        </section>

      </main>

      <PublicFooter />
    </div>
  );
}
