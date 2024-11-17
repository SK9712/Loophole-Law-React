import React from 'react';
import { Users, Shield, FileText, Scale, Clock, Heart, Home, AlertTriangle } from 'lucide-react';

const LLFamilyLawPage = () => {
  const services = [
    {
      icon: <Users className="w-10 h-10 text-blue-400" />,
      title: "Divorce & Separation",
      description: "Compassionate legal support for divorce proceedings in Kerala.",
      services: [
        "Mutual Divorce",
        "Contested Divorce",
        "Judicial Separation",
        "Mediation Services",
        "Settlement Negotiations",
        "Post-Divorce Modifications"
      ]
    },
    {
      icon: <Heart className="w-10 h-10 text-blue-400" />,
      title: "Child Custody & Support",
      description: "Protecting the best interests of children in family matters.",
      services: [
        "Child Custody Rights",
        "Visitation Rights",
        "Child Support",
        "Guardian Rights",
        "Education Rights",
        "International Child Custody"
      ]
    },
    {
      icon: <Home className="w-10 h-10 text-blue-400" />,
      title: "Maintenance & Alimony",
      description: "Expert guidance on maintenance and alimony matters.",
      services: [
        "Spousal Support",
        "Interim Maintenance",
        "Permanent Alimony",
        "Maintenance Calculation",
        "Payment Enforcement",
        "Modification of Orders"
      ]
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-400" />,
      title: "Domestic Violence",
      description: "Protection and legal support for domestic violence cases.",
      services: [
        "Protection Orders",
        "Emergency Relief",
        "Legal Counseling",
        "Safety Planning",
        "Court Representation",
        "Victim Support"
      ]
    }
  ];

  const lawsAndRights = [
    {
      title: "Marriage Laws",
      description: "Key legal provisions under various personal laws.",
      points: [
        "Hindu Marriage Act",
        "Special Marriage Act",
        "Indian Christian Marriage Act",
        "Muslim Personal Law",
        "Marriage Registration"
      ]
    },
    {
      title: "Women's Rights",
      description: "Legal protections and rights for women in family matters.",
      points: [
        "Maintenance Rights",
        "Property Rights",
        "Protection from Violence",
        "Custody Rights",
        "Inheritance Rights"
      ]
    },
    {
      title: "Children's Rights",
      description: "Legal framework protecting children's interests.",
      points: [
        "Child Welfare Laws",
        "Education Rights",
        "Protection Laws",
        "Guardian Rights",
        "Adoption Laws"
      ]
    }
  ];

  const metrics = [
    { number: "1000+", label: "Families Helped" },
    { number: "95%", label: "Success Rate" },
    { number: "20+", label: "Years Experience" },
    { number: "500+", label: "Cases Resolved" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Family Law Services in Kerala
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Compassionate and professional legal support for all family matters. 
            Expert guidance through sensitive family law issues with dignity and care.
          </p>
        </div>

        {/* Emergency Support Banner */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-16 text-center">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-4">
            Need Immediate Legal Support?
          </h2>
          <p className="text-gray-300 mb-4">
            24/7 assistance available for domestic violence and emergency family matters.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="tel:+919876543210"
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Emergency Helpline
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
            Our Family Law Services
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

        {/* Laws and Rights Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Family Laws & Rights
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {lawsAndRights.map((section, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
              >
                <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                <p className="text-gray-400 mb-6">{section.description}</p>
                <ul className="space-y-2">
                  {section.points.map((point, idx) => (
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

        {/* Approach Section */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Approach to Family Law
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8 text-blue-400" />,
                title: "Compassionate Care",
                description: "Sensitive handling of emotional family matters"
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-400" />,
                title: "Legal Protection",
                description: "Safeguarding your rights and interests"
              },
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: "Family Focus",
                description: "Prioritizing family welfare and harmony"
              },
              {
                icon: <Scale className="w-8 h-8 text-blue-400" />,
                title: "Fair Resolution",
                description: "Balanced approach to dispute resolution"
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

        {/* Consultation CTA */}
        <div className="text-center bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Schedule a Confidential Consultation
          </h2>
          <p className="text-gray-400 mb-6">
            Let our experienced family law team help you navigate through your legal matters 
            with care and professionalism.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/contact"
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
            >
              Book Consultation
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

export default LLFamilyLawPage;