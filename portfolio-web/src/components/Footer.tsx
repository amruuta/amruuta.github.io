import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const { personal } = portfolioData;

  return (
    <footer className="relative border-t-4 border-black bg-white">
      <Container>
        {/* Main footer section */}
        <motion.div 
          className="py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* Left: Brand + signature */}
          <motion.div 
            className="flex flex-col gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="flex items-baseline gap-2"
              variants={fadeInUp}
              custom={0.1}
            >
              <span className="text-5xl font-bold text-black">AB</span>
              <span className="text-sm font-bold uppercase tracking-widest text-gray-600">Studio</span>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              custom={0.2}
            >
              <p className="text-sm font-bold text-gray-700 mb-1">{personal.name}</p>
              <p className="text-xs text-gray-600 uppercase tracking-wide">{personal.title}</p>
            </motion.div>
          </motion.div>

          {/* Right: Nav + social */}
          <motion.div 
            className="flex flex-col lg:flex-row gap-12 lg:gap-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Navigation */}
            <motion.ul 
              className="flex flex-col sm:flex-row gap-6 sm:gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link, idx) => (
                <motion.li key={link.href} variants={fadeInUp} custom={0.1 + idx * 0.05}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-black hover:text-gray-700 transition-colors duration-150 uppercase tracking-wide"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 border-2 border-black"
                variants={fadeInUp}
                custom={0.3}
                whileHover={{ backgroundColor: '#000', color: '#fff' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </motion.a>

              <motion.a
                href={`mailto:${personal.email}`}
                className="flex items-center justify-center w-10 h-10 border-2 border-black"
                variants={fadeInUp}
                custom={0.35}
                whileHover={{ backgroundColor: '#000', color: '#fff' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom divider with copyright */}
        <motion.div
          className="py-6 border-t-4 border-black flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={0.4}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gray-700">
            © {new Date().getFullYear()} {personal.name} — All Rights Reserved
          </p>
          <p className="text-xs text-gray-600">
            Built with React + TypeScript + Tailwind CSS
          </p>
        </motion.div>
      </Container>
    </footer>
  );
}
