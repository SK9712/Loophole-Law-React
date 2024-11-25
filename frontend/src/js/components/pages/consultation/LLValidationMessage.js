import React from 'react';
import { AlertCircle } from 'lucide-react';

export const LLValidationMessage = ({ message }) => (
  <div className="flex items-center gap-2 text-red-400 mt-2 text-sm">
    <AlertCircle className="w-4 h-4" />
    <span>{message}</span>
  </div>
);