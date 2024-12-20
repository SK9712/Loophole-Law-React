import React from 'react';
import { Scale, Award, Users, Landmark, BookOpen } from 'lucide-react';

const LLStoryPage = () => {
  const milestones = [
    {
      year: "2020",
      title: "Foundation in Kochi",
      description: "Established our first office in Kochi, focusing on providing innovative legal solutions for Kerala's growing business community.",
      icon: <Scale className="w-6 h-6 text-blue-400" />
    },
    {
      year: "2021",
      title: "High Court Practice",
      description: "Expanded our practice in the Kerala High Court, specializing in constitutional and corporate matters.",
      icon: <Landmark className="w-6 h-6 text-blue-400" />
    },
    {
      year: "2022",
      title: "Digital Integration",
      description: "Pioneered digital legal services in Kerala, making legal assistance more accessible to clients across the state.",
      icon: <BookOpen className="w-6 h-6 text-blue-400" />
    },
    {
      year: "2023",
      title: "Community Impact",
      description: "Established pro bono initiatives focusing on Kerala's local communities and environmental protection.",
      icon: <Users className="w-6 h-6 text-blue-400" />
    }
  ];

  const achievements = [
    {
      number: "500+",
      label: "Cases Handled",
      description: "Successfully resolved matters in Kerala courts"
    },
    {
      number: "100+",
      label: "Local Businesses",
      description: "Supporting Kerala's entrepreneurs"
    },
    {
      number: "25+",
      label: "Legal Experts",
      description: "Kerala's finest legal minds"
    },
    {
      number: "10+",
      label: "Pro Bono Cases",
      description: "Serving local communities"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Kerala's Innovative Legal Partner
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Building trust and delivering excellence in legal services across Kerala through 
            innovation and deep understanding of local legal landscape.
          </p>
        </div>

        {/* Founding Story */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              Our Kerala Roots
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Founded in 2020 in the heart of Kochi, LoopholeLaw emerged from a vision to 
              revolutionize legal services in Kerala. Our foundation was built on understanding 
              the unique legal challenges faced by Kerala's diverse community - from traditional 
              businesses to emerging startups, from local environmental concerns to modern corporate requirements.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Starting with a team of dedicated legal professionals who share deep roots in Kerala, 
              we combined local expertise with modern legal approaches. Our intimate understanding 
              of Kerala's legal landscape, cultural nuances, and business environment enables us 
              to provide contextually relevant and effective legal solutions.
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Growth in Kerala
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-green-500/50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  {milestone.icon}
                  <span className="text-green-400 font-bold">
                    {milestone.year}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {milestone.title}
                </h3>
                <p className="text-gray-400">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Local Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center"
              >
                <div className="text-4xl font-bold text-green-400 mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {achievement.label}
                </div>
                <p className="text-gray-400 text-sm">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Local Focus */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Our Kerala Advantage
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Local Expertise</h3>
              <p className="text-gray-400">
                Deep understanding of Kerala's legal and business landscape.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Community Focus</h3>
              <p className="text-gray-400">
                Committed to serving Kerala's diverse communities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Modern Approach</h3>
              <p className="text-gray-400">
                Blending traditional values with innovative legal solutions.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Connect With Us
          </h2>
          <p className="text-gray-400 mb-6">
            Experience legal excellence with a firm that understands Kerala's unique needs.
          </p>
          <a 
            href="/consultation"
            className="inline-block px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
          >
            Schedule a Consultation
          </a>
        </div>
      </div>
    </div>
  );
};

export default LLStoryPage;