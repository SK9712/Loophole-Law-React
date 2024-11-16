import React from 'react';
import { Users, Award, BookOpen, Scale, Globe, Star, GraduationCap, Briefcase } from 'lucide-react';

const LLLegalStaffPage = () => {
  const teamCategories = [
    {
      title: "Associate Advocates",
      description: "Our dynamic team of associate advocates brings specialized expertise across various practice areas.",
      members: [
        {
          name: "Adv. Arun Kumar",
          position: "Senior Associate",
          image: "/api/placeholder/400/400",
          expertise: ["Corporate Law", "Banking Law"],
          education: "LL.B., Government Law College, Ernakulam",
          experience: "5+ years",
          languages: ["Malayalam", "English", "Hindi"]
        },
        {
          name: "Adv. Lakshmi Nair",
          position: "Associate",
          image: "/api/placeholder/400/400",
          expertise: ["Civil Law", "Family Law"],
          education: "LL.B., Kerala Law Academy",
          experience: "3+ years",
          languages: ["Malayalam", "English", "Tamil"]
        }
      ]
    },
    {
      title: "Legal Research Team",
      description: "Expert legal researchers supporting our practice with in-depth analysis and case preparation.",
      members: [
        {
          name: "Anjali Menon",
          position: "Senior Legal Researcher",
          image: "/api/placeholder/400/400",
          expertise: ["Constitutional Law", "Case Analysis"],
          education: "LL.M., NUALS, Kochi",
          experience: "4+ years",
          languages: ["Malayalam", "English"]
        },
        {
          name: "Rahul Krishnan",
          position: "Legal Researcher",
          image: "/api/placeholder/400/400",
          expertise: ["Corporate Research", "Legal Documentation"],
          education: "LL.B., Government Law College, Thrissur",
          experience: "2+ years",
          languages: ["Malayalam", "English"]
        }
      ]
    },
    {
      title: "Paralegals & Documentation",
      description: "Skilled professionals handling legal documentation and administrative support.",
      members: [
        {
          name: "Maya Thomas",
          position: "Senior Paralegal",
          image: "/api/placeholder/400/400",
          expertise: ["Legal Documentation", "Court Filings"],
          education: "B.Com LL.B., Kerala University",
          experience: "6+ years",
          languages: ["Malayalam", "English"]
        },
        {
          name: "Sanjay Pillai",
          position: "Documentation Specialist",
          image: "/api/placeholder/400/400",
          expertise: ["Property Documentation", "Contract Drafting"],
          education: "BBA LL.B., NUALS",
          experience: "3+ years",
          languages: ["Malayalam", "English", "Tamil"]
        }
      ]
    }
  ];

  const teamStats = [
    { number: "20+", label: "Legal Professionals" },
    { number: "50+", label: "Years Combined Experience" },
    { number: "5000+", label: "Cases Handled" },
    { number: "100%", label: "Client Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Legal Team
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Meet our dedicated team of legal professionals committed to providing exceptional 
            legal services across Kerala.
          </p>
        </div>

        {/* Team Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {teamStats.map((stat, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
              <div className="text-3xl font-bold text-green-400 mb-2">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team Categories */}
        {teamCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                {category.title}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>

            {/* Team Members Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {category.members.map((member, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-green-500/50 transition-colors"
                >
                  <div className="flex">
                    {/* Member Image */}
                    <div className="w-1/3">
                      <div className="aspect-square relative">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="w-2/3 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                      <p className="text-green-400 font-medium mb-4">{member.position}</p>
                      
                      {/* Details Grid */}
                      <div className="space-y-3">
                        {/* Expertise */}
                        <div className="flex items-start gap-2">
                          <Scale className="w-4 h-4 text-blue-400 mt-1" />
                          <div>
                            <div className="text-sm text-white mb-1">Expertise</div>
                            <div className="text-sm text-gray-400">{member.expertise.join(", ")}</div>
                          </div>
                        </div>

                        {/* Education */}
                        <div className="flex items-start gap-2">
                          <GraduationCap className="w-4 h-4 text-blue-400 mt-1" />
                          <div>
                            <div className="text-sm text-white mb-1">Education</div>
                            <div className="text-sm text-gray-400">{member.education}</div>
                          </div>
                        </div>

                        {/* Experience */}
                        <div className="flex items-start gap-2">
                          <Briefcase className="w-4 h-4 text-blue-400 mt-1" />
                          <div>
                            <div className="text-sm text-white mb-1">Experience</div>
                            <div className="text-sm text-gray-400">{member.experience}</div>
                          </div>
                        </div>

                        {/* Languages */}
                        <div className="flex items-start gap-2">
                          <Globe className="w-4 h-4 text-blue-400 mt-1" />
                          <div>
                            <div className="text-sm text-white mb-1">Languages</div>
                            <div className="text-sm text-gray-400">{member.languages.join(", ")}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Why Join Our Team */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Join Our Team
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <GraduationCap className="w-8 h-8 text-blue-400" />,
                title: "Professional Growth",
                description: "Continuous learning and development opportunities"
              },
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: "Collaborative Environment",
                description: "Work with experienced legal professionals"
              },
              {
                icon: <Scale className="w-8 h-8 text-blue-400" />,
                title: "Diverse Practice Areas",
                description: "Exposure to various legal domains"
              },
              {
                icon: <Star className="w-8 h-8 text-blue-400" />,
                title: "Career Advancement",
                description: "Clear growth path and mentorship"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Career CTA */}
        <div className="text-center bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Join Our Legal Team
          </h2>
          <p className="text-gray-400 mb-6">
            We're always looking for talented legal professionals to join our team.
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

export default LLLegalStaffPage;