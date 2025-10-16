import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import LegalPage from '@/components/LegalPage';

const App: React.FC = () => {
  const [isLegalPage, setIsLegalPage] = useState(window.location.hash === '#legal');

  // Handles browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setIsLegalPage(window.location.hash === '#legal');
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNavigate = useCallback((sectionId: string, serviceId?: string) => {
    const targetId = sectionId.substring(1);
    
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });

      // If a serviceId was provided, we can attempt to pre-select it in the booking system,
      // but the core logic is now external. We can pass it in the URL hash for the iframe to pick up.
      if (serviceId) {
        // This is a conceptual example. The actual implementation depends on EasyAppointments.
        const newUrl = `${window.location.pathname}#reservation?service=${serviceId}`;
        window.history.replaceState(null, '', newUrl);
      }
    }
  }, []);
  
  const navigateToLegal = () => {
    setIsLegalPage(true);
    window.scrollTo(0, 0);
    window.history.pushState(null, '', '#legal');
  };
  
  const navigateToHome = () => {
    setIsLegalPage(false);
    // Use the pathname to clear the hash from the URL
    window.history.pushState(null, '', window.location.pathname);
  };


  if (isLegalPage) {
    return <LegalPage onNavigate={navigateToHome} />;
  }

  return (
    <div className="bg-[#0c0a1a] text-gray-300 antialiased">
      <Header onNavigate={handleNavigate} />
      <main role="main">
        <Hero onNavigate={handleNavigate} />
        <About />
        <Services onNavigate={handleNavigate} />
        <FAQ />
      </main>
      <Footer onNavigate={handleNavigate} onNavigateToLegal={navigateToLegal} />
    </div>
  );
};

export default App;
