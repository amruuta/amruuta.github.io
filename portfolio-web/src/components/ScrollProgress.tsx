import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!progressRef.current) return;

      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled =
        windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;

      progressRef.current.style.width = `${scrolled}%`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      ref={progressRef}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 origin-left z-50"
      initial={{ width: '0%' }}
      style={{ scaleX: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 30 }}
    />
  );
}
