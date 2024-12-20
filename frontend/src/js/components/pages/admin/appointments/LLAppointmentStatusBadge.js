import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export const LLAppointmentStatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      icon: AlertCircle,
      className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    },
    confirmed: {
      icon: CheckCircle2,
      className: 'bg-green-500/10 text-green-400 border-green-500/20'
    },
    cancelled: {
      icon: XCircle,
      className: 'bg-red-500/10 text-red-400 border-red-500/20'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border ${config.className}`}>
      <Icon className="w-4 h-4" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};