import React, { useState } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Services from './components/Services';
import Project from './components/Project';
import ExperienceEducation from './components/ExperienceEducation';
import Certificates from './components/Certificates';
import Footer from './components/Footer';
import ComingSoon from './components/ComingSoon';
import TargetCursor from './components/TargetCursor/TargetCursor';
import ProfileHireCard from './components/ProfileHireCard';

function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  if (showComingSoon) {
    return <ComingSoon onBack={() => setShowComingSoon(false)} />;
  }

  return (
    <main>
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />

      <Hero onPreloadComplete={() => setPreloaderComplete(true)} />
      
      {preloaderComplete && (
        <div className="animate-fade-in-up">
          <Navbar />
          <ProfileHireCard />
          <About />
          <ExperienceEducation />
          <Services />
          <Project onCtaClick={() => setShowComingSoon(true)} />
          <Certificates />
          <Footer />
        </div>
      )}
    </main>
  );
}

export default App;
