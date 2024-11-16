import React from 'react';
import { Scale, Shield, Building2, Book, Calculator, Users } from 'lucide-react';

const LLPracticeAreasPage = () => {
  const practiceAreas = [
    {
      title: "Criminal Law",
      icon: <Shield className="w-10 h-10 text-blue-400" />,
      description: "Expert criminal defense and representation across Kerala courts.",
      services: [
        "Criminal Defense",
        "Bail Applications",
        "Criminal Appeals",
        "POCSO Cases",
        "Anticipatory Bail",
        "White Collar Crimes"
      ],
      link: "/practice-areas/criminal-law"
    },
    {
      title: "Corporate Law",
      icon: <Building2 className="w-10 h-10 text-blue-400" />,
      description: "Comprehensive corporate legal services for businesses in Kerala.",
      services: [
        "Company Registration",
        "Mergers & Acquisitions",
        "Corporate Compliance",
        "Joint Ventures",
        "Business Restructuring",
        "Commercial Contracts"
      ],
      link: "/practice-areas/corporate-law"
    },
    {
      title: "Intellectual Property",
      icon: <Book className="w-10 h-10 text-blue-400" />,
      description: "Protection and management of intellectual property rights.",
      services: [
        "Trademark Registration",
        "Patent Filing",
        "Copyright Protection",
        "IP Litigation",
        "Technology Licensing",
        "Trade Secrets"
      ],
      link: "/practice-areas/intellectual-property"
    },
    {
      title: "Litigation",
      icon: <Scale className="w-10 h-10 text-blue-400" />,
      description: "Expert litigation services across all Kerala courts.",
      services: [
        "Civil Litigation",
        "Commercial Disputes",
        "Constitutional Matters",
        "Arbitration",
        "Appeals & Revisions",
        "Writ Petitions"
      ],
      link: "/practice-areas/litigation"
    },
    {
      title: "Real Estate Law",
      icon: <Building2 className="w-10 h-10 text-blue-400" />,
      description: "Complete legal solutions for real estate matters in Kerala.",
      services: [
        "Property Documentation",
        "Title Verification",
        "Property Registration",
        "Real Estate Due Diligence",
        "Property Disputes",
        "Construction Agreements"
      ],
      link: "/practice-areas/real-estate-law"
    },
    {
      title: "Tax Law",
      icon: <Calculator className="w-10 h-10 text-blue-400" />,
      description: "Expert tax law services and compliance solutions.",
      services: [
        "Direct Tax Matters",
        "GST Compliance",
        "Tax Appeals",
        "Tax Planning",
        "International Taxation",
        "Tax Dispute Resolution"
      ],
      link: "/practice-areas/tax-law"
    },
    {
      title: "Family Law",
      icon: <Users className="w-10 h-10 text-blue-400" />,
      description: "Sensitive and professional handling of family legal matters.",
      services: [
        "Divorce Proceedings",
        "Child Custody",
        "Maintenance Cases",
        "Matrimonial Disputes",
        "Domestic Violence",
        "Family Settlements"
      ],
      link: "/practice-areas/family-law"
    }
  ];

  const highlights = [
    { number: "1000+", label: "Cases Successfully Handled" },
    { number: "25+", label: "Years Experience" },
    { number: "100+", label: "Corporate Clients" },
    { number: "15+", label: "Expert Attorneys" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Practice Areas
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive legal services across multiple practice areas, serving individuals 
            and businesses throughout Kerala with expertise and dedication.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {highlights.map((stat, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
              <div className="text-3xl font-bold text-green-400 mb-2">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Practice Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {practiceAreas.map((area, index) => (
            <a 
              href={area.link}
              key={index} 
              className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 hover:border-green-500/50 transition-all group"
            >
              <div className="mb-6">
                {area.icon}
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {area.title}
              </h2>
              <p className="text-gray-400 mb-6">
                {area.description}
              </p>
              <ul className="space-y-3">
                {area.services.map((service, idx) => (
                  <li key={idx} className="text-gray-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    {service}
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 flex items-center text-green-400 font-medium group-hover:text-green-300 transition-colors">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose Our Legal Services
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: "Expert Team",
                description: "Experienced attorneys with specialized expertise"
              },
              {
                icon: <Scale className="w-8 h-8 text-blue-400" />,
                title: "Local Experience",
                description: "Deep understanding of Kerala's legal landscape"
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-400" />,
                title: "Client Focus",
                description: "Personalized attention to every case"
              },
              {
                icon: <Building2 className="w-8 h-8 text-blue-400" />,
                title: "Proven Results",
                description: "Track record of successful outcomes"
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
            Need Legal Assistance?
          </h2>
          <p className="text-gray-400 mb-6">
            Contact our team to discuss your legal needs and how we can help.
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

export default LLPracticeAreasPage;