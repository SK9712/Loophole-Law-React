import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Loader2 } from 'lucide-react';
import { LLValidationMessage } from './LLValidationMessage';
import { LLAlert, LLAlertDescription } from './LLAlert';

export const LLScheduleStep = ({ 
  formData, 
  onDateChange, 
  onTimeSelect, 
  showValidation 
}) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i < 20; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const fetchAvailableSlots = async (selectedDate) => {
    if (!selectedDate) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/available-slots?date=${selectedDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch available time slots');
      }

      const data = await response.json();
      setAvailableSlots(data.data);
    } catch (err) {
      setError('Unable to load available time slots. Please try again.');
      console.error('Error fetching slots:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch available slots when date changes
  useEffect(() => {
    if (formData.date) {
      fetchAvailableSlots(formData.date);
    }
  }, [formData.date]);

  const defaultTimeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Date Selection */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            Select Date
          </h3>
          <select
            value={formData.date}
            onChange={(e) => onDateChange(e.target.value)}
            className={`w-full px-4 py-2 bg-slate-900 border rounded-lg text-white 
              focus:outline-none focus:border-blue-400 transition-colors
              ${showValidation && !formData.date ? 'border-red-500' : 'border-slate-700'}`}
          >
            <option value="">Select a date</option>
            {getAvailableDates().map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </option>
            ))}
          </select>
          {showValidation && !formData.date && (
            <LLValidationMessage message="Please select a date" />
          )}
        </div>

        {/* Time Selection */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            Select Time
          </h3>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
            </div>
          ) : error ? (
            <LLAlert className="bg-red-500/10 border-red-500/20">
              <LLAlertDescription className="text-red-400">
                {error}
              </LLAlertDescription>
            </LLAlert>
          ) : !formData.date ? (
            <div className="text-center text-slate-400 py-4">
              Please select a date first
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2">
                {(availableSlots.length > 0 ? availableSlots : defaultTimeSlots).map((time) => {
                  const isAvailable = availableSlots.length === 0 || availableSlots.includes(time);
                  return (
                    <button
                      key={time}
                      onClick={() => isAvailable && onTimeSelect(time)}
                      disabled={!isAvailable}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${formData.time === time 
                          ? 'bg-blue-500 text-white' 
                          : isAvailable
                            ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-blue-400'
                            : 'bg-slate-900/50 text-slate-500 cursor-not-allowed'}`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
              {availableSlots.length === 0 && formData.date && !loading && (
                <div className="mt-4 text-center text-yellow-400 text-sm">
                  All time slots are available for this date
                </div>
              )}
            </>
          )}
          
          {showValidation && !formData.time && (
            <LLValidationMessage message="Please select a time slot" />
          )}
        </div>
      </div>
    </div>
  );
};