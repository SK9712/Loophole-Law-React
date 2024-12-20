import React from 'react';
import { Scale, BookOpen } from 'lucide-react';

export const LLAppointmentHeader = () => (
  <div className="pt-24 pb-12 text-center">
    <div className="max-w-4xl mx-auto px-4">
      <div className="relative w-12 h-12 mx-auto mb-6">
        <BookOpen className="w-12 h-12 text-blue-400 absolute" />
        <Scale className="w-8 h-8 text-green-400 absolute bottom-0 right-0" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="text-blue-400">Book Your</span>{' '}
        <span className="text-green-400">Consultation</span>
      </h1>
      <p className="text-xl text-slate-400">
        Schedule a meeting with our expert legal team
      </p>
    </div>
  </div>
);