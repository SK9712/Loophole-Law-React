import React from 'react';
import { Scale, Building2, FileText, ShieldCheck, Briefcase, Users, Trophy, Globe } from 'lucide-react';

const LLCorporateLawPage = () => {
  const services = [
    {
      icon: <Building2 className="w-6 h-6 text-blue-400" />,
      title: "Business Formation & Registration",
      description: "Complete legal support for establishing your business in Kerala.",
      services: [
        "Private Limited Company Registration",
        "Limited Liability Partnership (LLP)",
        "One Person Company Formation",
        "Partnership Firm Registration",
        "Startup India Registration"
      ]
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-400" />,
      title: "Corporate Compliance",
      description: "Ensuring your business meets all legal requirements and regulations.",
      services: [
        "Annual Compliance Management",
        "ROC Filings",
        "Legal Audit Services",
        "Corporate Restructuring",
        "Regulatory Compliance"
      ]
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
      title: "Corporate Governance",
      description: "Establishing robust governance frameworks for sustainable growth.",
      services: [
        "Board Advisory Services",
        "Shareholder Agreements",
        "Corporate Policy Development",
        "Risk Management",
        "Statutory Compliance"
      ]
    },
    {
      icon: <Briefcase className="w-6 h-6 text-blue-400" />,
      title: "Commercial Contracts",
      description: "Comprehensive contract drafting and management services.",
      services: [
        "Service Agreements",
        "Employment Contracts",
        "Vendor Agreements",
        "Franchise Agreements",
        "Joint Venture Agreements"
      ]
    }
  ];

  const expertiseAreas = [
    {
      title: "Startups & MSMEs",
      description: "Specialized legal solutions for Kerala's growing startup ecosystem and MSMEs.",
      points: [
        "Company Incorporation",
        "Funding Documentation",
        "Compliance Management",
        "IP Protection",
        "Employee Agreements"
      ]
    },
    {
      title: "Corporate Restructuring",
      description: "Expert guidance for business transformations and reorganizations.",
      points: [
        "Mergers & Acquisitions",
        "Due Diligence",
        "Asset Transfer",
        "Share Purchase",
        "Business Valuation"
      ]
    },
    {
      title: "Foreign Investment",
      description: "Facilitating foreign investments in Kerala's business landscape.",
      points: [
        "FDI Compliance",
        "FEMA Regulations",
        "Joint Ventures",
        "Technology Transfer",
        "Cross-border Transactions"
      ]
    }
  ];

  const metrics = [
    { number: "500+", label: "Businesses Served" },
    { number: "100+", label: "Startup Registrations" },
    { number: "50+", label: "Corporate Restructurings" },
    { number: "1000+", label: "Contracts Drafted" }
  ];

  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "Expert Team",
      description: "Specialized corporate lawyers with extensive experience"
    },
    {
      icon: <Trophy className="w-8 h-8 text-blue-400" />,
      title: "Proven Track Record",
      description: "Successfully served hundreds of businesses in Kerala"
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      title: "Local & Global Expertise",
      description: "Understanding of both local and international business laws"
    },
    {
      icon: <Scale className="w-8 h-8 text-blue-400" />,
      title: "Comprehensive Solutions",
      description: "End-to-end legal support for your business"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Corporate Law Services in Kerala
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expert legal solutions for businesses in Kerala - from startups to established corporations. 
            Comprehensive corporate law services tailored to your business needs.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
              <div className="text-3xl font-bold text-green-400 mb-2">{metric.number}</div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Corporate Legal Services
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

        {/* Expertise Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Specialized Expertise
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">{area.title}</h3>
                <p className="text-gray-400 mb-6">{area.description}</p>
                <ul className="space-y-2">
                  {area.points.map((point, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-green-400" />
                      {point}
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
            Why Choose Our Corporate Legal Services
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Get Expert Corporate Legal Support
          </h2>
          <p className="text-gray-400 mb-6">
            Schedule a consultation with our corporate law experts to discuss your business needs.
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

export default LLCorporateLawPage;