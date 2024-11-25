import React from 'react';
import { 
  Scale, 
  Building,
  Shield,
  BookOpen,
  Target,
  HeartHandshake,
  Clock
} from 'lucide-react';

const LLWhyUsPage = () => {
  // SEO-optimized content sections
  const expertise = [
    {
      icon: <Building className="w-12 h-12 text-green-400" />,
      title: "Corporate Law Excellence",
      description: "Specialized expertise in business law, mergers & acquisitions, and corporate compliance. Our attorneys have handled over 200+ successful corporate transactions.",
      area: "Corporate Law"
    },
    {
      icon: <Shield className="w-12 h-12 text-green-400" />,
      title: "Litigation Success",
      description: "Proven track record with a 95% success rate in civil litigation. Our trial attorneys bring decades of courtroom experience to every case.",
      area: "Civil Litigation"
    },
    {
      icon: <BookOpen className="w-12 h-12 text-green-400" />,
      title: "Regulatory Compliance",
      description: "Expert guidance in regulatory compliance and risk management. We help businesses navigate complex legal requirements while minimizing exposure.",
      area: "Regulatory Law"
    }
  ];

  const achievements = [
    { 
      value: "98%", 
      label: "Client Satisfaction Rate",
      description: "Based on client feedback and reviews from 2023" 
    },
    { 
      value: "500+", 
      label: "Cases Successfully Resolved",
      description: "Across multiple practice areas since 2010" 
    },
    { 
      value: "15+", 
      label: "Years of Legal Excellence",
      description: "Serving clients nationwide" 
    },
    { 
      value: "$50M+", 
      label: "Client Compensation Secured",
      description: "Through settlements and verdicts" 
    }
  ];

  const clientBenefits = [
    {
      icon: <Target className="w-12 h-12 text-green-400" />,
      title: "Strategic Legal Solutions",
      description: "Customized legal strategies aligned with your business goals. Our approach combines industry knowledge with practical solutions for optimal outcomes."
    },
    {
      icon: <HeartHandshake className="w-12 h-12 text-green-400" />,
      title: "Dedicated Client Service",
      description: "Personal attention from senior attorneys. Direct access to your legal team with 24/7 emergency support for urgent matters."
    },
    {
      icon: <Clock className="w-12 h-12 text-green-400" />,
      title: "Efficient Case Management",
      description: "Streamlined processes and advanced legal technology to handle your case efficiently. Regular updates and transparent communication throughout."
    }
  ];

  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      {/* Hero Section with Main Value Proposition */}
      <section className="relative h-[50vh] flex items-center justify-center" aria-label="hero">
        <div className="absolute inset-0 bg-green-400/10" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Scale className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Leading Legal Excellence in Corporate & Business Law
          </h1>
          <p className="text-xl text-gray-300">
            Trust your legal matters to a firm with proven results. 15+ years of excellence, 
            500+ successful cases, and a 98% client satisfaction rate.
          </p>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 px-4" aria-label="expertise">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Expert Legal Practice Areas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <div key={index} className="p-8 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="flex justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proven Track Record */}
      <section className="py-20 px-4 bg-slate-900" aria-label="achievements">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Proven Legal Excellence</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <div key={index} className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                  {item.value}
                </div>
                <div className="text-xl mb-2">{item.label}</div>
                <div className="text-sm text-gray-400">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Benefits */}
      <section className="py-20 px-4" aria-label="benefits">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Client-Focused Legal Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {clientBenefits.map((benefit, index) => (
              <div key={index} className="p-8 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="flex justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-slate-900" aria-label="contact">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Schedule Your Legal Consultation</h2>
          <p className="text-gray-300 mb-8">
            Experience the difference of working with a leading corporate law firm. 
            Our expert attorneys are ready to help you achieve your legal objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-block px-8 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors"
              rel="nofollow"
            >
              Free Case Evaluation
            </a>
            <a 
              href="/practice-areas" 
              className="inline-block px-8 py-3 border border-white hover:bg-white/10 rounded-lg font-medium transition-colors"
            >
              Explore Practice Areas
            </a>
          </div>
        </div>
      </section>
    </article>
  );
};

export default LLWhyUsPage;