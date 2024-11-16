import React from 'react';
import { Shield, Lightbulb, FileText, Globe, Search, Award, Lock, Laptop } from 'lucide-react';

const LLIntellectualPropertyPage = () => {
  const services = [
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: "Trademark Registration",
      description: "Protect your brand identity in India and globally.",
      services: [
        "Trademark Search & Filing",
        "Opposition Proceedings",
        "Trademark Renewals",
        "International Registrations",
        "Brand Protection Strategy"
      ]
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-blue-400" />,
      title: "Patent Services",
      description: "Secure your innovations and technological advancements.",
      services: [
        "Patent Filing & Prosecution",
        "Prior Art Search",
        "Patent Drafting",
        "Technology Transfer",
        "Patent Portfolio Management"
      ]
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-400" />,
      title: "Copyright Protection",
      description: "Safeguard your creative works and digital content.",
      services: [
        "Copyright Registration",
        "Software Protection",
        "Content Licensing",
        "Infringement Actions",
        "Digital Rights Management"
      ]
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-400" />,
      title: "Trade Secrets",
      description: "Protect confidential business information and know-how.",
      services: [
        "NDA Drafting",
        "Trade Secret Audits",
        "Confidentiality Agreements",
        "Employee IP Policies",
        "Information Security Planning"
      ]
    }
  ];

  const industryFocus = [
    {
      title: "IT & Software",
      description: "Specialized IP protection for Kerala's thriving IT sector.",
      points: [
        "Software Patents",
        "Source Code Protection",
        "SaaS Agreements",
        "API Licensing",
        "IT Service Agreements"
      ]
    },
    {
      title: "Traditional Knowledge",
      description: "Protecting Kerala's rich heritage and traditional knowledge.",
      points: [
        "GI Registration",
        "Traditional Medicine Patents",
        "Cultural IP Protection",
        "Biodiversity Rights",
        "Heritage Documentation"
      ]
    },
    {
      title: "Startups & Innovation",
      description: "IP strategies for Kerala's startup ecosystem.",
      points: [
        "IP Portfolio Building",
        "Startup IP Strategy",
        "Innovation Protection",
        "Funding Due Diligence",
        "Technology Licensing"
      ]
    }
  ];

  const metrics = [
    { number: "1000+", label: "Trademarks Filed" },
    { number: "250+", label: "Patents Secured" },
    { number: "500+", label: "IP Disputes Resolved" },
    { number: "100+", label: "Tech Startups Served" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section - SEO Focused */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Intellectual Property Law Services in Kerala
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive IP protection for businesses, startups, and innovators. 
            Expert legal services in patents, trademarks, copyrights, and trade secrets.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
              <div className="text-3xl font-bold text-green-400 mb-2">{metric.number}</div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Main Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our IP Protection Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-green-500/50 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.services.map((item, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Focus */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Industry-Specific IP Solutions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {industryFocus.map((industry, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">{industry.title}</h3>
                <p className="text-gray-400 mb-6">{industry.description}</p>
                <ul className="space-y-2">
                  {industry.points.map((point, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our IP Protection Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Search className="w-8 h-8 text-blue-400" />,
                title: "IP Assessment",
                description: "Comprehensive evaluation of your intellectual property assets"
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-400" />,
                title: "Protection Strategy",
                description: "Customized IP protection planning and execution"
              },
              {
                icon: <FileText className="w-8 h-8 text-blue-400" />,
                title: "Documentation",
                description: "Thorough documentation and filing processes"
              },
              {
                icon: <Globe className="w-8 h-8 text-blue-400" />,
                title: "Monitoring",
                description: "Continuous monitoring and enforcement"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Focus */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Specialized Tech IP Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Laptop className="w-6 h-6 text-blue-400" />,
                title: "Software & IT",
                points: ["Source Code Protection", "Software Patents", "API Licensing"]
              },
              {
                icon: <Globe className="w-6 h-6 text-blue-400" />,
                title: "Digital Assets",
                points: ["Digital Copyright", "Domain Protection", "Online Content"]
              },
              {
                icon: <Shield className="w-6 h-6 text-blue-400" />,
                title: "Data Protection",
                points: ["Trade Secrets", "Database Rights", "Data Privacy"]
              }
            ].map((tech, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{tech.title}</h3>
                </div>
                <ul className="space-y-2">
                  {tech.points.map((point, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Protect Your Intellectual Property
          </h2>
          <p className="text-gray-400 mb-6">
            Schedule a consultation with our IP experts to secure your innovations and creative works.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/contact"
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
            >
              Get IP Protection
            </a>
            <a 
              href="tel:+919876543210"
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
            >
              Call for Quick Query
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLIntellectualPropertyPage;