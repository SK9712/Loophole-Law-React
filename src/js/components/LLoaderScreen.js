import React, { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';

const LLoaderScreen = ({ isLoading = true }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900 to-black flex items-center justify-center z-50">
      <style>
        {`
          @keyframes logoScale {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(0.95); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          @keyframes balance {
            0% { transform: rotate(-10deg); }
            50% { transform: rotate(10deg); }
            100% { transform: rotate(-10deg); }
          }

          @keyframes dots {
            0%, 20% {
              content: ".";
            }
            40% {
              content: "..";
            }
            60%, 100% {
              content: "...";
            }
          }

          .animate-balance {
            animation: balance 3s ease-in-out infinite;
          }

          .loading-dots::after {
            content: "";
            animation: dots 1.5s infinite;
          }

          .logo-wrapper {
            animation: logoScale 2s ease-in-out infinite;
          }

          .pulse-text {
            animation: pulse 2s ease-in-out infinite;
          }

          @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }

          .loading-bar {
            animation: loading 2s ease-in-out infinite;
          }
        `}
      </style>

      <div className="text-center">
        {/* Logo and Scale Animation */}
        <div className="logo-wrapper mb-8">
          <div className="relative">
            <Scale className="w-20 h-20 text-blue-400 animate-balance mx-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-blue-400">Loop</span>
          <span className="text-green-400">hole</span>
          <span className="text-blue-400">Law</span>
        </h1>

        {/* Loading Text */}
        <div className="flex items-center justify-center gap-2">
          <p className="text-gray-400 text-lg loading-dots pulse-text">
            Loading
          </p>
        </div>

        {/* Loading Progress */}
        <div className="max-w-xs mx-auto mt-6">
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-green-400 loading-bar rounded-full">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLoaderScreen;