import React from 'react';
import { PublicNavbar } from '../components/layout/public/PublicNavbar';
import { PublicFooter } from '../components/layout/public/PublicFooter';

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <PublicNavbar />
      
      <main className="flex-grow py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">Last Updated: August 8, 2026</p>

          <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
            <p>
              By accessing or using the AI-PM Interns platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Service Description</h2>
            <p>
              AI-PM Interns provides an AI-powered recommendation engine designed to help students discover and track opportunities under the PM Internship Scheme. We do not guarantee internship placement, interviews, or employment.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Platform Independence</h2>
            <p>
              <strong>Important:</strong> AI-PM Interns is an independent tool. We are not officially affiliated with, endorsed by, or operated by any government body administering the PM Internship Scheme. All internship data displayed is for informational purposes and should be verified on official portals.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. User Responsibilities</h2>
            <p>As a user of our platform, you agree to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide accurate and truthful information in your profile.</li>
              <li>Maintain the confidentiality of your account credentials.</li>
              <li>Use the platform solely for its intended purpose of finding internships.</li>
              <li>Not attempt to reverse-engineer our AI algorithms or scrape data from the site.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Limitation of Liability</h2>
            <p>
              AI-PM Interns and its creators shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the platform, including but not limited to missed deadlines, inaccurate AI matching, or technical outages.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Modifications to Service</h2>
            <p>
              We reserve the right to modify or discontinue the service at any time, with or without notice. We may also update these Terms of Service periodically; continued use of the platform constitutes acceptance of the revised terms.
            </p>
          </div>

        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
