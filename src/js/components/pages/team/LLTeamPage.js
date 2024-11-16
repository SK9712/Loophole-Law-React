import React, { useState } from 'react';
import { Scale, Award, Book, Briefcase, Mail, Phone, Users, Building2, GraduationCap } from 'lucide-react';

const LLTeamPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const teamMembers = {
    partners: [
      {
        name: "Adv. Rajesh Kumar",
        position: "Managing Partner",
        image: "/api/placeholder/400/400",
        specialization: ["Corporate Law", "Mergers & Acquisitions"],
        experience: "20+ Years",
        education: [
          "LL.B., National Law School of India University",
          "B.Com (Hons), Kerala University"
        ],
        barCouncil: "Kerala Bar Council",
        courts: ["Supreme Court", "Kerala High Court"],
        languages: ["Malayalam", "English", "Hindi"],
        achievements: [
          "Best Corporate Lawyer - Kerala Law Awards 2023",
          "Former Chairman - Bar Council Committee",
          "Published Author - Corporate Law Journal"
        ]
      },
      {
        name: "Adv. Priya Menon",
        position: "Senior Partner",
        image: "/api/placeholder/400/400",
        specialization: ["Criminal Law", "Constitutional Law"],
        experience: "18+ Years",
        education: [
          "LL.M., Kerala Law Academy",
          "LL.B., Government Law College, Ernakulam"
        ],
        barCouncil: "Kerala Bar Council",
        courts: ["Supreme Court", "Kerala High Court"],
        languages: ["Malayalam", "English", "Tamil"],
        achievements: [
          "Distinguished Criminal Lawyer Award 2022",
          "Special Prosecutor - Kerala High Court",
          "Guest Faculty - National Law University"
        ]
      }
    ],
    attorneys: [
      {
        name: "Adv. Arun Nair",
        position: "Senior Associate",
        image: "/api/placeholder/400/400",
        specialization: ["Real Estate Law", "Civil Litigation"],
        experience: "8+ Years",
        education: ["LL.B., Government Law College, Thiruvananthapuram"],
        barCouncil: "Kerala Bar Council",
        languages: ["Malayalam", "English"],
        practiceAreas: [
          "Property Documentation",
          "Civil Cases",
          "Land Acquisition"
        ]
      },
      {
        name: "Adv. Meera Krishnan",
        position: "Associate",
        image: "/api/placeholder/400/400",
        specialization: ["Family Law", "Matrimonial Cases"],
        experience: "5+ Years",
        education: ["LL.B., Kerala Law Academy"],
        barCouncil: "Kerala Bar Council",
        languages: ["Malayalam", "English", "Tamil"],
        practiceAreas: [
          "Divorce Proceedings",
          "Child Custody",
          "Domestic Violence"
        ]
      }
    ],
    legalStaff: [
      {
        name: "Sreeja P",
        position: "Senior Legal Researcher",
        image: "/api/placeholder/400/400",
        specialization: ["Legal Research", "Documentation"],
        experience: "6+ Years",
        education: ["M.Phil in Law", "LL.M., NUALS Kochi"],
        expertise: [
          "Case Law Research",
          "Legal Documentation",
          "Academic Writing"
        ]
      },
      {
        name: "Arjun S",
        position: "Paralegal",
        image: "/api/placeholder/400/400",
        specialization: ["Court Procedures", "Documentation"],
        experience: "4+ Years",
        education: ["BBA LL.B., Kerala Law Academy"],
        expertise: [
          "Court Filings",
          "Document Preparation",
          "Client Coordination"
        ]
      }
    ]
  };

  const categories = [
    { id: 'all', label: 'All Team Members' },
    { id: 'partners', label: 'Partners' },
    { id: 'attorneys', label: 'Attorneys' },
    { id: 'legalStaff', label: 'Legal Staff' }
  ];

  const getAllMembers = () => {
    if (activeTab === 'all') {
      return [
        ...teamMembers.partners,
        ...teamMembers.attorneys,
        ...teamMembers.legalStaff
      ];
    }
    return teamMembers[activeTab] || [];
  };

  const renderMemberCard = (member) => (
    <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-green-500/50 transition-all">
      {/* Profile Image */}
      <div className="aspect-w-3 aspect-h-2">
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
        <p className="text-green-400 font-medium mb-4">{member.position}</p>

        {/* Specialization */}
        {member.specialization && (
          <div className="mb-4">
            <div className="flex gap-2 flex-wrap">
              {member.specialization.map((spec, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience & Education */}
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3">
            <Briefcase className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <p className="text-white font-medium">Experience</p>
              <p className="text-gray-400">{member.experience}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <p className="text-white font-medium">Education</p>
              <div className="text-gray-400">
                {member.education.map((edu, idx) => (
                  <p key={idx}>{edu}</p>
                ))}
              </div>
            </div>
          </div>

          {member.barCouncil && (
            <div className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="text-white font-medium">Bar Council</p>
                <p className="text-gray-400">{member.barCouncil}</p>
              </div>
            </div>
          )}
        </div>

        {/* Achievements or Expertise */}
        {member.achievements && (
          <div className="mb-4">
            <h4 className="text-white font-medium mb-2">Key Achievements</h4>
            <ul className="space-y-2">
              {member.achievements.map((achievement, idx) => (
                <li key={idx} className="text-gray-400 flex items-center gap-2">
                  <Award className="w-4 h-4 text-green-400" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact Buttons */}
        <div className="flex gap-3 mt-6">
          <a 
            href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@loopholelaw.com`}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-green-500 text-white rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a 
            href="/contact"
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-green-500 text-white rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
            Contact
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our Legal Team
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A team of experienced legal professionals dedicated to providing exceptional 
            legal services across Kerala. Our expertise spans multiple practice areas 
            with a proven track record of success.
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

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {getAllMembers().map((member, index) => (
            <div key={index}>
              {renderMemberCard(member)}
            </div>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <div className="text-center bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Join Our Legal Team
          </h2>
          <p className="text-gray-400 mb-6">
            We're always looking for talented legal professionals to join our team.
            If you're passionate about law and excellence, we'd love to hear from you.
          </p>
          <a 
            href="/careers"
            className="inline-block px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
          >
            View Career Opportunities
          </a>
        </div>
      </div>
    </div>
  );
};

export default LLTeamPage;