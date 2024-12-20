import React from 'react';
import { CheckCircle2, Calendar, Clock, User, Mail, Phone, AlertTriangle } from 'lucide-react';
import { LLAlert, LLAlertDescription } from './LLAlert';

export const LLReviewStep = ({ formData }) => (
  <div className="max-w-2xl mx-auto bg-slate-800/50 border border-slate-700 rounded-lg p-6">
    <h3 className="text-xl font-semibold text-white mb-6">
      Booking Summary
    </h3>
    
    <div className="space-y-6">
      {/* Service & Time Details */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className="text-sm text-slate-400">Service</p>
          <div className="flex items-center gap-2">
            <p className="text-white font-medium">{formData.service}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-slate-400">Date & Time</p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <p className="text-white font-medium">{formData.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <p className="text-white">{formData.time}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="border-t border-slate-700 pt-4">
        <p className="text-sm text-slate-400 mb-3">Contact Information</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <p className="text-white">{formData.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-400" />
            <p className="text-slate-300">{formData.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-400" />
            <p className="text-slate-300">{formData.phone}</p>
          </div>
        </div>
      </div>

      {/* Case Details */}
      <div className="border-t border-slate-700 pt-4">
        <p className="text-sm text-slate-400 mb-3">Case Details</p>
        <div className="bg-slate-900 rounded-lg p-4">
          <p className="text-slate-300">{formData.message}</p>
        </div>
      </div>

      {/* Emergency Alert */}
      {formData.isEmergency && (
        <LLAlert className="bg-red-500/20 border-red-500/20">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <LLAlertDescription className="text-red-400">
            This case has been marked as urgent and will receive priority attention.
          </LLAlertDescription>
        </LLAlert>
      )}

      {/* Confirmation Info */}
      <div className="border-t border-slate-700 pt-4">
        <LLAlert className="bg-blue-500/20 border-blue-500/20">
          <CheckCircle2 className="h-4 w-4 text-blue-400" />
          <LLAlertDescription className="text-blue-400">
            Please review your information carefully. Once submitted, you'll receive a confirmation email with additional details.
          </LLAlertDescription>
        </LLAlert>
      </div>
    </div>
  </div>
);