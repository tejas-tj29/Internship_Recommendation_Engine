import React from 'react';
import { Link } from 'react-router-dom';
import { PublicNavbar } from '../components/layout/public/PublicNavbar';
import { PublicFooter } from '../components/layout/public/PublicFooter';
import { keyFeatures, howItWorksSteps, mockStats, faqs } from '../lib/data/landing';
import { Sparkles, ArrowRight, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <PublicNavbar />
      
      <main className="flex-grow">
        {/* 1. HERO SECTION */}
        <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-8 animate-fade-in-up">
                <Sparkles size={16} className="mr-2" />
                AI-Powered PM Internship Scheme Matcher
              </div>
              
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
                Don't search for internships. <br className="hidden md:block" />
                <span className="text-blue-600">Let the right ones find you.</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Our advanced AI engine analyzes your skills, education, and preferences to instantly match you with the perfect Product Management opportunities. Stop guessing and start applying to roles where you belong.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/register" 
                  className="w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                >
                  Find My Internship <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link 
                  to="/how-it-works" 
                  className="w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-xl text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center"
                >
                  See How It Works
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl -z-10"></div>
        </section>

        {/* 2. STATS SECTION */}
        <section className="py-12 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">Trusted by students applying for the PM Internship Scheme</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {mockStats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-black text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Your Path to the Perfect Internship</h2>
              <p className="text-lg text-gray-600">We've simplified the process of finding and applying for roles under the PM Internship Scheme. It only takes a few minutes.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorksSteps.map((step, idx) => (
                <div key={idx} className="relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl font-black">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  
                  {idx < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-gray-300">
                      <ChevronRight size={32} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. AI MATCH PREVIEW (Visual Showcase) */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              
              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Experience True AI Personalization</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Stop reading endless job descriptions wondering if you qualify. Our recommendation engine instantly dissects each role and gives you a transparent breakdown of exactly why you are a match.
                </p>
                <ul className="space-y-4">
                  {[
                    'Never miss an opportunity because you searched the wrong keyword',
                    'Understand your strengths and skill gaps for specific roles',
                    'Focus only on internships where you have a high probability of selection'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full lg:w-1/2 relative">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-50 transform rotate-3 rounded-3xl -z-10"></div>
                
                {/* Mock Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Product Management Intern</h3>
                      <p className="text-gray-500 font-medium">FinTech Innovations Ltd. • Remote</p>
                    </div>
                    <div className="bg-blue-600 text-white font-black text-xl px-4 py-2 rounded-xl shadow-md flex items-center">
                      <Zap size={20} className="mr-2 text-yellow-300 fill-current" /> 94%
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                    <p className="text-sm font-semibold text-blue-900 mb-4">Why you are a match:</p>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                          <span>Skills Match (Agile, User Research)</span>
                          <span>96%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-[96%]"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                          <span>Education Level</span>
                          <span>92%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-[92%]"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                          <span>Sector (Financial Technology)</span>
                          <span>95%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-[95%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold">Apply Now</button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. KEY FEATURES */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Everything You Need to Succeed</h2>
              <p className="text-lg text-gray-600">A complete toolset designed to help you discover, evaluate, and track your internship applications.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyFeatures.map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ SECTION */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">Got questions? We've got answers about how the AI works and how to use the platform.</p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-6 md:p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                    <span className="text-blue-600 mr-3">Q.</span> {faq.question}
                  </h3>
                  <p className="text-gray-600 pl-8 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to Find Your Perfect Match?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of students discovering their ideal opportunities through our AI recommendation engine today.
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-blue-600 bg-white hover:bg-gray-50 shadow-lg transition-all"
            >
              Get Started for Free <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </section>

      </main>

      <PublicFooter />
    </div>
  );
}
