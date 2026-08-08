import { BrainCircuit, Target, Briefcase, MapPin, CheckCircle, TrendingUp } from 'lucide-react';

export const howItWorksSteps = [
  {
    title: 'Create Your Profile',
    description: 'Sign up and securely provide your basic information, education level, and contact details.',
    icon: 'UserPlus'
  },
  {
    title: 'Tell Us Your Preferences',
    description: 'Select your core skills, preferred sectors, and whether you are willing to relocate for the right role.',
    icon: 'SlidersHorizontal'
  },
  {
    title: 'AI Analyzes Opportunities',
    description: 'Our AI engine scans hundreds of PM Internship Scheme opportunities to calculate precise compatibility scores.',
    icon: 'BrainCircuit'
  },
  {
    title: 'Discover Best Matches',
    description: 'Reviewd your personalized recommendations, see exactly why you matched, and apply with a single click.',
    icon: 'Sparkles'
  }
];

export const keyFeatures = [
  {
    title: 'AI-Powered Recommendations',
    description: 'Get matched with internships that actually fit your profile using our advanced machine learning algorithm.',
    icon: BrainCircuit,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Personalized Match Scores',
    description: 'See a clear 0-100% score for every internship so you know exactly how well you fit the requirements.',
    icon: Target,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Skill-Based Matching',
    description: 'We don\'t just look at degrees. Our system deeply analyzes your skills against the role responsibilities.',
    icon: TrendingUp,
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Sector Preferences',
    description: 'Filter opportunities specifically in technology, finance, healthcare, or any sector you prefer.',
    icon: Briefcase,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    title: 'Location Intelligence',
    description: 'Find roles in your city, remote opportunities, or positions that offer relocation support.',
    icon: MapPin,
    color: 'bg-red-100 text-red-600'
  },
  {
    title: 'Application Tracking',
    description: 'Save internships for later and track all your submitted applications in one unified dashboard.',
    icon: CheckCircle,
    color: 'bg-indigo-100 text-indigo-600'
  }
];

export const mockStats = [
  { value: '500+', label: 'Active Internships' },
  { value: '10,000+', label: 'Students Placed' },
  { value: '94%', label: 'Match Accuracy' },
  { value: '50+', label: 'Top Organizations' }
];

export const faqs = [
  {
    question: 'How does the AI recommendation work?',
    answer: 'Our AI analyzes multiple data points from your profile—including your skills, education, preferred sectors, and location flexibility—and maps them against the requirements of every available internship. It calculates a weighted percentage score to show you the most relevant opportunities first.'
  },
  {
    question: 'Is the platform free?',
    answer: 'Yes, this platform is completely free for all students applying under the PM Internship Scheme.'
  },
  {
    question: 'What information do I need to provide?',
    answer: 'You will need to provide your basic contact details, current education level, college/university name, top skills, preferred industry sectors, and your location/relocation preferences.'
  },
  {
    question: 'Can I apply to multiple internships?',
    answer: 'Absolutely. You can apply to as many internships as you like. However, we recommend focusing on the roles where you have a match score of 80% or higher for the best chances of selection.'
  },
  {
    question: 'Can I change my preferences later?',
    answer: 'Yes, you can edit your profile, update your skills, or change your sector preferences at any time. The AI will instantly recalculate and update your recommendations based on your new data.'
  }
];
