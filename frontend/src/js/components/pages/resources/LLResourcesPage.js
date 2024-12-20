import React from 'react';
import { BookOpen, HelpCircle, ArrowRight } from 'lucide-react';

const LLResourcesPage = () => {
  const resources = [
    {
      icon: BookOpen,
      title: "Legal Blog",
      description: "Stay informed with our latest articles, insights, and updates on various legal topics written by our expert attorneys.",
      features: [
        "Latest legal developments and analysis",
        "Industry insights and trends",
        "Expert opinions and case studies",
        "Practical legal tips and guidance"
      ],
      href: "/resources/blog",
      buttonText: "Read Our Blog"
    },
    {
      icon: HelpCircle,
      title: "Frequently Asked Questions",
      description: "Find answers to common legal questions across different practice areas. Our FAQ section provides clear, concise explanations of legal concepts.",
      features: [
        "Comprehensive legal explanations",
        "Practice area specific guidance",
        "Common legal scenarios covered",
        "Regular updates based on client questions"
      ],
      href: "/resources/faqs",
      buttonText: "View FAQs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Legal Resources
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Access valuable legal insights and information through our carefully curated resources, 
            designed to help you better understand your legal rights and obligations.
          </p>
        </div>

        {/* Resources Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div 
                key={index} 
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:bg-slate-800/70 transition-colors"
              >
                <div className="bg-blue-500/10 rounded-lg w-12 h-12 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">
                  {resource.title}
                </h2>
                
                <p className="text-gray-400 mb-6">
                  {resource.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {resource.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <ArrowRight className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={resource.href}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
                >
                  {resource.buttonText}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-6">
            Subscribe to our newsletter for the latest legal insights and updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-lg transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLResourcesPage;