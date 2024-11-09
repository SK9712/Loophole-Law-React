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
      fixed inset-0 z-50 flex items-start md:items-center justify-center 
      p-4 sm:p-6 md:p-8 bg-black/70 backdrop-blur-sm overflow-y-auto
      transition-opacity duration-300 min-h-screen
      ${isClosing ? 'opacity-0' : 'opacity-100'}
    `}>
      <div className={`
        relative bg-slate-900 rounded-xl w-full max-w-xl overflow-hidden shadow-2xl
        transform transition-transform duration-300 my-8 md:my-0
        ${isClosing ? 'scale-95' : 'scale-100'}
      `}>
        {/* Header with Logo */}
        <div className="flex items-center gap-3 p-4 sm:p-6 bg-black">
          <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-green-400">LoopholeLaw.</h2>
        </div>

        {/* User Acknowledgement Section */}
        <div className="p-4 sm:p-6 border-b border-slate-800">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
            USER ACKNOWLEDGEMENT
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            The Bar Council of India does not permit solicitation of work and advertising by 
            legal practitioners and advocates. By accessing our website, the user acknowledges 
            that:
          </p>
        </div>

        {/* Disclaimer Section */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            DISCLAIMER
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              The user wishes to gain more information about us for his/her information and use. 
              He/She also acknowledges that there has been no attempt by us to advertise or 
              solicit work. Any information obtained or downloaded by the user from our website 
              does not lead to the creation of the client - attorney relationship between the 
              Firm and the user.
            </p>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              None of the information contained in our website amounts to any form of legal 
              opinion or legal advice.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 p-4 sm:p-6 bg-slate-900/50 border-t border-slate-800">
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium 
                     text-white bg-green-500 hover:bg-green-600 rounded-lg 
                     transition-colors duration-200 focus:outline-none focus:ring-2 
                     focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}