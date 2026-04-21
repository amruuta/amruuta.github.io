import { useEffect, useState } from 'react';

const SECTION_IDS = [
  'hero',
  'about',
  'skills',
  'experience',
  'education',
  'achievements',
  'projects',
  // 'publications',
  'contact',
];

export function useActiveSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (scrollTop / windowHeight) * 100 : 0;
      setScrollProgress(progress);

      // Find active section based on actual DOM positions so URL + nav stay in sync.
      const activationPoint = scrollTop + 180;
      let nextActive = SECTION_IDS[0];

      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);
        if (!section) {
          continue;
        }

        if (activationPoint >= section.offsetTop) {
          nextActive = id;
        }
      }

      setActiveSection((prev) => {
        if (prev === nextActive) {
          return prev;
        }

        const nextHash = `#${nextActive}`;
        if (window.location.hash !== nextHash) {
          window.history.replaceState(null, '', nextHash);
        }

        return nextActive;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Call once on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return { scrollProgress, activeSection };
}
