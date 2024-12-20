// components/ui/Alert.js
import React from 'react';

export const LLAlert = ({ children, className = '', ...props }) => (
  <div
    role="alert"
    className={`rounded-lg border p-4 flex gap-3 items-start ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const LLAlertDescription = ({ children, className = '', ...props }) => (
  <div className={`text-sm ${className}`} {...props}>
    {children}
  </div>
);