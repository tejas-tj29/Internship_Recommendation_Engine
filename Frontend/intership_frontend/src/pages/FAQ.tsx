import React, { useState } from 'react';
import { PublicNavbar } from '../components/layout/public/PublicNavbar';
import { PublicFooter } from '../components/layout/public/PublicFooter';
import { faqs } from '../lib/data/landing';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <PublicNavbar />
      
      <main className="flex-grow">
        
        {/* Header */}
        <section className="bg-blue-600 py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Everything you need to know about the platform, the AI matching process, and how to manage your applications.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div 
                    key={index} 
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                    >
                      <span className="text-lg font-bold text-gray-900 pr-8">{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp size={24} className="text-blue-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown size={24} className="text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4 bg-gray-50/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center bg-white border-t border-gray-100">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-8">We're here to help you navigate your internship journey.</p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/contact"
              className="inline-block bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Contact Support
            </Link>
            <Link 
              to="/register"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </section>

      </main>

      <PublicFooter />
    </div>
  );
}
