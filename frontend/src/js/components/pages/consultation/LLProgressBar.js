import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const LLProgressBar = ({ steps, currentStep }) => (
  <div className="max-w-4xl mx-auto mb-12 relative">
    <div className="absolute top-5 left-0 w-full h-1 bg-slate-700" />
    
    <div 
      className="absolute top-5 left-0 h-1 bg-blue-400 transition-all duration-500"
      style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
    />
    
    <div 
      className="absolute top-5 left-0 h-1 bg-green-400/50 transition-all duration-500"
      style={{ width: `${(Math.max(0, currentStep - 1) / (steps.length - 1)) * 100}%` }}
    />

    <div className="flex justify-between items-center">
      {steps.map((step, index) => (
        <div key={step} className="relative flex flex-col items-center">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center z-10 relative
            ${currentStep > index 
              ? 'bg-green-400 text-black' 
              : currentStep === index
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800 text-slate-400'}
            transition-colors duration-300
          `}>
            {currentStep > index ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
          </div>
          <span className={`
            mt-2 text-sm font-medium
            ${currentStep > index 
              ? 'text-green-400' 
              : currentStep === index
                ? 'text-blue-400'
                : 'text-slate-400'}
          `}>
            {step}
          </span>
        </div>
      ))}
    </div>
  </div>
);