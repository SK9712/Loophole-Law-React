import React from 'react';
import { Scale, BookOpen } from 'lucide-react';

const LLoaderScreen = ({ isLoading = true }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900 to-black flex items-center justify-center z-50">
      <style>
        {`
          @keyframes line-scale {
            0% {
              transform: scaleY(0.4);
            }
            20% {
              transform: scaleY(1);
            }
            40% {
              transform: scaleY(0.4);
            }
            100% {
              transform: scaleY(0.4);
            }
          }

          @keyframes subtle-fade {
            0%, 100% {
              opacity: 0.8;
            }
            50% {
              opacity: 1;
            }
          }

          .loading-line {
            animation: line-scale 1s infinite ease-in-out;
          }

          .fade-pulse {
            animation: subtle-fade 2s infinite ease-in-out;
          }

          .line-1 { animation-delay: 0s; }
          .line-2 { animation-delay: 0.1s; }
          .line-3 { animation-delay: 0.2s; }
          .line-4 { animation-delay: 0.3s; }
          .line-5 { animation-delay: 0.4s; }
        `}
      </style>

      <div className="text-center space-y-6">
        {/* Logo Icon */}
        <div className="relative w-12 h-12 mx-auto fade-pulse">
          <BookOpen className="w-12 h-12 text-blue-400 absolute" />
          <Scale className="w-8 h-8 text-green-400 absolute bottom-0 right-0" />
        </div>

        {/* Animated Lines */}
        <div className="flex justify-center items-center gap-1 h-8">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`w-1 h-full bg-gradient-to-t from-blue-400 to-green-400 rounded-full loading-line line-${index + 1}`}
            ></div>
          ))}
        </div>

        {/* Brand Name */}
        <div className="fade-pulse flex flex-col leading-none">
          <span className="text-xl font-bold">
            <span className="text-blue-400">Loophole</span>
            <span className="text-green-400">Law</span>
            <span className="text-green-400">.</span>
          </span>
          <span className="text-xs text-gray-400 tracking-widest">LEGAL EXCELLENCE</span>
        </div>
      </div>
    </div>
  );
};

export default LLoaderScreen;