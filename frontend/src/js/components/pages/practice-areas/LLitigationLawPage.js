import React from 'react';
import { Scale, FileText, Shield, Users, Clock, Award, Building2, Globe } from 'lucide-react';

const LLitigationLawPage = () => {
  const services = [
    {
      icon: <Scale className="w-6 h-6 text-blue-400" />,
      title: "Civil Litigation",
      description: "Expert representation in civil matters across Kerala courts.",
      services: [
        "Property Disputes",
        "Contract Disputes",
        "Commercial Litigation",
        "Real Estate Litigation",
        "Recovery Proceedings"
      ]
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: "Corporate Litigation",
      description: "Specialized litigation services for business disputes.",
      services: [
        "Shareholder Disputes",
        "Director Conflicts",
        "Business Agreements",
        "Investment Disputes",
        "Corporate Fraud Cases"
      ]
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-400" />,
      title: "Constitutional Matters",
      description: "Representation in constitutional and fundamental rights cases.",
      services: [
        "Writ Petitions",
        "Public Interest Litigation",
        "Constitutional Rights",
        "Administrative Law",
        "Policy Challenges"
      ]
    },
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: "Alternative Dispute Resolution",
      description: "Efficient dispute resolution through mediation and arbitration.",
      services: [
        "Commercial Arbitration",
        "Mediation Services",
        "Negotiation Support",
        "Settlement Agreements",
        "International Arbitration"
      ]
    }
  ];

  const courtExpertise = [
    {
      court: "Kerala High Court",
      icon: <Building2 className="w-8 h-8 text-blue-400" />,
      expertise: [
        "Constitutional Matters",
        "Civil Appeals",
        "Criminal Appeals",
        "Writ Petitions",
        "Original Side Matters"
      ]
    },
    {
      court: "District Courts",
      icon: <Scale className="w-8 h-8 text-blue-400" />,
      expertise: [
        "Civil Suits",
        "Property Matters",
        "Family Disputes",
        "Commercial Cases",
        "Recovery Suits"
      ]
    },
    {
      court: "Tribunals & Forums",
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      expertise: [
        "Consumer Disputes",
        "Labor Tribunals",
        "Company Law Board",
        "Tax Tribunals",
        "Regulatory Appeals"
      ]
    }
  ];

  const successMetrics = [
    { number: "1000+", label: "Cases Handled" },
    { number: "90%", label: "Success Rate" },
    { number: "25+", label: "Years Experience" },
    { number: "100+", label: "Corporate Clients" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Expert Litigation Services in Kerala
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive litigation support across all Kerala courts. Specialized expertise in 
            civil, corporate, and constitutional matters with proven success record.
          </p>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-16 text-center">
          <h2 className="text-xl font-bold text-white mb-4">
            Urgent Legal Assistance
          </h2>
          <p className="text-gray-300 mb-4">
            Need immediate legal representation? Our litigation team is available 24/7.
          </p>
          <a 
            href="tel:+919876543210"
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Emergency Legal Support
          </a>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {successMetrics.map((metric, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
              <div className="text-3xl font-bold text-green-400 mb-2">{metric.number}</div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Main Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Litigation Services
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

        {/* Court Expertise */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Court-Specific Expertise
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {courtExpertise.map((court, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  {court.icon}
                  <h3 className="text-xl font-bold text-white">{court.court}</h3>
                </div>
                <ul className="space-y-3">
                  {court.expertise.map((item, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Litigation Process */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Litigation Approach
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8 text-blue-400" />,
                title: "Case Analysis",
                description: "Thorough evaluation of case merits and strategy development"
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-400" />,
                title: "Strategic Planning",
                description: "Customized litigation strategy and execution plan"
              },
              {
                icon: <Scale className="w-8 h-8 text-blue-400" />,
                title: "Court Representation",
                description: "Expert advocacy and court proceedings management"
              },
              {
                icon: <Award className="w-8 h-8 text-blue-400" />,
                title: "Case Resolution",
                description: "Efficient dispute resolution and favorable outcomes"
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

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose Our Litigation Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6 text-blue-400" />,
                title: "Expert Team",
                points: [
                  "Experienced Litigators",
                  "Specialized Knowledge",
                  "Proven Track Record"
                ]
              },
              {
                icon: <Globe className="w-6 h-6 text-blue-400" />,
                title: "Comprehensive Coverage",
                points: [
                  "All Kerala Courts",
                  "Multiple Practice Areas",
                  "Appeals & Reviews"
                ]
              },
              {
                icon: <Clock className="w-6 h-6 text-blue-400" />,
                title: "Client Support",
                points: [
                  "24/7 Availability",
                  "Regular Updates",
                  "Transparent Communication"
                ]
              }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>
                <ul className="space-y-2">
                  {feature.points.map((point, idx) => (
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
            Need Legal Representation?
          </h2>
          <p className="text-gray-400 mb-6">
            Contact our litigation experts for a consultation on your case.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/contact"
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
            >
              Discuss Your Case
            </a>
            <a 
              href="tel:+919876543210"
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
            >
              Emergency Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLitigationLawPage;