import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const LLContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Get in Touch
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Have questions about your legal matters? We're here to help. 
          Reach out to us and our expert team will get back to you promptly.
        </p>
      </div>

      {/* Contact Information Cards */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Phone className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Call Us</h3>
                <p className="text-gray-400">Mon-Fri from 8am to 6pm</p>
              </div>
            </div>
            <a href="tel:+15551234567" className="text-green-400 hover:text-green-300 transition-colors">
              +1 (555) 123-4567
            </a>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Mail className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Email Us</h3>
                <p className="text-gray-400">We'll respond within 24h</p>
              </div>
            </div>
            <a href="mailto:contact@loopholelaw.com" className="text-green-400 hover:text-green-300 transition-colors">
              contact@loopholelaw.com
            </a>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Office Hours</h3>
                <p className="text-gray-400">Working Hours</p>
              </div>
            </div>
            <p className="text-green-400">
              Monday - Friday<br />
              9:00 AM - 6:00 PM
            </p>
          </div>
        </div>

        {/* Map and Form Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
                             text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                             focus:ring-green-400 focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
                             text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                             focus:ring-green-400 focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-green-400 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-green-400 focus:border-transparent"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-green-400 focus:border-transparent min-h-32"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 
                         rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                Send Message
                <Mail className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Map and Address */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <MapPin className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Our Location</h3>
                  <p className="text-gray-400">Visit our office</p>
                </div>
              </div>
              <p className="text-green-400">
                123 Legal Street<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>

            {/* Map iframe */}
            <div className="aspect-video rounded-xl overflow-hidden border border-slate-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645645245801!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLContactPage;