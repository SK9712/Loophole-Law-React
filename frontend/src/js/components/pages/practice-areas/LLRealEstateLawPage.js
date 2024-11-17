import React from 'react';
import { Building2, FileText, Shield, Search, Users, Clock, Scale, AlertTriangle } from 'lucide-react';

const LLRealEstateLawPage = () => {
  const services = [
    {
      icon: <Building2 className="w-6 h-6 text-blue-400" />,
      title: "Property Documentation",
      description: "Comprehensive legal documentation for real estate transactions in Kerala.",
      services: [
        "Sale Deed Preparation",
        "Gift Deed Documentation",
        "Partition Deed Drafting",
        "Release Deed Preparation",
        "Property Registration Support"
      ]
    },
    {
      icon: <Search className="w-6 h-6 text-blue-400" />,
      title: "Title Verification",
      description: "Thorough investigation of property ownership and legal status.",
      services: [
        "Title Search Reports",
        "Land Record Verification",
        "Encumbrance Certificate",
        "Legal Opinion on Title",
        "Previous Transaction Analysis"
      ]
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: "Property Dispute Resolution",
      description: "Expert legal assistance in resolving property disputes.",
      services: [
        "Boundary Disputes",
        "Tenant-Owner Conflicts",
        "Property Partition Cases",
        "Inheritance Disputes",
        "Possession Recovery"
      ]
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-400" />,
      title: "Real Estate Agreements",
      description: "Drafting and review of property-related agreements.",
      services: [
        "Sale Agreements",
        "Rental Agreements",
        "Development Agreements",
        "Joint Venture Contracts",
        "Construction Agreements"
      ]
    }
  ];

  const specializedServices = [
    {
      title: "Residential Property",
      description: "Legal services for home buyers and sellers in Kerala.",
      points: [
        "Apartment Purchase",
        "Villa Documentation",
        "Land Registration",
        "RERA Compliance",
        "Home Loan Legal Support"
      ]
    },
    {
      title: "Commercial Property",
      description: "Legal expertise for commercial real estate transactions.",
      points: [
        "Office Space Purchase",
        "Retail Property Leasing",
        "Industrial Land Acquisition",
        "Commercial Lease Agreements",
        "Property Due Diligence"
      ]
    },
    {
      title: "Agricultural Land",
      description: "Specialized legal services for agricultural properties.",
      points: [
        "Land Use Conversion",
        "Agricultural Land Transfer",
        "Kerala Land Reforms Act",
        "Farm Land Documentation",
        "Revenue Department Clearances"
      ]
    }
  ];

  const metrics = [
    { number: "1000+", label: "Properties Verified" },
    { number: "500+", label: "Agreements Drafted" },
    { number: "200+", label: "Disputes Resolved" },
    { number: "50+", label: "RERA Consultations" }
  ];

  const processSteps = [
    { icon: <Search />, title: "Title Search" },
    { icon: <FileText />, title: "Documentation" },
    { icon: <Scale />, title: "Legal Review" },
    { icon: <Shield />, title: "Due Diligence" },
    { icon: <Building2 />, title: "Registration" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Real Estate Legal Services in Kerala
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expert legal guidance for property transactions, documentation, and dispute resolution. 
            Protecting your real estate interests across Kerala.
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
            Our Real Estate Legal Services
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
            Property Type Expertise
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

        {/* Process Steps */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Property Transaction Process
          </h2>
          <div className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-full">
                    {React.cloneElement(step.icon, { className: "w-6 h-6 text-blue-400" })}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 left-[60%] w-[80%] h-[2px] bg-slate-700" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Secure Your Property Transaction
          </h2>
          <p className="text-gray-400 mb-6">
            Get expert legal assistance for your real estate matters in Kerala.
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

export default LLRealEstateLawPage;