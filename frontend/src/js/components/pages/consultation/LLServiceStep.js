import React from 'react';
import { Scale } from 'lucide-react';
import { LLValidationMessage } from './LLValidationMessage';

export const LLServiceStep = ({ services, onServiceSelect, showValidation }) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => onServiceSelect(service.name)}
          className="text-left rounded-lg bg-slate-800/50 border border-slate-700 p-6 hover:bg-slate-800/70 transition-all group"
        >
          <div className="flex items-center gap-3 mb-3">
            <Scale className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
              {service.name}
            </h3>
          </div>
          <p className="text-slate-300">
            {service.duration} minute consultation
          </p>
        </button>
      ))}
    </div>
    {showValidation && (
      <LLValidationMessage message="Please select a service to continue" />
    )}
  </div>
);