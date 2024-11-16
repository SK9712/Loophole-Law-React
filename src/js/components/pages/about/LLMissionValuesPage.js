import React from 'react';
import { Scale, Shield, Users, Target, Award, BookOpen, Heart, Globe } from 'lucide-react';

const LLMissionValuesPage = () => {
  const values = [
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: "Unwavering Integrity",
      description: "We uphold the highest ethical standards in legal practice, ensuring transparency and honesty in every client interaction.",
      points: [
        "Ethical legal practice",
        "Transparent communication",
        "Accountable decisions"
      ]
    },
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: "Client-Centric Approach",
      description: "Our clients' success is our priority. We provide personalized attention and tailored legal solutions to meet individual needs.",
      points: [
        "Personalized attention",
        "24/7 accessibility",
        "Clear communication"
      ]
    },
    {
      icon: <Target className="w-6 h-6 text-blue-400" />,
      title: "Excellence in Practice",
      description: "We strive for excellence in every legal matter, combining expertise with innovative solutions to achieve optimal outcomes.",
      points: [
        "Professional expertise",
        "Innovative solutions",
        "Result-oriented approach"
      ]
    },
    {
      icon: <Heart className="w-6 h-6 text-blue-400" />,
      title: "Community Commitment",
      description: "We believe in giving back to our community through pro bono work and active participation in social justice initiatives.",
      points: [
        "Pro bono services",
        "Community engagement",
        "Social responsibility"
      ]
    }
  ];

  const principles = [
    {
      number: "01",
      title: "Justice & Fairness",
      description: "Ensuring equal access to justice and fair representation for all our clients."
    },
    {
      number: "02",
      title: "Professional Excellence",
      description: "Maintaining the highest standards of legal practice through continuous learning and improvement."
    },
    {
      number: "03",
      title: "Client Empowerment",
      description: "Educating and empowering clients to make informed decisions about their legal matters."
    },
    {
      number: "04",
      title: "Innovative Solutions",
      description: "Finding creative and effective solutions to complex legal challenges."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Mission Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Mission & Values
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-400 mb-8">
              At LoopHole Law, we are committed to delivering excellence in legal services 
              while upholding the highest standards of professional ethics and integrity.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              To provide innovative legal solutions while ensuring justice and fairness for our clients. 
              We strive to make quality legal services accessible while maintaining the highest standards 
              of professional excellence and ethical practice.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:bg-slate-800/70 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {value.title}
                  </h3>
                </div>
                <p className="text-gray-300 mb-4">
                  {value.description}
                </p>
                <ul className="space-y-2">
                  {value.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Guiding Principles */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Guiding Principles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
              >
                <div className="text-4xl font-bold text-green-400 mb-4">
                  {principle.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {principle.title}
                </h3>
                <p className="text-gray-400">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Standards */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Our Professional Standards
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Legal Excellence</h3>
              <p className="text-gray-400">Continuous learning and development in legal practice</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Global Perspective</h3>
              <p className="text-gray-400">Understanding of international legal frameworks</p>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Recognized Expertise</h3>
              <p className="text-gray-400">Proven track record of legal success</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Experience Our Values in Action
          </h2>
          <p className="text-gray-400 mb-6">
            Let us show you how our commitment to these values translates into exceptional legal service.
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

export default LLMissionValuesPage;