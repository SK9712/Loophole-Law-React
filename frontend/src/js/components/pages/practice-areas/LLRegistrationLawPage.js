import React from 'react';
import { FileText, Building2, Search, ClipboardCheck, Scale, Shield, BookOpen, Clock, Users, AlertTriangle } from 'lucide-react';

const LLRegistrationLawPage = () => {
  const services = [
    {
      icon: <Building2 className="w-10 h-10 text-blue-400" />,
      title: "Property Registration",
      description: "Complete legal assistance for property registration in Kerala.",
      services: [
        "Sale Deed Registration",
        "Gift Deed Registration",
        "Partition Deed",
        "Release Deed",
        "Exchange Deed",
        "Settlement Deed"
      ]
    },
    {
      icon: <Search className="w-10 h-10 text-blue-400" />,
      title: "Document Verification",
      description: "Thorough verification and validation of registration documents.",
      services: [
        "Title Verification",
        "Property Search",
        "Encumbrance Check",
        "Legal Due Diligence",
        "Document Review",
        "Background Verification"
      ]
    },
    {
      icon: <FileText className="w-10 h-10 text-blue-400" />,
      title: "Legal Documentation",
      description: "Expert preparation of legal documents for registration.",
      services: [
        "Agreement Drafting",
        "Power of Attorney",
        "Will Registration",
        "Mortgage Deed",
        "Lease Agreement",
        "Partnership Deed"
      ]
    },
    {
      icon: <ClipboardCheck className="w-10 h-10 text-blue-400" />,
      title: "Registration Support",
      description: "End-to-end assistance in registration procedures.",
      services: [
        "Registration Process",
        "Stamp Duty Payment",
        "Government Liaison",
        "Documentation Support",
        "Registration Tracking",
        "Post Registration Services"
      ]
    }
  ];

  const expertiseAreas = [
    {
      title: "Property Registration",
      description: "Expert guidance in property registration process.",
      points: [
        "Residential Property",
        "Commercial Property",
        "Agricultural Land",
        "Industrial Property",
        "Joint Development",
        "Property Transfer"
      ]
    },
    {
      title: "Documentation Services",
      description: "Professional legal documentation services.",
      points: [
        "Legal Drafting",
        "Document Review",
        "Agreement Preparation",
        "Deed Registration",
        "Affidavit Making",
        "Contract Documentation"
      ]
    },
    {
      title: "Legal Compliance",
      description: "Ensuring compliance with registration laws.",
      points: [
        "Registration Act",
        "Stamp Act",
        "Transfer of Property Act",
        "Revenue Laws",
        "Municipal Laws",
        "Land Revenue Code"
      ]
    }
  ];

  const procedures = [
    {
      title: "Pre-Registration",
      steps: [
        "Document Verification",
        "Title Search",
        "Market Value Assessment",
        "Stamp Duty Calculation"
      ]
    },
    {
      title: "Registration Process",
      steps: [
        "Document Submission",
        "Fee Payment",
        "Biometric Verification",
        "Document Recording"
      ]
    },
    {
      title: "Post-Registration",
      steps: [
        "Document Collection",
        "Record Verification",
        "Mutation Process",
        "Tax Compliance"
      ]
    }
  ];

  const metrics = [
    { number: "5000+", label: "Registrations Completed" },
    { number: "98%", label: "Success Rate" },
    { number: "15+", label: "Years Experience" },
    { number: "3000+", label: "Happy Clients" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Registration Law Services in Kerala
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expert legal assistance for property registration, documentation, and 
            compliance with registration laws. Professional guidance through the 
            complete registration process.
          </p>
        </div>

        {/* Alert Banner */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-16 text-center">
          <AlertTriangle className="w-8 h-8 text-blue-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-4">
            Important Notice
          </h2>
          <p className="text-gray-300 mb-4">
            Always ensure proper legal verification before proceeding with any registration. 
            Consult our experts for a thorough assessment.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/contact"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
            >
              Get Expert Advice
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
            Registration Services
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

        {/* Registration Procedure */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Registration Procedure
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {procedures.map((procedure, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold text-white mb-6">{procedure.title}</h3>
                <ul className="space-y-3">
                  {procedure.steps.map((step, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center gap-2">
                      <ClipboardCheck className="w-4 h-4 text-green-400" />
                      {step}
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
            Why Choose Our Registration Services
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: "Expert Team",
                description: "Experienced registration law specialists"
              },
              {
                icon: <BookOpen className="w-8 h-8 text-blue-400" />,
                title: "Complete Support",
                description: "End-to-end registration assistance"
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-400" />,
                title: "Legal Protection",
                description: "Secure and compliant process"
              },
              {
                icon: <Clock className="w-8 h-8 text-blue-400" />,
                title: "Timely Service",
                description: "Efficient registration process"
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
            Need Registration Assistance?
          </h2>
          <p className="text-gray-400 mb-6">
            Contact our registration law experts for professional guidance and support.
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

export default LLRegistrationLawPage;