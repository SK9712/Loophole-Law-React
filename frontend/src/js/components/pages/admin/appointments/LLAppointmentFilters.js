import React from 'react';

export const LLAppointmentFilters = ({ filters, onFilterChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <select
      value={filters.status}
      onChange={(e) => onFilterChange('status', e.target.value)}
      className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-300"
    >
      <option value="">All Statuses</option>
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="cancelled">Cancelled</option>
    </select>

    <select
      value={filters.service}
      onChange={(e) => onFilterChange('service', e.target.value)}
      className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-300"
    >
      <option value="">All Services</option>
      <option value="Corporate Law">Corporate Law</option>
      <option value="Criminal Law">Criminal Law</option>
      <option value="Family Law">Family Law</option>
      <option value="Intellectual Property">Intellectual Property</option>
      <option value="Real Estate">Real Estate</option>
      <option value="Tax Law">Tax Law</option>
    </select>

    <input
      type="date"
      value={filters.date}
      onChange={(e) => onFilterChange('date', e.target.value)}
      className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-300"
    />
  </div>
);