import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import portrait1 from '../assets/portrait1.jpeg';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';
import portrait2 from '../assets/portrait2.jpeg';

// Vibrant accent colors - Violet + Cyan
const colors = {
  violet: '#8B5CF6',
  violetLight: '#EDE9FE',
  cyan: '#06B6D4',
  cyanLight: '#CFFAFE',
};

// 4-pointed lens-flare sparkle
const Sparkle = ({ size, style }: { size: number; style: React.CSSProperties }) => (
  <svg
    className="sparkle-star absolute pointer-events-none z-30"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    {/* Main 4-pointed star */}
    <path
      d="M50,2 C51.5,46 51.5,46 98,50 C51.5,54 51.5,54 50,98 C48.5,54 48.5,54 2,50 C48.5,46 48.5,46 50,2Z"
      fill="white"
    />
    {/* Diagonal smaller rays */}
    <path
      d="M50,20 C50.8,47 50.8,47 80,50 C50.8,53 50.8,53 50,80 C49.2,53 49.2,53 20,50 C49.2,47 49.2,47 50,20Z"
      fill="white"
      opacity="0.45"
    />
    {/* Center glow */}
    <circle cx="50" cy="50" r="6" fill="white" />
  </svg>
);

export default function About() {
  const { personal, experience, about } = portfolioData;
  const primaryStat = about.stats[0];
  const { bio } = about;

  const [flipped, setFlipped] = useState(false);
  const [showShine, setShowShine] = useState(false);

  const handleFlip = useCallback(() => {
    setFlipped((f) => !f);
    // Trigger shine after flip completes (700ms)
    setTimeout(() => {
      setShowShine(true);
      setTimeout(() => setShowShine(false), 500);
    }, 650);
  }, []);

  // Auto-flip every 4 seconds
  useEffect(() => {
    const interval = setInterval(handleFlip, 4000);
    return () => clearInterval(interval);
  }, [handleFlip]);

  return (
    <section id="about" className="pt-6 pb-0.5 lg:pt-8 lg:pb-2" style={{ overflowX: 'clip' }}>
      <Container>
        <SectionHeading 
          compact
          label="About" 
          title={`${personal.name} — ${personal.title}`}
          subtitle="A backend engineer obsessed with scalable systems and clean architecture"
        />

        {/* Main content grid: blocks left, portrait right */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4 lg:gap-8 items-stretch max-w-4xl mx-auto" style={{ overflow: 'visible' }}>
          {/* Left: Blocks stacked */}
          <motion.div
            className="min-w-0 flex flex-col gap-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {/* Who I am block */}
            <motion.div
              className="flex-1 p-2.5 lg:p-3 border-4 border-black flex flex-col justify-center"
              style={{
                backgroundColor: '#C4B5FD',
                boxShadow: '4px 4px 0px #000000',
              }}
              variants={fadeInUp}
              whileHover={{ 
                y: -2,
                boxShadow: '6px 6px 0px #000000',
              }}
            >
              <h3 className="text-sm font-black uppercase tracking-widest mb-2" style={{ color: colors.violet }}>
                WHO I AM
              </h3>
              <p className="text-sm leading-relaxed text-gray-800 font-medium">
                {bio}
              </p>
            </motion.div>

            {/* Two blocks side by side under Who I Am */}
            <div className="grid grid-cols-2 gap-3">
              {/* Experience stat */}
              <motion.div
                className="p-3 border-4 border-black text-center"
                style={{
                  backgroundColor: '#A5F3FC',
                  boxShadow: '4px 4px 0px #000000',
                }}
                variants={fadeInUp}
                whileHover={{ 
                  y: -3,
                  boxShadow: '6px 6px 0px #000000',
                }}
              >
                <div className="text-3xl font-black mb-1" style={{ color: colors.violet }}>
                  {primaryStat.value}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-gray-700 mb-0.5">
                  {primaryStat.label}
                </div>
                <div className="text-xs text-gray-600 font-semibold">
                  {primaryStat.desc}
                </div>
              </motion.div>

              {/* Current role info */}
              <motion.div
                className="p-3 border-4 border-black"
                style={{
                  backgroundColor: '#FDE68A',
                  boxShadow: '4px 4px 0px #000000',
                }}
                variants={fadeInUp}
                whileHover={{ 
                  y: -3,
                  boxShadow: '6px 6px 0px #000000',
                }}
              >
                <p className="text-xs font-black uppercase tracking-widest text-amber-700 mb-1">Active</p>
                <p className="text-sm font-bold text-gray-900 mb-1 leading-tight">
                  {experience[0].position}
                </p>
                <p className="text-xs text-gray-700">{experience[0].company} · {experience[0].location}</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Neubrutalism portrait frame with flip */}
          <motion.div
            className="flex items-start justify-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {/* Outer wrapper reserves space for the shadow offset so nothing bleeds */}
            <div
              className="relative w-full cursor-pointer group"
              style={{ paddingRight: '10px', paddingBottom: '10px' }}
              onClick={handleFlip}
            >
              {/* Neubrutalism shadow — with black border */}
              <div
                className="absolute border-4 border-black transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 portrait-border-anim"
                style={{
                  backgroundColor: colors.violet,
                  top: '10px',
                  left: '10px',
                  right: 0,
                  bottom: 0,
                }}
              />
              {/* Frame wrapper — tilt + perspective, holds the aspect ratio */}
              <div
                className="relative w-full aspect-[3/4] transition-transform duration-300 group-hover:rotate-0 group-hover:-translate-y-1"
                style={{ perspective: '2500px', transform: 'rotate(-1.5deg)' }}
              >
                {/* Decorative corner accents */}
                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-[3px] border-l-[3px] border-black z-20 pointer-events-none" />
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-[3px] border-r-[3px] border-black z-20 pointer-events-none" />
                <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-[3px] border-l-[3px] border-black z-20 pointer-events-none" />
                <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-[3px] border-r-[3px] border-black z-20 pointer-events-none" />

                {/* Badge */}
                <div
                  className="absolute -top-3 -right-3 z-20 w-7 h-7 flex items-center justify-center border-2 border-black rounded-full text-sm font-black pointer-events-none transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110"
                  style={{ backgroundColor: colors.cyan, color: '#000' }}
                >
                  ↻
                </div>

                {/* Flip card — border on each face so it rotates naturally */}
                <div className="absolute inset-0">
                  <motion.div
                    className="relative w-full h-full"
                    style={{
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
                    }}
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {/* Front face — portrait1 (IMG_3816) */}
                    <div
                      className="absolute inset-0 border-4 overflow-hidden bg-black portrait-border-anim"
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                      <img
                        src={portrait1}
                        alt="Portrait"
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Shine sweep */}
                      {showShine && (
                        <div className="absolute inset-0 z-10 pointer-events-none portrait-shine" />
                      )}
                    </div>
                    {/* Back face — portrait2 (IMG_1670) */}
                    <div
                      className="absolute inset-0 border-4 overflow-hidden bg-black portrait-border-anim"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <img
                        src={portrait2}
                        alt="Portrait alternate"
                        className="w-full h-full object-cover object-center"
                      />
                      {/* Shine sweep */}
                      {showShine && (
                        <div className="absolute inset-0 z-10 pointer-events-none portrait-shine" />
                      )}
                    </div>
                  </motion.div>
                </div>
                {/* Sparkle stars around portrait frame */}
                <Sparkle size={32} style={{ top: '-10%', right: '-8%', animationDuration: '2.8s', animationDelay: '0s' }} />
                <Sparkle size={18} style={{ top: '24%', right: '-10%', animationDuration: '2.2s', animationDelay: '1.1s' }} />
                <Sparkle size={26} style={{ bottom: '4%', right: '-6%', animationDuration: '3.1s', animationDelay: '0.5s' }} />
                <Sparkle size={22} style={{ bottom: '18%', left: '-8%', animationDuration: '2.5s', animationDelay: '0.3s' }} />
                <Sparkle size={14} style={{ top: '8%', left: '-7%', animationDuration: '2.0s', animationDelay: '1.7s' }} />
                <Sparkle size={13} style={{ top: '58%', right: '-8%', animationDuration: '1.9s', animationDelay: '0.85s' }} />
              </div>
            </div>
          </motion.div>

          {/* Scattered sparkles — exactly matching red circles */}
          {/* Right edge of Active/yellow block: two circles stacked vertically */}
          <Sparkle size={20} style={{ top: '71%', left: '65%', animationDuration: '2.4s', animationDelay: '0.2s' }} />
          <Sparkle size={16} style={{ top: '98%', left: '65%', animationDuration: '1.9s', animationDelay: '1.1s' }} />
          {/* Red circle positions from user screenshot — bottom row between blocks */}
          <Sparkle size={22} style={{ top: '100%', left: '32%', animationDuration: '2.3s', animationDelay: '0.4s' }} />
          <Sparkle size={20} style={{ top: '100%', left: '53%', animationDuration: '2.7s', animationDelay: '0.9s' }} />
          <Sparkle size={22} style={{ top: '100%', left: '74%', animationDuration: '2.1s', animationDelay: '0.2s' }} />
          {/* Bottom scattered row — just below full section */}
          <Sparkle size={17} style={{ top: '98%', left: '42%', animationDuration: '2.6s', animationDelay: '0.7s' }} />
          <Sparkle size={14} style={{ top: '101%', left: '52%', animationDuration: '2.1s', animationDelay: '0.0s' }} />
          <Sparkle size={13} style={{ top: '99%', left: '62%', animationDuration: '2.8s', animationDelay: '1.5s' }} />
          <Sparkle size={19} style={{ top: '97%', left: '78%', animationDuration: '2.3s', animationDelay: '0.4s' }} />
          <Sparkle size={14} style={{ top: '101%', left: '84%', animationDuration: '1.8s', animationDelay: '1.0s' }} />
          <Sparkle size={18} style={{ top: '98%', left: '91%', animationDuration: '2.5s', animationDelay: '0.6s' }} />
          <Sparkle size={13} style={{ top: '99%', left: '104%', animationDuration: '2.0s', animationDelay: '1.8s' }} />
        </div>
      </Container>
    </section>
  );
}
