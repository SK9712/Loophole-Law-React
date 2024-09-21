import '../css/LLawApp.css';
import LLawFooter from './layout/LLawFooter';
import LLawNavbar from './layout/LLawNavbar';
import LLawDialog from './components/LLawDialog';

function LLawApp() {
  return (
    <div className="LLawApp">
      <LLawNavbar />
      <header className="LLawApp-header">
      <h1 className="text-3xl font-bold underline mt-10 text-center">
          Content
      </h1>
      </header>
      
      <div className="main-content">
        <LLawDialog />
      </div>
      <LLawFooter />
    </div>
  );
}

export default LLawApp;
