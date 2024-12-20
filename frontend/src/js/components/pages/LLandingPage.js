import React from 'react';
import { Scale, BookOpen } from 'lucide-react';

const Button = ({ children, className, size = "md", variant = "primary", href }) => {
  const sizeClasses = {
    lg: "px-5 py-2.5 text-lg",
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
      <header className="relative h-[85vh] flex items-center justify-center text-white px-4">
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 text-center space-y-4 max-w-3xl">
          {/* Logo */}
          <div className="relative w-16 h-16 mx-auto mb-4">
            <BookOpen className="w-16 h-16 text-blue-400 absolute" />
            <Scale className="w-12 h-12 text-green-400 absolute bottom-0 right-0" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            LoopHoleLaw.
          </h1>
          <p className="text-lg md:text-xl text-slate-200">
            Navigating Legal Complexities with Precision and Innovation
          </p>
          <div className="flex gap-3 justify-center mt-6">
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
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Our Expertise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
                {
                    title: "Criminal Law",
                    description: "Expert defense and representation in criminal cases"
                },
                {
                    title: "Cyber Law",
                    description: "Protecting your digital rights and handling cybercrime cases"
                },
                {
                    title: "Civil Law",
                    description: "Resolving disputes and protecting your civil rights"
                }
            ].map((service, index) => (
              <Card key={index} className="bg-slate-800/50 border border-slate-700 hover:bg-slate-800/70 transition-all p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-300 text-sm">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-slate-900 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Why Choose LoopHoleLaw?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "20+ Years Experience",
              "Innovative Solutions",
              "Client-Focused Approach",
              "Industry Recognition"
            ].map((feature, index) => (
              <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-slate-700">
                <p className="text-base font-medium text-white">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-slate-800/50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-300 mb-6 text-sm">
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