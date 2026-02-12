
import React from 'react';
import CustomCursor from './components/CustomCursor';
import BackgroundEffect from './components/BackgroundEffect';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-[#050505]">
      <CustomCursor />
      <BackgroundEffect />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
