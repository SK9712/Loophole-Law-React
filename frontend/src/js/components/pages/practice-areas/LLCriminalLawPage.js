import React from 'react';
import { Scale, Shield, FileText, Clock, Users, Building2, AlertTriangle } from 'lucide-react';

const   LLCriminalLawPage = () => {
  const services = [
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: "Criminal Defense",
      description: "Expert legal defense across all stages of criminal proceedings.",
      cases: [
        "IPC Offences",
        "Criminal Appeals",
        "Anticipatory Bail",
        "Regular Bail Matters"
      ]
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-400" />,
      title: "Documentation & Filing",
      description: "Comprehensive legal documentation and court filing services.",
      cases: [
        "FIR/Police Complaints",
        "Bail Applications",
        "Criminal Petitions",
        "Appeal Documents"
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-blue-400" />,
      title: "Preventive Services",
      description: "Proactive legal measures to protect your rights.",
      cases: [
        "Section 438 CrPC",
        "Section 482 CrPC",
        "Quashing Petitions",
        "Stay Applications"
      ]
    }
  ];

  const expertiseAreas = [
    {
      title: "IPC Offences",
      sections: [
        "Section 302 - Murder",
        "Section 307 - Attempt to Murder",
        "Section 354 - Assault",
        "Section 376 - Sexual Offences",
        "Section 420 - Cheating",
        "Section 498A - Domestic Violence"
      ]
    },
    {
      title: "Special Acts",
      sections: [
        "NDPS Act Cases",
        "POCSO Act Matters",
        "SC/ST Prevention of Atrocities Act",
        "Domestic Violence Act",
        "Kerala Police Act",
        "Cyber Crime Cases"
      ]
    }
  ];

  const courtRepresentation = [
    {
      court: "Kerala High Court",
      expertise: [
        "Criminal Appeals",
        "Revision Petitions",
        "Bail Applications",
        "Quashing Petitions"
      ]
    },
    {
      court: "Sessions Courts",
      expertise: [
        "Criminal Trials",
        "Bail Matters",
        "Evidence Proceedings",
        "Final Arguments"
      ]
    },
    {
      court: "Magistrate Courts",
      expertise: [
        "Initial Proceedings",
        "Remand Matters",
        "Summary Trials",
        "Judicial Custody"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Criminal Law Practice
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expert criminal defense representation across Kerala courts with a proven track record 
            of protecting clients' rights and securing favorable outcomes.
          </p>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-16 text-center">
          <h2 className="text-xl font-bold text-white mb-4">
            24/7 Criminal Defense Assistance
          </h2>
          <p className="text-gray-300 mb-4">
            Immediate legal support for arrests, police custody, and emergency situations
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href="tel:+919876543210"
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Emergency Helpline
            </a>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Criminal Law Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-green-500/50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.cases.map((item, idx) => (
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
          <div className="grid md:grid-cols-2 gap-8">
            {expertiseAreas.map((area, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
              >
                <h3 className="text-xl font-bold text-white mb-6">{area.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {area.sections.map((section, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-300">
                      <Scale className="w-4 h-4 text-green-400" />
                      <span>{section}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Court Representation */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Court Representation
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {courtRepresentation.map((court, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Building2 className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">{court.court}</h3>
                </div>
                <ul className="space-y-3">
                  {court.expertise.map((item, idx) => (
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

        {/* Why Choose Us */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Experienced Team</h3>
              <p className="text-gray-400">
                Dedicated criminal law experts with proven track record in Kerala courts
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">24/7 Support</h3>
              <p className="text-gray-400">
                Round-the-clock assistance for emergencies and arrests
              </p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Client Protection</h3>
              <p className="text-gray-400">
                Committed to protecting your rights and securing the best outcome
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need Legal Defense?
          </h2>
          <p className="text-gray-400 mb-6">
            Our criminal law experts are ready to protect your rights. Contact us for immediate assistance.
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
              Emergency Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLCriminalLawPage;