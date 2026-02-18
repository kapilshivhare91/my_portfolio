

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import BackgroundEffect from './components/BackgroundEffect';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import TimeTravelJourney from './components/journey/TimeTravelJourney';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MatrixLoader from './components/MatrixLoader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <MatrixLoader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Portfolio Content. We only render it functionally if loading is complete or 
          we render it underneath and let the loader slide up like a curtain. Since the loader 
          slides up (y: -100%), rendering the main app immediately underneath is correct! */}
      <div className={`relative min-h-screen bg-[#FFF9F2] text-gray-900 ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <CustomCursor />
        <BackgroundEffect />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <Projects />
          <TimeTravelJourney />
          <Skills />
          <About />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;

