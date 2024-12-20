import React from 'react';
import { Scale, FileText, Building2, Shield, DollarSign, LineChart, Users, AlertTriangle, Briefcase } from 'lucide-react';

const LLBankingLawPage = () => {
  const services = [
    {
      icon: <Building2 className="w-10 h-10 text-blue-400" />,
      title: "Banking Regulations",
      description: "Expert guidance on banking laws and regulatory compliance.",
      services: [
        "RBI Compliance Advisory",
        "Banking License Support",
        "Regulatory Audits",
        "Policy Implementation",
        "Compliance Training",
        "Risk Assessment"
      ]
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-400" />,
      title: "Banking Disputes",
      description: "Resolution of complex banking and financial disputes.",
      services: [
        "Loan Disputes",
        "Recovery Proceedings",
        "SARFAESI Matters",
        "DRT Proceedings",
        "Bank Fraud Cases",
        "Consumer Disputes"
      ]
    },
    {
      icon: <LineChart className="w-10 h-10 text-blue-400" />,
      title: "Financial Advisory",
      description: "Legal consultation on banking and financial matters.",
      services: [
        "Project Finance",
        "Debt Restructuring",
        "NPAs Resolution",
        "Banking Operations",
        "Financial Products",
        "Corporate Advisory"
      ]
    },
    {
      icon: <DollarSign className="w-10 h-10 text-blue-400" />,
      title: "Consumer Banking",
      description: "Protection of consumer rights in banking sector.",
      services: [
        "Account Disputes",
        "Credit Card Issues",
        "Electronic Banking",
        "Insurance Claims",
        "Investment Disputes",
        "Banking Fraud"
      ]
    }
  ];

  const expertiseAreas = [
    {
      title: "Banking Regulation",
      description: "Comprehensive legal services for banking compliance.",
      points: [
        "RBI Guidelines Compliance",
        "Banking Regulation Act",
        "FEMA Compliance",
        "Anti-Money Laundering",
        "KYC Requirements",
        "Regulatory Reporting"
      ]
    },
    {
      title: "Recovery & Enforcement",
      description: "Legal support for debt recovery and enforcement.",
      points: [
        "SARFAESI Act Proceedings",
        "DRT Litigation",
        "Asset Recovery",
        "Security Enforcement",
        "Settlement Negotiations",
        "Recovery Strategy"
      ]
    },
    {
      title: "Financial Services",
      description: "Legal expertise in financial services sector.",
      points: [
        "Investment Banking",
        "NBFCs Regulation",
        "Payment Systems",
        "Fintech Compliance",
        "Digital Banking",
        "Cross-border Transactions"
      ]
    }
  ];

  const focusAreas = [
    {
      title: "Corporate Banking",
      areas: [
        "Project Finance",
        "Corporate Loans",
        "Syndicated Lending",
        "Trade Finance"
      ]
    },
    {
      title: "Retail Banking",
      areas: [
        "Consumer Protection",
        "Retail Products",
        "Digital Banking",
        "Payment Services"
      ]
    },
    {
      title: "Regulatory Compliance",
      areas: [
        "Policy Framework",
        "Risk Management",
        "Regulatory Reports",
        "Audit Support"
      ]
    }
  ];

  const metrics = [
    { number: "500+", label: "Banking Cases" },
    { number: "95%", label: "Success Rate" },
    { number: "20+", label: "Years Experience" },
    { number: "100+", label: "Bank Clients" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Banking & Financial Law Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expert legal solutions for banks, financial institutions, and consumers. 
            Specialized in banking regulations, disputes, and financial services law.
          </p>
        </div>

        {/* Emergency Support Banner */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-16 text-center">
          <AlertTriangle className="w-8 h-8 text-blue-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-4">
            Urgent Banking Legal Support
          </h2>
          <p className="text-gray-300 mb-4">
            Immediate assistance for urgent banking and financial matters.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="tel:+919876543210"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
            >
              Contact Now
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
            Banking Law Services
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

        {/* Focus Areas */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Banking Sector Focus
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {focusAreas.map((focus, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold text-white mb-6">{focus.title}</h3>
                <ul className="space-y-3">
                  {focus.areas.map((area, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-green-400" />
                      {area}
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
            Why Choose Our Banking Law Services
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: "Expert Team",
                description: "Specialized banking law practitioners"
              },
              {
                icon: <Building2 className="w-8 h-8 text-blue-400" />,
                title: "Industry Experience",
                description: "Deep banking sector knowledge"
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-400" />,
                title: "Regulatory Expertise",
                description: "Up-to-date compliance knowledge"
              },
              {
                icon: <Scale className="w-8 h-8 text-blue-400" />,
                title: "Proven Results",
                description: "High success rate in banking matters"
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
            Need Banking Legal Assistance?
          </h2>
          <p className="text-gray-400 mb-6">
            Contact our banking law experts for specialized legal support and consultation.
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

export default LLBankingLawPage;