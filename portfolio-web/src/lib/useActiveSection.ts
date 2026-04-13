import { useEffect, useState } from 'react';

export function useActiveSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (scrollTop / windowHeight) * 100 : 0;
      setScrollProgress(progress);

      // Find active section based on scroll position
      const sections = [
        { id: 'hero', offset: 0 },
        { id: 'about', offset: 800 },
        { id: 'skills', offset: 1600 },
        { id: 'experience', offset: 2400 },
        { id: 'education', offset: 3200 },
        { id: 'achievements', offset: 4000 },
        { id: 'projects', offset: 4800 },
        { id: 'publications', offset: 5600 },
        { id: 'contact', offset: 6400 },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollTop >= sections[i].offset - 200) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, activeSection };
}
