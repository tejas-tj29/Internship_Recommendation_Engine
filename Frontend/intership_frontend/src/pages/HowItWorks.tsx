import React from 'react';
import { PublicNavbar } from '../components/layout/public/PublicNavbar';
import { PublicFooter } from '../components/layout/public/PublicFooter';
import { UserPlus, BrainCircuit, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      title: 'Step 1: Create Your Profile',
      description: 'Start by signing up and providing your basic information. Tell us about your education level, college, core skills, preferred sectors, and whether you are willing to relocate. The more accurate your profile, the better your matches will be.',
      icon: UserPlus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      imagePlaceholder: 'Profile Creation'
    },
    {
      title: 'Step 2: AI Understands Your Profile',
      description: 'Our proprietary recommendation engine securely analyzes your unique combination of skills, education, and preferences. It translates your academic and professional background into a standardized format that can be compared against thousands of opportunities.',
      icon: BrainCircuit,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      imagePlaceholder: 'AI Analysis'
    },
    {
      title: 'Step 3: Internship Matching',
      description: 'The system continuously scans all available internships under the PM Internship Scheme. It compares the core requirements of each role against your parsed profile to calculate a definitive compatibility score.',
      icon: Target,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      imagePlaceholder: 'Internship Matching'
    },
    {
      title: 'Step 4: Transparent Match Score',
      description: 'We don\'t just give you a number. We break down exactly why you matched with a role based on four key pillars: Skills Match, Education Match, Sector Match, and Location Match.',
      icon: Sparkles,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      imagePlaceholder: 'Match Score Breakdown'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <PublicNavbar />
      
      <main className="grow">
        
        {/* Header Section */}
        <section className="bg-blue-600 pt-20 pb-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">How Our AI Matchmaker Works</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              We take the guesswork out of your internship search. Here is exactly how our platform connects you with your dream product management role.
            </p>
          </div>
        </section>

        {/* Journey Steps */}
        <section className="py-24 bg-white relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="space-y-32">
              {steps.map((step, idx) => {
                const isEven = idx % 2 !== 0;
                return (
                  <div key={idx} className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
                    
                    {/* Text Content */}
                    <div className="w-full lg:w-1/2">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${step.bgColor} ${step.color}`}>
                        <step.icon size={32} />
                      </div>
                      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">{step.title}</h2>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Visual Mockup */}
                    <div className="w-full lg:w-1/2">
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 h-80 flex items-center justify-center shadow-inner relative overflow-hidden group">
                        {/* Abstract visual representations based on step */}
                        {idx === 0 && (
                          <div className="w-full max-w-sm space-y-4 opacity-70 group-hover:opacity-100 transition-opacity">
                            <div className="h-8 bg-white border border-gray-200 rounded w-1/3"></div>
                            <div className="h-10 bg-white border border-gray-200 rounded w-full"></div>
                            <div className="h-10 bg-white border border-gray-200 rounded w-full"></div>
                            <div className="flex gap-2">
                              <div className="h-8 bg-blue-100 rounded w-1/4"></div>
                              <div className="h-8 bg-blue-100 rounded w-1/3"></div>
                            </div>
                          </div>
                        )}
                        {idx === 1 && (
                          <div className="flex justify-center items-center h-full w-full opacity-70 group-hover:opacity-100 transition-opacity">
                            <BrainCircuit size={120} className="text-purple-300 animate-pulse" />
                          </div>
                        )}
                        {idx === 2 && (
                          <div className="w-full max-w-sm space-y-4 opacity-70 group-hover:opacity-100 transition-opacity">
                             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                               <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
                               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                 <CheckCircle2 className="text-green-600" size={20}/>
                               </div>
                             </div>
                             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center opacity-50">
                               <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                               <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                             </div>
                          </div>
                        )}
                        {idx === 3 && (
                          <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg border border-gray-100 opacity-90 group-hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-center mb-6">
                              <span className="font-bold text-gray-700">AI Match</span>
                              <span className="bg-blue-600 text-white font-black px-3 py-1 rounded">94%</span>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between text-xs mb-1"><span>Skills</span><span>96%</span></div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full w-[96%]"></div></div>
                              </div>
                              <div>
                                <div className="flex justify-between text-xs mb-1"><span>Education</span><span>92%</span></div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full w-[92%]"></div></div>
                              </div>
                              <div>
                                <div className="flex justify-between text-xs mb-1"><span>Sector</span><span>95%</span></div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full w-[95%]"></div></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Final Step: Discover & Apply */}
        <section className="py-24 bg-gray-900 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Step 5: Discover & Apply</h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Once you're matched, you have full control. View detailed recommendations, save internships for later, apply with a single click, and track all your applications from a unified dashboard.
            </p>
            <Link 
              to="/register"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
            >
              Start Your Journey Today
            </Link>
          </div>
        </section>

      </main>

      <PublicFooter />
    </div>
  );
}
