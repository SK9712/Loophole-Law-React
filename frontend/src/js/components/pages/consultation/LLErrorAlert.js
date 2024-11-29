import React from 'react';
import { XCircle, X } from 'lucide-react';

const LLErrorAlert = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <div className="relative bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <XCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-400">
            Submission Error
          </h3>
          <div className="mt-1 text-sm text-red-400">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 inline-flex text-red-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg"
          >
            <span className="sr-only">Dismiss</span>
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LLErrorAlert;