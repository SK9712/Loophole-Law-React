// LLAppointmentPage.jsx
import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { LLAlert, LLAlertDescription } from './LLAlert';
import { LLProgressBar } from './LLProgressBar';
import { LLServiceStep } from './LLServiceStep';
import { LLScheduleStep } from './LLScheduleStep';
import { LLDetailsStep } from './LLDetailsStep';
import { LLReviewStep } from './LLReviewStep';
import { LLAppointmentHeader } from './LLAppointmentHeader';
import { LLNavigationButtons } from './LLNavigationButtons';

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

  const handleServiceSelect = (serviceName) => {
    setFormData(prev => ({ ...prev, service: serviceName }));
    setCurrentStep(1);
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleTimeSelect = (time) => {
    setFormData(prev => ({ ...prev, time }));
    setCurrentStep(2);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleContinue = () => {
    // Validate current step before proceeding
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(steps.length - 1, prev + 1));
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return !!formData.service;
      case 1:
        return !!formData.date && !!formData.time;
      case 2:
        return !!formData.name && !!formData.email && !!formData.phone;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would normally make an API call to save the appointment
      // const response = await fetch('/api/appointments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      // Here you would normally handle the error and show it to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <LLServiceStep 
          services={services} 
          onServiceSelect={handleServiceSelect} 
        />;
      case 1:
        return <LLScheduleStep 
          formData={formData}
          onDateChange={handleDateChange}
          onTimeSelect={handleTimeSelect}
        />;
      case 2:
        return <LLDetailsStep 
          formData={formData}
          onFormChange={handleFormChange}
        />;
      case 3:
        return <LLReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <LLAppointmentHeader />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <LLProgressBar steps={steps} currentStep={currentStep} />

        {!isSuccess ? (
          <>
            {renderCurrentStep()}

            <LLNavigationButtons
              currentStep={currentStep}
              maxSteps={steps.length}
              onBack={handleBack}
              onContinue={handleContinue}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
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

        {/* Optional: Add a way to start over or book another appointment */}
        {isSuccess && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setCurrentStep(0);
                setFormData({
                  service: '',
                  date: '',
                  time: '',
                  name: '',
                  email: '',
                  phone: '',
                  message: '',
                  isEmergency: false
                });
                setIsSuccess(false);
              }}
              className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
            >
              Book Another Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LLAppointmentPage;