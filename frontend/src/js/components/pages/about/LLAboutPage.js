import React from 'react';
import { Award, BookOpen, Scale, Users, Building2, Globe2 } from 'lucide-react';

const LLAboutPage = () => {
  const stats = [
    { id: 1, label: 'Years of Experience', value: '15+' },
    { id: 2, label: 'Successful Cases', value: '1000+' },
    { id: 3, label: 'Client Satisfaction', value: '98%' },
    { id: 4, label: 'Legal Professionals', value: '25+' },
  ];

  const values = [
    {
      icon: <Scale className="w-6 h-6 text-blue-400" />,
      title: 'Legal Excellence',
      description: 'We maintain the highest standards of legal practice, ensuring expert representation for every client.'
    },
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: 'Client-Focused Approach',
      description: 'Your success is our priority. We provide personalized attention and tailored legal solutions.'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-blue-400" />,
      title: 'Continuous Learning',
      description: 'Our team stays current with evolving legal landscapes to provide cutting-edge counsel.'
    },
    {
      icon: <Award className="w-6 h-6 text-blue-400" />,
      title: 'Proven Track Record',
      description: 'Our history of successful outcomes speaks to our commitment to excellence.'
    },
    {
      icon: <Building2 className="w-6 h-6 text-blue-400" />,
      title: 'Industry Expertise',
      description: 'Deep understanding of various business sectors enables us to provide contextual legal advice.'
    },
    {
      icon: <Globe2 className="w-6 h-6 text-blue-400" />,
      title: 'Global Perspective',
      description: 'International experience helping clients navigate complex cross-border challenges.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About LoopholeLaw
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Empowering clients with innovative legal solutions since 2009. We combine expertise, 
            technology, and dedication to deliver exceptional legal services.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mt-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              At LoopholeLaw, we're committed to providing innovative legal solutions while maintaining 
              the highest standards of professional excellence. Our mission is to empower clients with 
              expert legal counsel that drives their success and protects their interests.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-colors"
              >
                <div className="bg-blue-500/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Expert Legal Team</h2>
            <p className="text-gray-400 text-lg mb-12">
              Our team of experienced attorneys brings diverse expertise across multiple practice areas, 
              ensuring comprehensive legal support for all your needs. Each member is committed to 
              delivering excellence and achieving optimal outcomes for our clients.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Work Together?</h2>
            <p className="text-gray-400 mb-6">
              Contact us today to schedule a consultation with our expert legal team.
            </p>
            <a 
              href="/consultation" 
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLAboutPage;