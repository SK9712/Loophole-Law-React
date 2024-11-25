import React from 'react';
import { Calendar, Clock } from 'lucide-react';

export const LLScheduleStep = ({ formData, onDateChange, onTimeSelect }) => (
  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-400" />
        Select Date
      </h3>
      <input
        type="date"
        value={formData.date}
        onChange={(e) => onDateChange(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
      />
    </div>

    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-400" />
        Select Time
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"].map((time) => (
          <button
            key={time}
            onClick={() => onTimeSelect(time)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-blue-400 transition-colors"
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  </div>
);