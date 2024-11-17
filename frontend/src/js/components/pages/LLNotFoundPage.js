import React from 'react';
import { Scale, Home, Search, ArrowLeft, Phone } from 'lucide-react';

const LLNotFoundPage = () => {
  const quickLinks = [
    { title: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
    { title: "Practice Areas", href: "/practice-areas", icon: <Scale className="w-5 h-5" /> },
    { title: "Contact", href: "/contact", icon: <Phone className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo and 404 */}
        <div className="mb-8 inline-flex items-center gap-3">
          <Scale className="w-10 h-10 text-blue-400" />
          <span className="text-2xl font-bold text-green-400">LoopholeLaw.</span>
        </div>

        {/* Error Message */}
        <h1 className="text-7xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8 text-lg">
          The page you are looking for might have been moved, deleted, or never existed.
        </p>

        {/* Search Box */}
        <div className="mb-12">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search our website..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-gray-300 hover:text-white transition-colors"
              >
                {link.icon}
                {link.title}
              </a>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="space-y-4">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          {/* Contact Support */}
          <div>
            <p className="text-gray-400 mt-8">
              Need assistance? 
              <a href="/contact" className="text-green-400 hover:text-green-300 ml-1">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLNotFoundPage;