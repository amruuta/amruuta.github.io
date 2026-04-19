import { useState, useEffect } from 'react';
import Container from './ui/Container';
import { useActiveSection } from '../lib/useActiveSection';
import { useTheme } from '../lib/ThemeContext';

const navLinks = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Achievements', href: '#achievements', id: 'achievements' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Publications', href: '#publications', id: 'publications' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { activeSection } = useActiveSection();
  const { isDark, toggleTheme } = useTheme();

  // Track scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Neo-Brutalism: Simple white background with thick black bottom border
  const navShadow = isScrolled
    ? isDark ? '0 4px 0px #ffffff' : '0 4px 0px #000000'
    : '0 0px 0px transparent';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-4 border-black"
      style={{
        backgroundColor: isDark ? '#111111' : '#ffffff',
        boxShadow: navShadow,
      }}
    >
      <Container>
        <nav className="flex items-center h-16">
          {/* Logo */}
          <a
            href="#hero"
            className="font-grotesk font-bold text-text-primary tracking-tight flex items-center gap-2 group transition-all duration-200 flex-shrink-0"
          >
            <span
              className="inline-flex items-center justify-center w-8 h-8 bg-brand text-white text-xs font-bold border-2 border-black"
              style={{
                boxShadow: '2px 2px 0px #000000',
              }}
            >
              AB
            </span>
            <span className="hidden sm:inline text-black font-grotesk font-bold group-hover:scale-[1.02] transition-transform duration-200 text-base">
              Amruta Bendale
            </span>
          </a>

          {/* Desktop links — flex-1 + justify-center so they fill space between logo and CTA */}
          <ul className="hidden lg:flex flex-1 items-center justify-center gap-0 ml-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`px-2 py-2 text-xs font-semibold uppercase transition-all duration-200 ${
                    activeSection === link.id
                      ? 'text-brand border-b-2 border-brand'
                      : 'text-gray-700 hover:text-black hover:border-b-2 hover:border-black'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA — right side */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 border-2 border-black transition-all duration-200"
              style={{
                backgroundColor: isDark ? '#F59E0B' : '#111111',
                color: isDark ? '#000000' : '#F3F4F6',
                boxShadow: isDark ? '2px 2px 0px #ffffff' : '2px 2px 0px #000000',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = isDark ? '3px 3px 0px #ffffff' : '3px 3px 0px #000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = isDark ? '2px 2px 0px #ffffff' : '2px 2px 0px #000000';
              }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                /* Sun icon */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
              ) : (
                /* Moon icon */
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <a
              href="https://www.linkedin.com/in/amruta-bendale"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-black bg-brand text-white font-bold text-xs tracking-wide hover:shadow-[4px_4px_0px_#000000] active:shadow-[2px_2px_0px_#000000] transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Mobile hamburger + dark toggle */}
          <div className="lg:hidden ml-auto pl-3 sm:pl-4 flex items-center gap-2">
            {/* Dark mode toggle (mobile) */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 border-2 border-black transition-all duration-200"
              style={{
                backgroundColor: isDark ? '#F59E0B' : '#111111',
                color: isDark ? '#000000' : '#F3F4F6',
              }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              className="flex flex-col gap-1.5 p-2 hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 bg-black transition-all duration-200 ${
                  menuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-black transition-opacity duration-200 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-black transition-all duration-200 ${
                  menuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="lg:hidden py-5 border-t-4 border-black"
          >
            <ul className="flex flex-col gap-0.5 mb-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`block px-3 py-2.5 text-xs font-bold tracking-wide uppercase transition-all ${
                      activeSection === link.id
                        ? 'text-brand border-l-4 border-brand bg-blue-50'
                        : 'text-gray-700 hover:text-black hover:border-l-4 hover:border-black'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="https://www.linkedin.com/in/amruta-bendale"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-black bg-brand text-white font-bold text-xs tracking-wide"
              onClick={() => setMenuOpen(false)}
            >
              LinkedIn
            </a>
          </div>
        )}
      </Container>
    </header>
  );
}
