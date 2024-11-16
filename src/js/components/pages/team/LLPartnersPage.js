import React from 'react';
import { Award, BookOpen, Scale, Globe, Star, Phone, Mail, MapPin } from 'lucide-react';

const LLPartnersPage = () => {
  const partners = [
    {
      id: 1,
      name: "Adv. Arjun Krishna",
      position: "Managing Partner",
      image: "/api/placeholder/400/400",
      expertise: ["Corporate Law", "Mergers & Acquisitions"],
      education: [
        "LL.B., National Law School of India University",
        "B.Com (Hons), St. Xavier's College, Kerala"
      ],
      experience: "15+ years",
      barEnrollment: "Kerala Bar Council (2008)",
      languages: ["Malayalam", "English", "Hindi", "Tamil"],
      courts: ["Supreme Court", "Kerala High Court", "District Courts"],
      achievements: [
        "Best Corporate Lawyer - Kerala Law Awards 2023",
        "Published Author - Corporate Law Journal",
        "Guest Faculty - National Law School, Bangalore"
      ],
      description: "With over 15 years of experience in corporate law and M&A, Adv. Arjun leads our corporate practice. He has successfully handled complex transactions worth over ₹500 crores and advised major corporations in Kerala."
    },
    {
      id: 2,
      name: "Adv. Priya Menon",
      position: "Senior Partner",
      image: "/api/placeholder/400/400",
      expertise: ["Real Estate Law", "Property Documentation"],
      education: [
        "LL.B., Government Law College, Ernakulam",
        "Masters in Property Law, Kerala University"
      ],
      experience: "12+ years",
      barEnrollment: "Kerala Bar Council (2011)",
      languages: ["Malayalam", "English", "Tamil"],
      courts: ["Kerala High Court", "District Courts"],
      achievements: [
        "Property Law Expert - Kerala Chamber of Commerce",
        "Contributor - Kerala Law Times",
        "Member - Real Estate Lawyers Association"
      ],
      description: "Adv. Priya specializes in real estate law and has extensive experience in handling complex property matters across Kerala. She is known for her expertise in land acquisition and documentation."
    },
    {
      id: 3,
      name: "Adv. Mohammed Rashid",
      position: "Partner",
      image: "/api/placeholder/400/400",
      expertise: ["Criminal Law", "Constitutional Law"],
      education: [
        "LL.B., Kerala Law Academy Law College",
        "Masters in Criminal Law, Cochin University"
      ],
      experience: "10+ years",
      barEnrollment: "Kerala Bar Council (2013)",
      languages: ["Malayalam", "English", "Arabic"],
      courts: ["Supreme Court", "Kerala High Court"],
      achievements: [
        "Distinguished Criminal Lawyer Award 2022",
        "Special Prosecutor - Kerala High Court",
        "Legal Aid Committee Member"
      ],
      description: "Adv. Rashid is renowned for his expertise in criminal law and constitutional matters. He has successfully handled numerous high-profile cases and is known for his strategic approach to complex legal challenges."
    }
  ];

  const firmStats = [
    { number: "35+", label: "Years Combined Experience" },
    { number: "1000+", label: "Cases Successfully Handled" },
    { number: "50+", label: "Corporate Clients" },
    { number: "15+", label: "Industry Awards" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Partners
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Meet our senior partners - Kerala's leading legal experts with decades of combined experience 
            in providing exceptional legal services.
          </p>
        </div>

        {/* Firm Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {firmStats.map((stat, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
              <div className="text-3xl font-bold text-green-400 mb-2">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="space-y-16">
          {partners.map((partner, index) => (
            <div 
              key={partner.id}
              className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700"
            >
              <div className="md:flex">
                {/* Partner Image */}
                <div className="md:w-1/3">
                  <div className="aspect-square relative">
                    <img 
                      src={partner.image} 
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Partner Details */}
                <div className="p-6 md:w-2/3">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">{partner.name}</h2>
                    <p className="text-green-400 font-semibold">{partner.position}</p>
                  </div>

                  <p className="text-gray-300 mb-6">
                    {partner.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Expertise */}
                    <div>
                      <h3 className="flex items-center gap-2 text-white font-semibold mb-3">
                        <Scale className="w-4 h-4 text-blue-400" />
                        Areas of Practice
                      </h3>
                      <ul className="space-y-2">
                        {partner.expertise.map((item, idx) => (
                          <li key={idx} className="text-gray-400">• {item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Education */}
                    <div>
                      <h3 className="flex items-center gap-2 text-white font-semibold mb-3">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        Education
                      </h3>
                      <ul className="space-y-2">
                        {partner.education.map((item, idx) => (
                          <li key={idx} className="text-gray-400">• {item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Courts */}
                    <div>
                      <h3 className="flex items-center gap-2 text-white font-semibold mb-3">
                        <Globe className="w-4 h-4 text-blue-400" />
                        Court Appearances
                      </h3>
                      <ul className="space-y-2">
                        {partner.courts.map((item, idx) => (
                          <li key={idx} className="text-gray-400">• {item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h3 className="flex items-center gap-2 text-white font-semibold mb-3">
                        <Award className="w-4 h-4 text-blue-400" />
                        Key Achievements
                      </h3>
                      <ul className="space-y-2">
                        {partner.achievements.map((item, idx) => (
                          <li key={idx} className="text-gray-400">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="mt-6 pt-6 border-t border-slate-700">
                    <div className="flex flex-wrap gap-4">
                      <a 
                        href={`mailto:${partner.name.toLowerCase().replace(' ', '.')}@loopholelaw.com`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-green-500 text-white rounded-lg transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </a>
                      <a 
                        href="/contact"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-green-500 text-white rounded-lg transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Schedule Meeting
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Work with Kerala's Leading Legal Experts
          </h2>
          <p className="text-gray-400 mb-6">
            Schedule a consultation with our partners to discuss your legal matters.
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

export default LLPartnersPage;