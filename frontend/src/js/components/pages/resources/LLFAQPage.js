import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const LLFAQPage = () => {
  // FAQ Categories
  const faqCategories = [
    {
      id: 'general',
      title: 'General Legal Questions',
      questions: [
        {
          q: "What are the initial steps I should take when facing a legal issue?",
          a: "The first step is to document everything related to your case, including dates, communications, and relevant paperwork. Next, consult with a qualified legal professional to understand your rights and options. Avoid discussing your case with others or on social media, as this could potentially impact your legal position."
        },
        {
          q: "How do I know if I need a lawyer?",
          a: "You should consider hiring a lawyer if: you're dealing with complex legal matters, facing criminal charges, involved in a dispute with significant consequences, need to draft or review important legal documents, or when your rights, property, or finances are at risk. A free initial consultation can help determine if legal representation is necessary."
        },
        {
          q: "What should I prepare for my first legal consultation?",
          a: "Prepare by gathering: relevant documents (contracts, correspondence, police reports, etc.), a timeline of events, questions you want to ask, and a summary of your legal concerns. Being organized helps maximize the value of your consultation and allows for more accurate legal advice."
        }
      ]
    },
    {
      id: 'services',
      title: 'Our Legal Services',
      questions: [
        {
          q: "What areas of law does your firm specialize in?",
          a: "Our firm specializes in various practice areas including Corporate Law, Criminal Defense, Civil Litigation, Family Law, Intellectual Property, and Real Estate Law. Each department is led by experienced attorneys with extensive expertise in their respective fields."
        },
        {
          q: "How do your fee structures work?",
          a: "We offer flexible fee arrangements including hourly rates, fixed fees for specific services, and contingency fees for certain cases. During your initial consultation, we'll discuss the most appropriate fee structure based on your case type and circumstances. We believe in transparent pricing and will provide detailed fee agreements."
        }
      ]
    },
    {
      id: 'process',
      title: 'Legal Process',
      questions: [
        {
          q: "How long will my legal matter take to resolve?",
          a: "The duration varies depending on case complexity, court schedules, and whether settlement is possible. While some matters can be resolved in weeks, others may take months or years. We strive to handle cases efficiently while ensuring the best possible outcome. We'll provide timeline estimates based on similar cases and keep you informed of progress."
        },
        {
          q: "What is the typical process for handling a legal case?",
          a: "The process typically involves: initial consultation, case evaluation, gathering evidence, legal research, negotiation attempts, court filings if necessary, discovery phase, potential settlement discussions, and trial if required. We keep clients informed at each stage and discuss strategic options throughout the process."
        }
      ]
    },
    {
      id: 'rights',
      title: 'Legal Rights & Procedures',
      questions: [
        {
          q: "What are my rights when dealing with law enforcement?",
          a: "You have fundamental rights including: the right to remain silent, the right to legal representation, protection against unreasonable searches, and the right to fair treatment. It's important to remain calm, identify yourself if required, but remember you're not obligated to answer questions without your lawyer present."
        },
        {
          q: "How can I protect my legal rights in a business dispute?",
          a: "Document everything, maintain professional communication, review relevant contracts, gather evidence, and seek legal counsel early. Avoid making admissions or agreements without legal advice. Time-sensitive matters may require immediate action to preserve your rights."
        }
      ]
    }
  ];

  const [openItems, setOpenItems] = useState({});

  const toggleItem = (categoryId, index) => {
    setOpenItems(prev => ({
      ...prev,
      [`${categoryId}-${index}`]: !prev[`${categoryId}-${index}`]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* SEO Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Legal Questions
          </h1>
          <p className="text-xl text-gray-400">
            Expert answers to common legal questions to help you understand your rights and options
          </p>
        </div>

        {/* Search-Engine Optimized Introduction */}
        <div className="bg-slate-800/50 rounded-xl p-6 mb-12 border border-slate-700">
          <p className="text-gray-300 leading-relaxed">
            Welcome to LoopHole Law's comprehensive FAQ section. Our experienced legal team has compiled answers to the most common questions we receive from clients. Whether you're dealing with a corporate matter, criminal case, or civil dispute, find expert guidance below. For specific legal advice, please contact our office for a consultation.
          </p>
        </div>

        {/* FAQ Categories */}
        {faqCategories.map((category) => (
          <div key={category.id} className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              {category.title}
            </h2>
            
            <div className="space-y-4">
              {category.questions.map((item, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(category.id, index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-700/50 transition-colors"
                  >
                    <span className="text-lg font-medium text-white">
                      {item.q}
                    </span>
                    {openItems[`${category.id}-${index}`] ? 
                      <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    }
                  </button>
                  
                  {openItems[`${category.id}-${index}`] && (
                    <div className="px-6 py-4 border-t border-slate-700">
                      <p className="text-gray-300 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="bg-slate-800/50 rounded-xl p-8 text-center mt-16 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need Specific Legal Advice?
          </h3>
          <p className="text-gray-400 mb-6">
            Our experienced legal team is ready to help you with your specific case. Contact us for a confidential consultation.
          </p>
          <a 
            href="/contact"
            className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
          >
            Schedule a Consultation
          </a>
        </div>
      </div>
    </div>
  );
};

export default LLFAQPage;