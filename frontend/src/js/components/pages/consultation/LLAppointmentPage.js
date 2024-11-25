import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, Scale } from 'lucide-react';
import { LLAlert, LLAlertDescription } from './LLAlert';

const LLAppointmentPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    isEmergency: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const steps = ['Service', 'Schedule', 'Details', 'Review'];
  const services = [
    { id: 'corporate', name: 'Corporate Law', duration: 90 },
    { id: 'criminal', name: 'Criminal Law', duration: 60 },
    { id: 'family', name: 'Family Law', duration: 60 },
    { id: 'ip', name: 'Intellectual Property', duration: 60 },
    { id: 'real-estate', name: 'Real Estate', duration: 60 },
    { id: 'tax', name: 'Tax Law', duration: 90 }
  ];

  const ProgressBar = () => (
    <div className="max-w-4xl mx-auto mb-12 relative">
      {/* Base track */}
      <div className="absolute top-5 left-0 w-full h-1 bg-slate-700" />
      
      {/* Blue progress - current */}
      <div 
        className="absolute top-5 left-0 h-1 bg-blue-400 transition-all duration-500"
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
      />
      
      {/* Green progress - completed */}
      <div 
        className="absolute top-5 left-0 h-1 bg-green-400/50 transition-all duration-500"
        style={{ width: `${(Math.max(0, currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      {/* Step indicators */}
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step} className="relative flex flex-col items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center z-10 relative
              ${currentStep > index 
                ? 'bg-green-400 text-black' 
                : currentStep === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400'}
              transition-colors duration-300
            `}>
              {currentStep > index ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
            </div>
            <span className={`
              mt-2 text-sm font-medium
              ${currentStep > index 
                ? 'text-green-400' 
                : currentStep === index
                  ? 'text-blue-400'
                  : 'text-slate-400'}
            `}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const ServiceStep = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => {
            setFormData(prev => ({ ...prev, service: service.name }));
            setCurrentStep(1);
          }}
          className="text-left rounded-lg bg-slate-800/50 border border-slate-700 p-6 hover:bg-slate-800/70 transition-all group"
        >
          <div className="flex items-center gap-3 mb-3">
            <Scale className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
              {service.name}
            </h3>
          </div>
          <p className="text-slate-300">
            {service.duration} minute consultation
          </p>
        </button>
      ))}
    </div>
  );

  const ScheduleStep = () => (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Select Date
        </h3>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
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
              onClick={() => {
                setFormData(prev => ({ ...prev, time }));
                setCurrentStep(2);
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-blue-400 transition-colors"
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const DetailsStep = () => (
    <div className="max-w-2xl mx-auto bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
            placeholder="(123) 456-7890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Case Details
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            rows="4"
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors resize-none"
            placeholder="Please provide details about your case..."
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isEmergency}
            onChange={(e) => setFormData(prev => ({ ...prev, isEmergency: e.target.checked }))}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-400 focus:ring-blue-400"
          />
          <label className="text-sm text-slate-300">
            This is an emergency case
          </label>
        </div>
      </div>
    </div>
  );

  const ReviewStep = () => (
    <div className="max-w-2xl mx-auto bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6">
        Booking Summary
      </h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-slate-400">Service</p>
            <p className="text-white font-medium">{formData.service}</p>
          </div>
          
          <div>
            <p className="text-sm text-slate-400">Date & Time</p>
            <p className="text-white font-medium">{formData.date}</p>
            <p className="text-white">{formData.time}</p>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-4">
          <p className="text-sm text-slate-400 mb-2">Contact Information</p>
          <p className="text-white">{formData.name}</p>
          <p className="text-slate-300">{formData.email}</p>
          <p className="text-slate-300">{formData.phone}</p>
        </div>

        {formData.isEmergency && (
        <LLAlert className="bg-green-500/20 border-green-500/50">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <LLAlertDescription className="text-green-400">
                Your appointment has been scheduled successfully! We'll send you a confirmation email shortly.
            </LLAlertDescription>
        </LLAlert>
        )}
      </div>
    </div>
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="pt-24 pb-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Scale className="w-12 h-12 mx-auto text-blue-400 mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-400">Book Your</span>{' '}
            <span className="text-green-400">Consultation</span>
          </h1>
          <p className="text-xl text-slate-400">
            Schedule a meeting with our expert legal team
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <ProgressBar />

        {!isSuccess ? (
          <>
            {currentStep === 0 && <ServiceStep />}
            {currentStep === 1 && <ScheduleStep />}
            {currentStep === 2 && <DetailsStep />}
            {currentStep === 3 && <ReviewStep />}

            <div className="flex justify-center gap-4 mt-8">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-6 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800/70 transition-colors"
                >
                  Back
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`
                    px-6 py-2 rounded-lg font-medium transition-colors
                    ${isSubmitting 
                      ? 'bg-slate-600 cursor-not-allowed' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'}
                  `}
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <LLAlert className="bg-green-500/20 border-green-500/50">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <LLAlertDescription className="text-green-400">
                Your appointment has been scheduled successfully! We'll send you a confirmation email shortly.
              </LLAlertDescription>
            </LLAlert>
          </div>
        )}
      </div>
    </div>
  );
};

export default LLAppointmentPage;