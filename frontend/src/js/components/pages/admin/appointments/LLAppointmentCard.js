import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, AlertTriangle, Trash2, X } from 'lucide-react';
import { LLAppointmentStatusBadge } from './LLAppointmentStatusBadge';

export const LLAppointmentCard = ({ appointment, onStatusChange, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDelete = () => {
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    onDelete(appointment._id);
    setShowDeleteAlert(false);
  };

  return (
    <div className="relative bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-800/70 transition-all">
      {/* Delete Confirmation Alert */}
      {showDeleteAlert && (
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm rounded-lg flex items-center justify-center p-6 z-10">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Delete Appointment</h4>
              <button
                onClick={() => setShowDeleteAlert(false)}
                className="text-slate-400 hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete this appointment? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteAlert(false)}
                className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Header with Status */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">{appointment.service}</h3>
            <LLAppointmentStatusBadge status={appointment.status} />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={appointment.status}
              onChange={(e) => onStatusChange(appointment._id, e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-300"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg transition-colors hover:bg-red-500/20 text-slate-400 hover:text-red-400"
              title="Delete appointment"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            {appointment.appointmentTime}
          </div>
        </div>

        {/* Client Info */}
        <div className="grid gap-2 text-slate-300">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            {appointment.clientName}
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-400" />
            {appointment.clientEmail}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-400" />
            {appointment.clientPhone}
          </div>
        </div>

        {/* Emergency Flag */}
        {appointment.isEmergency && (
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-4 h-4" />
            Emergency Case
          </div>
        )}

        {/* Case Details */}
        <div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          
          {showDetails && (
            <div className="mt-4 p-4 bg-slate-900 rounded-lg">
              <h4 className="text-sm font-medium text-white mb-2">Case Details</h4>
              <p className="text-slate-300 text-sm">{appointment.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};