import '../css/LLawApp.css';
import React, { useState, useEffect}  from 'react';
import { useLocation } from 'react-router-dom';

// Import components using relative paths
import LLawFooter from './components/layout/LLawFooter';
import LLawNavbar from './components/layout/LLawNavbar';
import LLawDialog from './components/LLawDialog';
import LLoaderScreen from './components/LLoaderScreen';

import LLContactPage from './components/pages/LLContactPage';
import LLandingPage from './components/pages/LLandingPage';
import LLNotFoundPage from './components/pages/LLNotFoundPage';

import LLAboutPage from './components/pages/about/LLAboutPage';
import LLMissionValuesPage from './components/pages/about/LLMissionValuesPage';
import LLStoryPage from './components/pages/about/LLStoryPage';

import LLFAQPage from './components/pages/resources/LLFAQPage';

import LLTeamPage from './components/pages/team/LLTeamPage';
import LLAttorneysPage from './components/pages/team/LLAttorneysPage';
import LLPartnersPage from './components/pages/team/LLPartnersPage';
import LLegalStaffPage from './components/pages/team/LLegalStaffPage';

import LLPracticeAreasPage from './components/pages/practice-areas/LLPracticeAreasPage';
import LLCriminalLawPage from './components/pages/practice-areas/LLCriminalLawPage';
import LLCorporateLawPage from './components/pages/practice-areas/LLCorporateLawPage';
import LLIntellectualPropertyPage from './components/pages/practice-areas/LLIntellectualPropertyPage';
import LLFamilyLawPage from './components/pages/practice-areas/LLFamilyLawPage';
import LLitigationLawPage from './components/pages/practice-areas/LLitigationLawPage';
import LLRealEstateLawPage from './components/pages/practice-areas/LLRealEstateLawPage';
import LLTaxLawPage from './components/pages/practice-areas/LLTaxLawPage';

import { Routes, Route } from 'react-router-dom';

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
          <Route path="/about" element={<LLAboutPage />} />
          <Route path="/contact" element={<LLContactPage />} />
          <Route path="/resources/faqs" element={<LLFAQPage />} />

          <Route path="/about/mission" element={<LLMissionValuesPage />} />
          <Route path="/about/story" element={<LLStoryPage />} />

          <Route path="/team" element={<LLTeamPage />} />
          <Route path="/team/attorneys" element={<LLAttorneysPage />} />
          <Route path="/team/partners" element={<LLPartnersPage />} />
          <Route path="/team/staff" element={<LLegalStaffPage />} />

          <Route path="/practice-areas" element={<LLPracticeAreasPage />} />
          <Route path="/practice-areas/criminal-law" element={<LLCriminalLawPage />} />
          <Route path="/practice-areas/corporate-law" element={<LLCorporateLawPage />} />
          <Route path="/practice-areas/ip-law" element={<LLIntellectualPropertyPage />} />
          <Route path="/practice-areas/family-law" element={<LLFamilyLawPage />} />
          <Route path="/practice-areas/litigation-law" element={<LLitigationLawPage />} />
          <Route path="/practice-areas/real-estate-law" element={<LLRealEstateLawPage />} />
          <Route path="/practice-areas/tax-law" element={<LLTaxLawPage />} />

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