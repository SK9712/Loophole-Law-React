import React from 'react';
import { 
  Building2, 
  Scale, 
  Shield,
  Home,
  Receipt,
  Globe,
  Users,
  ArrowRight,
  GraduationCap,
  LibraryIcon,
  FileText
} from 'lucide-react';

const LLServicesPage = () => {
  const practiceAreas = [
    {
      icon: <Building2 className="w-12 h-12 text-blue-400" />,
      title: "Corporate Law",
      description: "Comprehensive legal solutions for businesses of all sizes",
      services: [
        "Mergers & Acquisitions",
        "Corporate Governance",
        "Business Formation",
        "Contract Negotiation",
        "Regulatory Compliance",
        "Corporate Restructuring"
      ]
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-400" />,
      title: "Civil Litigation",
      description: "Strategic advocacy in complex legal disputes",
      services: [
        "Commercial Disputes",
        "Contract Litigation",
        "Class Action Defense",
        "Alternative Dispute Resolution",
        "Appeals",
        "Injunctive Relief"
      ]
    },
    {
      icon: <Globe className="w-12 h-12 text-blue-400" />,
      title: "Intellectual Property",
      description: "Protecting and monetizing your innovative assets",
      services: [
        "Patent Litigation",
        "Trademark Registration",
        "Copyright Protection",
        "IP Portfolio Management",
        "Licensing Agreements",
        "Trade Secret Protection"
      ]
    },
    {
      icon: <Home className="w-12 h-12 text-blue-400" />,
      title: "Real Estate Law",
      description: "Expert guidance in property transactions and disputes",
      services: [
        "Commercial Real Estate",
        "Property Development",
        "Lease Agreements",
        "Land Use & Zoning",
        "Real Estate Litigation",
        "Title Disputes"
      ]
    },
    {
      icon: <Receipt className="w-12 h-12 text-blue-400" />,
      title: "Tax Law",
      description: "Strategic tax planning and dispute resolution",
      services: [
        "Tax Planning",
        "IRS Dispute Resolution",
        "International Tax",
        "State & Local Tax",
        "Tax Compliance",
        "Tax Appeals"
      ]
    },
    {
      icon: <Users className="w-12 h-12 text-blue-400" />,
      title: "Employment Law",
      description: "Protecting employer and employee rights",
      services: [
        "Employment Agreements",
        "Workplace Policies",
        "Discrimination Claims",
        "EEOC Compliance",
        "Labor Relations",
        "Wrongful Termination"
      ]
    }
  ];

  const industryExpertise = [
    "Technology & Software",
    "Healthcare & Life Sciences",
    "Financial Services",
    "Manufacturing & Industrial",
    "Real Estate & Construction",
    "Energy & Natural Resources"
  ];

  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center" aria-label="introduction">
        <div className="absolute inset-0 bg-blue-400/10" />
        <div className="relative z-10 text-center px-4">
          <Scale className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive Legal Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert legal representation across multiple practice areas, delivering 
            innovative solutions and exceptional results for our clients.
          </p>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-20 px-4" aria-label="practice-areas">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Our Practice Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-blue-400/50 transition-colors">
                <div className="p-8">
                  <div className="flex justify-center mb-6">
                    {area.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-center mb-4">{area.title}</h3>
                  <p className="text-gray-300 text-center mb-6">{area.description}</p>
                  
                  <div className="space-y-3">
                    {area.services.map((service, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span className="text-gray-300">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="py-20 px-4 bg-slate-900" aria-label="industries">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16">Industry Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryExpertise.map((industry, index) => (
              <div key={index} className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <GraduationCap className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Benefits */}
      <section className="py-20 px-4" aria-label="benefits">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">The LoopHoleLaw Advantage</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
              <FileText className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-4">Strategic Approach</h3>
              <p className="text-gray-300 text-center">
                Tailored legal strategies aligned with your business objectives and industry-specific needs.
              </p>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
              <LibraryIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-4">Deep Expertise</h3>
              <p className="text-gray-300 text-center">
                Experienced attorneys with specialized knowledge across multiple practice areas.
              </p>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-4">Client Focus</h3>
              <p className="text-gray-300 text-center">
                Dedicated support teams and responsive communication throughout your case.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-900" aria-label="contact">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Discuss Your Legal Needs</h2>
          <p className="text-gray-300 mb-8">
            Our experienced attorneys are ready to help you navigate your legal challenges. 
            Book a consultation to discuss your specific needs and explore how we can assist you.
          </p>
          <div className="flex justify-center">
            <a 
              href="/consultation" 
              className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </section>
    </article>
  );
};

export default LLServicesPage;