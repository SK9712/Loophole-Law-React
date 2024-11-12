import React, { useState } from 'react';
import { Mail, Award, BookOpen, Scale } from 'lucide-react';

// Custom LinkedIn Icon as SVG
const LinkedInIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-5 h-5"
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const LLAttorneysPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const attorneys = [
    {
      id: 1,
      name: "Arjun Sharma",
      image: "/api/placeholder/400/400",
      position: "Senior Partner",
      category: "partner",
      expertise: ["Corporate Law", "Mergers & Acquisitions"],
      education: [
        "LL.B., National Law School of India University",
        "Master's in Corporate Law, Harvard Law School"
      ],
      barAdmissions: [
        "Bar Council of India",
        "Supreme Court of India"
      ],
      experience: "20+ years",
      awards: [
        "Recognized by Legal 500 India",
        "Best Corporate Lawyer Award 2023"
      ],
      bio: "Arjun brings over two decades of experience in corporate law and M&A. He has successfully handled complex transactions worth over $500 million and advised Fortune 500 companies.",
    },
    {
      id: 2,
      name: "Priya Mehta",
      image: "/api/placeholder/400/400",
      position: "Managing Partner",
      category: "partner",
      expertise: ["Intellectual Property", "Technology Law"],
      education: [
        "LL.B., ILS Law College",
        "LL.M. in IP Law, Stanford Law School"
      ],
      barAdmissions: [
        "Bar Council of Maharashtra and Goa",
        "Supreme Court of India"
      ],
      experience: "15+ years",
      awards: [
        "IP Lawyer of the Year 2022",
        "Women in Law Excellence Award"
      ],
      bio: "Priya specializes in intellectual property and technology law, with particular expertise in patent litigation and trademark protection."
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      image: "/api/placeholder/400/400",
      position: "Senior Associate",
      category: "associate",
      expertise: ["Criminal Law", "Constitutional Law"],
      education: [
        "LL.B., Faculty of Law, Delhi University",
        "Criminal Law Specialization, NLU Delhi"
      ],
      barAdmissions: [
        "Bar Council of Delhi",
        "High Court of Delhi"
      ],
      experience: "10+ years",
      awards: [
        "Rising Star of Law 2023",
        "Pro Bono Excellence Award"
      ],
      bio: "Rajesh is known for his expertise in criminal defense and constitutional law matters. He has successfully argued several landmark cases."
    }
  ];

  const categories = [
    { id: 'all', label: 'All Attorneys' },
    { id: 'partner', label: 'Partners' },
    { id: 'associate', label: 'Associates' }
  ];

  const filteredAttorneys = activeTab === 'all' 
    ? attorneys 
    : attorneys.filter(attorney => attorney.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Legal Team
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Meet our experienced attorneys who are dedicated to providing exceptional 
            legal services and protecting your interests.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-800/50 rounded-lg p-1">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  activeTab === category.id 
                    ? 'bg-green-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Attorneys Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAttorneys.map(attorney => (
            <div 
              key={attorney.id}
              className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 group hover:border-green-500/50 transition-colors"
            >
              {/* Attorney Image */}
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={attorney.image} 
                  alt={attorney.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{attorney.name}</h3>
                  <p className="text-green-400">{attorney.position}</p>
                </div>
              </div>

              {/* Attorney Details */}
              <div className="p-6 space-y-4">
                {/* Expertise */}
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-green-400" />
                    Areas of Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {attorney.expertise.map((area, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-slate-700 rounded-full text-sm text-gray-300"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-green-400" />
                    Education
                  </h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    {attorney.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>

                {/* Awards */}
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-400" />
                    Recognition
                  </h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    {attorney.awards.map((award, index) => (
                      <li key={index}>{award}</li>
                    ))}
                  </ul>
                </div>

                {/* Bio */}
                <p className="text-gray-300 text-sm">
                  {attorney.bio}
                </p>

                {/* Contact */}
                <div className="flex gap-4 pt-4">
                  <a 
                    href={`mailto:${attorney.name.toLowerCase().replace(' ', '.')}@loopholelaw.com`}
                    className="p-2 rounded-lg bg-slate-700 hover:bg-green-500 text-white transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a 
                    href="#"
                    className="p-2 rounded-lg bg-slate-700 hover:bg-green-500 text-white transition-colors"
                  >
                    <LinkedInIcon />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need Legal Assistance?
          </h2>
          <p className="text-gray-400 mb-6">
            Our team of experienced attorneys is ready to help you with your legal matters.
          </p>
          <a 
            href="/contact"
            className="inline-block px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
          >
            Schedule a Consultation
          </a>
        </div>
      </div>
    </div>
  );
};

export default LLAttorneysPage;