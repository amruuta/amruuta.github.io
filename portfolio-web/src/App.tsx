import { useLenis } from './lib/useLenis';
import AnimatedGradientBg from './components/AnimatedGradientBg';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  // Initialize Lenis smooth scrolling with GSAP ScrollTrigger sync
  useLenis();

  return (
    <div className="relative min-h-screen overflow-x-hidden text-text-primary font-body">
      <AnimatedGradientBg />
      <div className="relative z-10">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Achievements />
          <Projects />
          <Publications />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
