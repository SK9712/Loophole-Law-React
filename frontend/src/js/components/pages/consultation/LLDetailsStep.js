import React from 'react';
import { LLFormField } from './LLFormField';

export const LLDetailsStep = ({ formData, onFormChange }) => (
  <div className="max-w-2xl mx-auto bg-slate-800/50 border border-slate-700 rounded-lg p-6">
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LLFormField
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={onFormChange}
          placeholder="John Doe"
        />
        <LLFormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={onFormChange}
          placeholder="john@example.com"
        />
      </div>

      <LLFormField
        label="Phone"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={onFormChange}
        placeholder="(123) 456-7890"
      />

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Case Details
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={onFormChange}
          rows="4"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors resize-none"
          placeholder="Please provide details about your case..."
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isEmergency"
          checked={formData.isEmergency}
          onChange={(e) => onFormChange(e)}
          className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-400 focus:ring-blue-400"
        />
        <label className="text-sm text-slate-300">
          This is an emergency case
        </label>
      </div>
    </div>
  </div>
);