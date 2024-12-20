import React from 'react';
import { LLFormField } from './LLFormField';
import { LLValidationMessage } from './LLValidationMessage';

export const LLDetailsStep = ({ formData, onFormChange, showValidation }) => {
  const getFieldValidationStatus = (fieldName) => {
    if (!showValidation) return false;
    
    switch (fieldName) {
      case 'name':
        return !formData.name.trim();
      case 'email':
        return !formData.email.trim() || !isValidEmail(formData.email);
      case 'phone':
        return !formData.phone.trim() || !isValidPhone(formData.phone);
      default:
        return false;
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^[\d\s()-]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const getFieldErrorMessage = (fieldName) => {
    if (!showValidation) return '';

    switch (fieldName) {
      case 'name':
        return !formData.name.trim() ? 'Name is required' : '';
      case 'email':
        return !formData.email.trim() 
          ? 'Email is required' 
          : !isValidEmail(formData.email) 
            ? 'Please enter a valid email address' 
            : '';
      case 'phone':
        return !formData.phone.trim() 
          ? 'Phone number is required' 
          : !isValidPhone(formData.phone) 
            ? 'Please enter a valid phone number' 
            : '';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <LLFormField
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={onFormChange}
              placeholder="John Doe"
              error={getFieldValidationStatus('name')}
            />
            {getFieldValidationStatus('name') && (
              <LLValidationMessage message={getFieldErrorMessage('name')} />
            )}
          </div>

          <div>
            <LLFormField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={onFormChange}
              placeholder="john@example.com"
              error={getFieldValidationStatus('email')}
            />
            {getFieldValidationStatus('email') && (
              <LLValidationMessage message={getFieldErrorMessage('email')} />
            )}
          </div>
        </div>

        <div>
          <LLFormField
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onFormChange}
            placeholder="(123) 456-7890"
            error={getFieldValidationStatus('phone')}
          />
          {getFieldValidationStatus('phone') && (
            <LLValidationMessage message={getFieldErrorMessage('phone')} />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Case Details
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={onFormChange}
            rows="4"
            className={`w-full px-4 py-2 bg-slate-900 border rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors resize-none
              ${showValidation && !formData.message.trim() ? 'border-red-500' : 'border-slate-700'}`}
            placeholder="Please provide details about your case..."
          />
          {showValidation && !formData.message.trim() && (
            <LLValidationMessage message="Please provide case details" />
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isEmergency"
            checked={formData.isEmergency}
            onChange={onFormChange}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-400 focus:ring-blue-400"
          />
          <label className="text-sm text-slate-300">
            This is an emergency case
          </label>
        </div>
      </div>
    </div>
  );
};
