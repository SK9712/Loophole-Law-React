import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { LLAlert, LLAlertDescription } from './LLAlert';

export const LLReviewStep = ({ formData }) => (
  <div className="max-w-2xl mx-auto bg-slate-800/50 border border-slate-700 rounded-lg p-6">
    <h3 className="text-xl font-semibold text-white mb-6">
      Booking Summary
    </h3>
    
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-slate-400">Service</p>
          <p className="text-white font-medium">{formData.service}</p>
        </div>
        
        <div>
          <p className="text-sm text-slate-400">Date & Time</p>
          <p className="text-white font-medium">{formData.date}</p>
          <p className="text-white">{formData.time}</p>
        </div>
      </div>

      <div className="border-t border-slate-700 pt-4">
        <p className="text-sm text-slate-400 mb-2">Contact Information</p>
        <p className="text-white">{formData.name}</p>
        <p className="text-slate-300">{formData.email}</p>
        <p className="text-slate-300">{formData.phone}</p>
      </div>

      {formData.isEmergency && (
        <LLAlert className="bg-green-500/20 border-green-500/50">
          <CheckCircle2 className="h-4 w-4 text-green-400" />
          <LLAlertDescription className="text-green-400">
            Your appointment has been scheduled successfully! We'll send you a confirmation email shortly.
          </LLAlertDescription>
        </LLAlert>
      )}
    </div>
  </div>
);