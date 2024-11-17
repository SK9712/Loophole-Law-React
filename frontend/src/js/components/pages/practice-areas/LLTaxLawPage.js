import React from 'react';
import { Calculator, FileText, Shield, Book, Scale, AlertTriangle, Clock, Users } from 'lucide-react';

const LLTaxLawPage = () => {
  const services = [
    {
      icon: <Calculator className="w-6 h-6 text-blue-400" />,
      title: "Direct Tax Services",
      description: "Expert assistance in income tax, wealth tax, and capital gains matters.",
      services: [
        "Income Tax Returns Filing",
        "Tax Planning & Advisory",
        "Capital Gains Assessment",
        "Wealth Tax Compliance",
        "Personal Tax Optimization"
      ]
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-400" />,
      title: "GST Services",
      description: "Comprehensive GST compliance and advisory services.",
      services: [
        "GST Registration",
        "Monthly/Quarterly Returns",
        "GST Audit Support",
        "Input Tax Credit",
        "E-way Bill Compliance"
      ]
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: "Tax Dispute Resolution",
      description: "Professional representation in tax disputes and appeals.",
      services: [
        "Tax Notice Response",
        "Appeal Representation",
        "Assessment Proceedings",
        "Settlement Commission",
        "Dispute Resolution"
      ]
    },
    {
      icon: <Book className="w-6 h-6 text-blue-400" />,
      title: "International Taxation",
      description: "Expert guidance on international tax matters and compliance.",
      services: [
        "FEMA Compliance",
        "Double Taxation",
        "Transfer Pricing",
        "NRI Taxation",
        "Foreign Investment Tax"
      ]
    }
  ];

  const specializedServices = [
    {
      title: "Business Tax Services",
      description: "Comprehensive tax solutions for businesses in Kerala.",
      points: [
        "Corporate Tax Planning",
        "Business Restructuring",
        "Tax Due Diligence",
        "Merger & Acquisition Tax",
        "Startup Tax Benefits"
      ]
    },
    {
      title: "Professional Tax Services",
      description: "Specialized tax services for professionals and firms.",
      points: [
        "Professional Tax Registration",
        "Service Tax Matters",
        "Professional Income Tax",
        "Tax Return Filing",
        "Compliance Management"
      ]
    },
    {
      title: "Real Estate Tax",
      description: "Expert tax services for real estate transactions.",
      points: [
        "Property Tax Assessment",
        "Capital Gains Planning",
        "Real Estate GST",
        "TDS on Property",
        "Tax Saving Strategies"
      ]
    }
  ];

  const metrics = [
    { number: "5000+", label: "Tax Returns Filed" },
    { number: "1000+", label: "GST Registrations" },
    { number: "500+", label: "Disputes Resolved" },
    { number: "100+", label: "Corporate Clients" }
  ];

  const compliance = [
    {
      title: "Direct Tax Compliance",
      points: [
        "Income Tax Act",
        "TDS Compliance",
        "Advance Tax",
        "Tax Audit",
        "Annual Information Return"
      ]
    },
    {
      title: "Indirect Tax Compliance",
      points: [
        "GST Returns",
        "E-way Bills",
        "Input Tax Credit",
        "GST Audit",
        "Reconciliation"
      ]
    },
    {
      title: "International Compliance",
      points: [
        "FEMA Guidelines",
        "Transfer Pricing",
        "DTAA Compliance",
        "Foreign Remittance",
        "International Reporting"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tax Law Services in Kerala
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expert tax consultation, compliance, and dispute resolution services. 
            Making tax compliance simple and efficient for businesses and individuals.
          </p>
        </div>

        {/* Tax Alert Banner */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-16 text-center">
          <h2 className="text-xl font-bold text-white mb-4">
            Important Tax Deadline Alert
          </h2>
          <p className="text-gray-300 mb-4">
            Stay compliant with upcoming tax deadlines. Get expert assistance today.
          </p>
          <a 
            href="/contact"
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Schedule Tax Consultation
          </a>
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
            Our Tax Services
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

        {/* Specialized Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Industry-Specific Tax Solutions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {specializedServices.map((service, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.points.map((point, idx) => (
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

        {/* Compliance Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Tax Compliance Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {compliance.map((item, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                <ul className="space-y-2">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
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
            Why Choose Our Tax Services
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: "Expert Team",
                description: "Qualified tax professionals with years of experience"
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-400" />,
                title: "Compliance Focused",
                description: "100% compliance with tax regulations"
              },
              {
                icon: <Calculator className="w-8 h-8 text-blue-400" />,
                title: "Tax Optimization",
                description: "Maximize savings through legal tax planning"
              },
              {
                icon: <Clock className="w-8 h-8 text-blue-400" />,
                title: "Timely Service",
                description: "Meeting all tax deadlines efficiently"
              }
            ].map((feature, index) => (
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
            Need Tax Assistance?
          </h2>
          <p className="text-gray-400 mb-6">
            Contact our tax experts for consultation and compliance support.
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
              Quick Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLTaxLawPage;