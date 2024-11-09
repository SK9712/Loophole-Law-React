import React, { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';

export default function LLawDialog() {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 300);
  };

  if (!open) return null;

  return (
    <div className={`
      fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm
      transition-opacity duration-300
      ${isClosing ? 'opacity-0' : 'opacity-100'}
    `}>
      <div className={`
        relative bg-slate-900 rounded-xl w-full max-w-xl overflow-hidden shadow-2xl
        transform transition-transform duration-300
        ${isClosing ? 'scale-95' : 'scale-100'}
      `}>
        {/* Header with Logo */}
        <div className="flex items-center gap-3 p-6 bg-black">
          <Scale className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-green-400">LoopholeLaw.</h2>
        </div>

        {/* User Acknowledgement Section */}
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-3">
            USER ACKNOWLEDGEMENT
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            The Bar Council of India does not permit solicitation of work and advertising by 
            legal practitioners and advocates. By accessing our website, the user acknowledges 
            that:
          </p>
        </div>

        {/* Disclaimer Section */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            DISCLAIMER
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            The user wishes to gain more information about us for his/her information and use. 
            He/She also acknowledges that there has been no attempt by us to advertise or 
            solicit work. Any information obtained or downloaded by the user from our website 
            does not lead to the creation of the client - attorney relationship between the 
            Firm and the user.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            None of the information contained in our website amounts to any form of legal 
            opinion or legal advice.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 p-6 bg-slate-900/50">
          <button
            onClick={handleClose}
            className="px-6 py-2 text-sm font-medium text-white bg-green-500 
                     hover:bg-green-600 rounded-lg transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                     focus:ring-offset-slate-900"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}