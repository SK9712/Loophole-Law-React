import '../css/LLawApp.css';
import LLawFooter from './layout/LLawFooter';
import LLawNavbar from './layout/LLawNavbar';
import LLawDialog from './components/LLawDialog';
import LLContactPage from './components/pages/LLContactPage';
import { Routes, Route } from 'react-router-dom';

function LLawApp() {
  return (
    <div className="LLawApp">
      <LLawNavbar />
      <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/contact" element={<LLContactPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <div className="main-content">
        <LLawDialog />
      </div>
      <LLawFooter />
    </div>
  );
}

export default LLawApp;
