import React from 'react';
import { Scale } from 'lucide-react';

const Button = ({ children, className, size = "md", variant = "primary", href }) => {
  const sizeClasses = {
    lg: "px-6 py-3 text-lg",
    md: "px-4 py-2 text-base",
  };

  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    outline: "border-2 border-white text-white hover:bg-white/10",
  };

  const baseClasses = `inline-block rounded-md font-medium transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className || ''}`;

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClasses}>
      {children}
    </button>
  );
};

const Card = ({ children, className }) => (
  <div className={`rounded-lg ${className || ''}`}>
    {children}
  </div>
);

const LLandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center text-white px-4">
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 text-center space-y-6 max-w-4xl">
          <Scale className="mx-auto w-16 h-16 mb-8 text-blue-400" />
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            LoopHoleLaw.
          </h1>
          <p className="text-xl md:text-2xl text-slate-200">
            Navigating Legal Complexities with Precision and Innovation
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button size="lg" href="/consultation">
              Book Consultation
            </Button>
            <Button size="lg" variant="outline" href="/about">
              Learn More
            </Button>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Our Expertise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Corporate Law",
                description: "Strategic legal solutions for businesses of all sizes"
              },
              {
                title: "Intellectual Property",
                description: "Protecting your innovations and creative assets"
              },
              {
                title: "Contract Law",
                description: "Crafting and reviewing agreements that protect your interests"
              }
            ].map((service, index) => (
              <Card key={index} className="bg-slate-800/50 border border-slate-700 hover:bg-slate-800/70 transition-all p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-300">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-slate-900 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Why Choose LoopHoleLaw?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "20+ Years Experience",
              "Innovative Solutions",
              "Client-Focused Approach",
              "Industry Recognition"
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-slate-700">
                <p className="text-lg font-medium text-white">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-slate-300 mb-8">
            Schedule a consultation with our expert legal team today.
          </p>
          <Button size="lg" href="/contact">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LLandingPage;