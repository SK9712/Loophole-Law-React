import React from 'react';
import { Shield, Lock, Globe, FileText, AlertTriangle, Server, Laptop, Smartphone, Users, Scale, Clock } from 'lucide-react';

const LLCyberLawPage = () => {
  const services = [
    {
      icon: <Shield className="w-10 h-10 text-blue-400" />,
      title: "Cybercrime Defense",
      description: "Expert legal defense against cybercrimes and digital offenses.",
      services: [
        "Cybercrime Investigation",
        "Digital Evidence Handling",
        "Criminal Defense",
        "Case Documentation",
        "Legal Representation",
        "Appeals & Revision"
      ]
    },
    {
      icon: <Globe className="w-10 h-10 text-blue-400" />,
      title: "Digital Business Law",
      description: "Legal solutions for digital businesses and e-commerce.",
      services: [
        "E-commerce Compliance",
        "Digital Contracts",
        "Privacy Policies",
        "Terms of Service",
        "Digital Payments",
        "Platform Liability"
      ]
    },
    {
      icon: <Lock className="w-10 h-10 text-blue-400" />,
      title: "Data Protection",
      description: "Comprehensive data privacy and protection services.",
      services: [
        "GDPR Compliance",
        "Data Privacy Laws",
        "Security Compliance",
        "Data Breach Response",
        "Privacy Audits",
        "Policy Implementation"
      ]
    },
    {
      icon: <Server className="w-10 h-10 text-blue-400" />,
      title: "Digital Compliance",
      description: "Ensuring compliance with cyber laws and regulations.",
      services: [
        "IT Act Compliance",
        "Regulatory Filing",
        "Digital Guidelines",
        "Security Standards",
        "Audit Response",
        "Regular Updates"
      ]
    }
  ];

  const expertiseAreas = [
    {
      title: "Cybercrime Protection",
      description: "Comprehensive legal protection against cyber threats.",
      points: [
        "Financial Fraud",
        "Identity Theft",
        "Data Breaches",
        "Cyber Stalking",
        "Online Harassment",
        "Digital Evidence"
      ]
    },
    {
      title: "Digital Rights",
      description: "Protection of rights in the digital space.",
      points: [
        "Intellectual Property",
        "Digital Privacy",
        "Online Freedom",
        "Content Rights",
        "Domain Disputes",
        "Digital Assets"
      ]
    },
    {
      title: "Corporate Cyber Law",
      description: "Legal solutions for business cyber security.",
      points: [
        "Data Protection",
        "Employee Policies",
        "Security Standards",
        "Risk Management",
        "Breach Response",
        "Compliance Audits"
      ]
    }
  ];

  const cyberCrimes = [
    {
      category: "Financial Cybercrimes",
      types: [
        "Online Banking Fraud",
        "Credit Card Fraud",
        "Investment Scams",
        "Cryptocurrency Fraud"
      ]
    },
    {
      category: "Personal Cybercrimes",
      types: [
        "Identity Theft",
        "Cyberstalking",
        "Online Harassment",
        "Social Media Crimes"
      ]
    },
    {
      category: "Corporate Cybercrimes",
      types: [
        "Data Breaches",
        "Corporate Espionage",
        "Network Attacks",
        "Intellectual Property Theft"
      ]
    }
  ];

  const metrics = [
    { number: "500+", label: "Cybercrime Cases" },
    { number: "95%", label: "Success Rate" },
    { number: "10+", label: "Years Experience" },
    { number: "200+", label: "Corporate Clients" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Expert Cyber Law Services in Kerala
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive legal protection and solutions for digital security, cybercrime defense, 
            and compliance with cyber laws. Expert guidance in all aspects of digital legal matters.
          </p>
        </div>

        {/* Emergency Support Banner */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-16 text-center">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-4">
            Cybercrime Emergency Support
          </h2>
          <p className="text-gray-300 mb-4">
            Immediate legal assistance for cybercrime incidents and data breaches.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="tel:+919876543210"
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
            >
              Emergency Support
            </a>
          </div>
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
            Cyber Law Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-green-500/50 transition-all"
              >
                <div className="mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
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

        {/* Expertise Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Areas of Expertise
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
              >
                <h3 className="text-xl font-bold text-white mb-4">{area.title}</h3>
                <p className="text-gray-400 mb-6">{area.description}</p>
                <ul className="space-y-2">
                  {area.points.map((point, idx) => (
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

        {/* Types of Cybercrimes */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Cybercrime Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {cyberCrimes.map((category, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold text-white mb-6">{category.category}</h3>
                <ul className="space-y-3">
                  {category.types.map((type, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-green-400" />
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Why Choose Our Cyber Law Services
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Laptop className="w-8 h-8 text-blue-400" />,
                title: "Tech Expertise",
                description: "Deep understanding of digital technology"
              },
              {
                icon: <Scale className="w-8 h-8 text-blue-400" />,
                title: "Legal Excellence",
                description: "Expert cyber law practitioners"
              },
              {
                icon: <Clock className="w-8 h-8 text-blue-400" />,
                title: "Quick Response",
                description: "Rapid support for cyber incidents"
              },
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: "Client Focus",
                description: "Personalized legal solutions"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need Cyber Law Assistance?
          </h2>
          <p className="text-gray-400 mb-6">
            Contact our cyber law experts for professional guidance and support.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/contact"
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
            >
              Schedule Consultation
            </a>
            <a 
              href="tel:+919876543210"
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLCyberLawPage;