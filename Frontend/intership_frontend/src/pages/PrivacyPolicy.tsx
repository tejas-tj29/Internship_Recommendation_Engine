import React from 'react';
import { PublicNavbar } from '../components/layout/public/PublicNavbar';
import { PublicFooter } from '../components/layout/public/PublicFooter';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <PublicNavbar />
      
      <main className="flex-grow py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">Last Updated: August 8, 2026</p>

          <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
            <p>
              Welcome to AI-PM Interns. Your privacy is critically important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p>
              When you create an account and build your profile on AI-PM Interns, we collect the following types of information:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal Details:</strong> Name, email address, and optional phone number.</li>
              <li><strong>Academic & Professional Data:</strong> College/university name, education level, core skills, and preferred sectors.</li>
              <li><strong>Usage Data:</strong> Information on how you interact with our AI recommendations, saved internships, and application history.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use the data we collect to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Generate accurate, personalized AI match scores for PM Internship Scheme opportunities.</li>
              <li>Allow you to track your application statuses and saved roles.</li>
              <li>Improve our matching algorithms and overall platform performance.</li>
              <li>Send you critical account notifications and updates.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Data Security and Sharing</h2>
            <p>
              We implement robust security measures to protect your data. <strong>We do not sell your personal information to third parties.</strong> Your data is used exclusively to facilitate your internship search and application process.
            </p>
            <p>
              Please note that AI-PM Interns is an independent platform. When you proceed to apply for an internship, you may be redirected to official portals where their respective privacy policies will apply.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data at any time. You can manage your information directly from your Profile settings or by contacting our support team.
            </p>
          </div>

        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
