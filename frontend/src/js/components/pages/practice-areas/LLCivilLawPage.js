import React from 'react';
import { Scale, FileText, Gavel, Users, Building2, Shield, Search, Clock } from 'lucide-react';

const LLCivilLawPage = () => {
  const services = [
    {
      icon: <Gavel className="w-10 h-10 text-blue-400" />,
      title: "Civil Litigation",
      description: "Comprehensive civil litigation services across Kerala courts.",
      services: [
        "Property Disputes",
        "Contract Disputes",
        "Commercial Litigation",
        "Consumer Disputes",
        "Recovery Proceedings",
        "Civil Appeals"
      ]
    },
    {
      icon: <Building2 className="w-10 h-10 text-blue-400" />,
      title: "Property Law",
      description: "Expert legal services for all property-related matters.",
      services: [
        "Property Documentation",
        "Title Verification",
        "Land Disputes",
        "Tenant Disputes",
        "Property Registration",
        "Real Estate Litigation"
      ]
    },
    {
      icon: <FileText className="w-10 h-10 text-blue-400" />,
      title: "Contract Law",
      description: "Professional contract drafting and dispute resolution.",
      services: [
        "Contract Drafting",
        "Agreement Review",
        "Breach of Contract",
        "Contract Disputes",
        "Negotiation Support",
        "Contract Enforcement"
      ]
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-400" />,
      title: "Consumer Protection",
      description: "Protecting consumer rights and interests.",
      services: [
        "Consumer Complaints",
        "Product Liability",
        "Service Deficiency",
        "Consumer Forum Cases",
        "Compensation Claims",
        "Appeals & Revisions"
      ]
    }
  ];

  const expertiseAreas = [
    {
      title: "Property Law Expertise",
      description: "Specialized legal services for property matters in Kerala.",
      points: [
        "Property Title Disputes",
        "Boundary Disputes",
        "Partition Suits",
        "Eviction Matters",
        "Property Documentation",
        "Real Estate Due Diligence"
      ]
    },
    {
      title: "Commercial Civil Law",
      description: "Expert handling of commercial civil disputes.",
      points: [
        "Business Contracts",
        "Partnership Disputes",
        "Commercial Leases",
        "Debt Recovery",
        "Trade Disputes",
        "Commercial Arbitration"
      ]
    },
    {
      title: "Civil Rights & Remedies",
      description: "Protection of civil rights and legal remedies.",
      points: [
        "Constitutional Rights",
        "Civil Rights Protection",
        "Injunctive Relief",
        "Declaratory Actions",
        "Specific Performance",
        "Damages Claims"
      ]
    }
  ];

  const courtExperience = [
    {
      court: "Kerala High Court",
      matters: [
        "Civil Appeals",
        "Writ Petitions",
        "Original Side Matters",
        "Review Petitions"
      ]
    },
    {
      court: "District Courts",
      matters: [
        "Original Suits",
        "Injunction Matters",
        "Recovery Suits",
        "Execution Proceedings"
      ]
    },
    {
      court: "Consumer Forums",
      matters: [
        "Consumer Disputes",
        "Service Matters",
        "Product Claims",
        "Compensation Cases"
      ]
    }
  ];

  const metrics = [
    { number: "2000+", label: "Cases Handled" },
    { number: "90%", label: "Success Rate" },
    { number: "25+", label: "Years Experience" },
    { number: "1500+", label: "Satisfied Clients" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Expert Civil Law Services in Kerala
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive civil litigation and legal services with a proven track record of 
            successful resolution in property, contract, and commercial disputes.
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
            Civil Law Services
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
                      <Scale className="w-4 h-4 text-green-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Court Experience */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Court Experience
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {courtExperience.map((court, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold text-white mb-6">{court.court}</h3>
                <ul className="space-y-3">
                  {court.matters.map((matter, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center gap-2">
                      <Gavel className="w-4 h-4 text-green-400" />
                      {matter}
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
            Why Choose Our Civil Law Services
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: "Expert Team",
                description: "Specialized civil law practitioners"
              },
              {
                icon: <Search className="w-8 h-8 text-blue-400" />,
                title: "Thorough Research",
                description: "Detailed case analysis and preparation"
              },
              {
                icon: <Scale className="w-8 h-8 text-blue-400" />,
                title: "Proven Success",
                description: "High success rate in civil matters"
              },
              {
                icon: <Clock className="w-8 h-8 text-blue-400" />,
                title: "Timely Resolution",
                description: "Efficient handling of cases"
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
            Need Legal Assistance with Civil Matters?
          </h2>
          <p className="text-gray-400 mb-6">
            Schedule a consultation with our civil law experts to discuss your case.
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

export default LLCivilLawPage;