import '../css/LLawApp.css';
import React, { useState, useEffect}  from 'react';
import { useLocation, Navigate  } from 'react-router-dom';

// Import components using relative paths
import LLawFooter from './components/layout/LLawFooter';
import LLawNavbar from './components/layout/LLawNavbar';
import LLawDialog from './components/LLawDialog';
import LLoaderScreen from './components/LLoaderScreen';

import LLContactPage from './components/pages/LLContactPage';
import LLandingPage from './components/pages/LLandingPage';
import LLWhyUsPage from './components/pages/LLWhyUsPage';
import LLServicesPage from './components/pages/LLServicesPage';
import LLNotFoundPage from './components/pages/LLNotFoundPage';

import LLAboutPage from './components/pages/about/LLAboutPage';
import LLMissionValuesPage from './components/pages/about/LLMissionValuesPage';
import LLStoryPage from './components/pages/about/LLStoryPage';

import LLResourcesPage from './components/pages/resources/LLResourcesPage';
import LLBlogPage from './components/pages/resources/LLBlogPage';
import LLFAQPage from './components/pages/resources/LLFAQPage';

import LLTeamPage from './components/pages/team/LLTeamPage';
import LLAttorneysPage from './components/pages/team/LLAttorneysPage';
import LLPartnersPage from './components/pages/team/LLPartnersPage';
import LLegalStaffPage from './components/pages/team/LLegalStaffPage';

import LLPracticeAreasPage from './components/pages/practice-areas/LLPracticeAreasPage';
import LLCriminalLawPage from './components/pages/practice-areas/LLCriminalLawPage';
import LLCivilLawPage from './components/pages/practice-areas/LLCivilLawPage';
import LLBankingLawPage from './components/pages/practice-areas/LLBankingLawPage';
import LLRegistrationLawPage from './components/pages/practice-areas/LLRegistrationLawPage';
import LLCorporateLawPage from './components/pages/practice-areas/LLCorporateLawPage';
import LLIntellectualPropertyPage from './components/pages/practice-areas/LLIntellectualPropertyPage';
import LLFamilyLawPage from './components/pages/practice-areas/LLFamilyLawPage';
import LLTaxLawPage from './components/pages/practice-areas/LLTaxLawPage';

import LLAdminLoginPage from './components/pages/admin/LLAdminLoginPage';
import LLAdminContainer from './components/pages/admin/LLAdminContainer';

import LLAppointmentPage from './components/pages/consultation/LLAppointmentPage';

import { Routes, Route } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function LLawApp() {
 const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    // Initial app load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  // Add loading state for route changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Shorter duration for route changes

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return <LLoaderScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <LLawNavbar />

      {/* Main content */}
      <main className="flex-1 mt-24">
        <Routes>
          <Route path="/" element={<LLandingPage />} />
          <Route path="/contact" element={<LLContactPage />} />
          <Route path="/why-us" element={<LLWhyUsPage />} />
          <Route path="/services" element={<LLServicesPage />} />

          <Route path="/resources" element={<LLResourcesPage />} />
          <Route path="/resources/blog" element={<LLBlogPage />} />
          <Route path="/resources/faqs" element={<LLFAQPage />} />

          <Route path="/about" element={<LLAboutPage />} />
          <Route path="/about/mission" element={<LLMissionValuesPage />} />
          <Route path="/about/story" element={<LLStoryPage />} />

          <Route path="/team" element={<LLTeamPage />} />
          <Route path="/team/attorneys" element={<LLAttorneysPage />} />
          <Route path="/team/partners" element={<LLPartnersPage />} />
          <Route path="/team/staff" element={<LLegalStaffPage />} />

          <Route path="/practice-areas" element={<LLPracticeAreasPage />} />
          <Route path="/practice-areas/criminal-law" element={<LLCriminalLawPage />} />
          <Route path="/practice-areas/civil-law" element={<LLCivilLawPage />} />
          <Route path="/practice-areas/banking-law" element={<LLBankingLawPage />} />
          <Route path="/practice-areas/registration-law" element={<LLRegistrationLawPage />} />
          <Route path="/practice-areas/corporate-law" element={<LLCorporateLawPage />} />
          <Route path="/practice-areas/ip-law" element={<LLIntellectualPropertyPage />} />
          <Route path="/practice-areas/family-law" element={<LLFamilyLawPage />} />
          <Route path="/practice-areas/tax-law" element={<LLTaxLawPage />} />

          <Route path="/admin" element={<LLAdminLoginPage />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><LLAdminContainer /></ProtectedRoute>} />

          <Route path="/consultation" element={<LLAppointmentPage />} />

          <Route path="*" element={<LLNotFoundPage />} /> 
        </Routes>
        {isLandingPage && <LLawDialog />}
      </main>

      {/* Footer */}
      <LLawFooter />
    </div>
  );
}

export default LLawApp;