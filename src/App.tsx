import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import LandingPage from './components/LandingPage';
import ResumeBuilder from './components/ResumeBuilder';
import AboutUs from './components/AboutUs';
import Pricing from './components/Pricing';
import Templates from './components/Templates';
import Blog from './components/Blog';

type Page = 'landing' | 'builder' | 'about' | 'pricing' | 'templates' | 'blog';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const { isSignedIn, isLoaded } = useUser();

  // Redirect signed-in users to resume builder if they're on landing page
  React.useEffect(() => {
    if (isLoaded && isSignedIn && currentPage === 'landing') {
      setCurrentPage('builder');
    }
  }, [isSignedIn, isLoaded, currentPage]);

  // Check for stored template selection when user signs in
  React.useEffect(() => {
    if (isLoaded && isSignedIn) {
      const storedTemplate = localStorage.getItem('selectedTemplate');
      if (storedTemplate) {
        setSelectedTemplate(storedTemplate);
        localStorage.removeItem('selectedTemplate'); // Clean up
        setCurrentPage('builder');
      }
    }
  }, [isSignedIn, isLoaded]);

  const handleGetStarted = () => {
    setCurrentPage('builder');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (isSignedIn) {
      setCurrentPage('builder');
    }
  };

  const renderCurrentPage = () => {
    const pageProps = {
      isDarkMode,
      onToggleTheme: toggleTheme,
      onNavigate: handleNavigation,
      onTemplateSelect: handleTemplateSelect
    };

    switch (currentPage) {
      case 'builder':
        return (
          <ResumeBuilder 
            onBackToLanding={handleBackToLanding} 
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            selectedTemplate={selectedTemplate}
          />
        );
      case 'about':
        return <AboutUs {...pageProps} />;
      case 'pricing':
        return <Pricing {...pageProps} />;
      case 'templates':
        return <Templates {...pageProps} />;
      case 'blog':
        return <Blog {...pageProps} />;
      default:
        return (
          <LandingPage 
            onGetStarted={handleGetStarted}
            onNavigate={handleNavigation}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            onTemplateSelect={handleTemplateSelect}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark' : ''
    }`}>
      {renderCurrentPage()}
    </div>
  );
}

export default App;