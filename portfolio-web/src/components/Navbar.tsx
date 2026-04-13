import { useState, useEffect } from 'react';
import Container from './ui/Container';
import { useActiveSection } from '../lib/useActiveSection';

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
    ? '0 4px 0px #000000' 
    : '0 0px 0px transparent';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b-4 border-black"
      style={{
        boxShadow: navShadow,
      }}
    >
      <Container>
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            className="font-grotesk font-bold text-text-primary tracking-tight flex items-center gap-2 group transition-all duration-200"
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

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
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

          {/* Desktop CTA */}
          <a
            href="https://www.linkedin.com/in/amruta-bendale"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 border-2 border-black bg-brand text-white font-bold text-xs tracking-wide hover:shadow-[4px_4px_0px_#000000] active:shadow-[2px_2px_0px_#000000] transition-all duration-200"
            style={{}}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-100 transition-colors"
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
