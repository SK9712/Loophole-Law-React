import React from 'react';

export const LLNavigationButtons = ({ 
  currentStep, 
  maxSteps, 
  onBack, 
  onContinue, 
  onSubmit,
  isSubmitting 
}) => (
  <div className="flex justify-center gap-4 mt-8">
    {currentStep > 0 && (
      <button
        onClick={onBack}
        className="px-6 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800/70 transition-colors"
      >
        Back
      </button>
    )}
    
    {currentStep < maxSteps - 1 ? (
      <button
        onClick={onContinue}
        className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
      >
        Continue
      </button>
    ) : (
      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className={`
          px-6 py-2 rounded-lg font-medium transition-colors
          ${isSubmitting 
            ? 'bg-slate-600 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'}
        `}
      >
        {isSubmitting ? 'Processing...' : 'Confirm Booking'}
      </button>
    )}
  </div>
);