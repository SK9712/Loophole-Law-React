import '../css/LLawApp.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

// Import components using relative paths
import LLawFooter from './layout/LLawFooter';
import LLawNavbar from './layout/LLawNavbar';
import LLawDialog from './components/LLawDialog';
import LLContactPage from './components/pages/LLContactPage';
import LLandingPage from './components/pages/LLandingPage';
import { Routes, Route } from 'react-router-dom';

function LLawApp() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <LLawNavbar />

      {/* Main content */}
      <main className="flex-1 mt-24">
        <Routes>
          <Route path="/" element={<LLandingPage />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/contact" element={<LLContactPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        {isLandingPage && <LLawDialog />}
      </main>

      {/* Footer */}
      <LLawFooter />
    </div>
  );
}

export default LLawApp;