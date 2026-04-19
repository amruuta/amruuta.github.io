import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';

export default function Contact() {
  const { personal } = portfolioData;

  const whatsappHref = personal.phone
    ? `https://wa.me/${personal.phone.replace(/\D/g, '')}`
    : '';

  const socialLinks = [
    { label: 'LinkedIn', href: personal.linkedin, icon: <LinkedInIcon /> },
    { label: 'GitHub', href: personal.github, icon: <GitHubIcon /> },
    { label: 'Medium', href: (personal as any).medium, icon: <MediumIcon /> },
    { label: 'Gmail', href: `mailto:${personal.email}`, icon: <GmailIcon /> },
    { label: 'WhatsApp', href: whatsappHref, icon: <WhatsAppIcon /> },
    { label: 'Resume', href: (personal as any).resume, icon: <ResumeIcon /> },
  ].filter((l) => !!l.href);

  return (
    <section id="contact" className="py-32">
      <Container>
        <SectionHeading label="Let's Connect" title="Get in Touch" />

        <motion.div
          className="border-4 border-black overflow-hidden"
          style={{ boxShadow: '6px 6px 0px #000000', backgroundColor: '#EDE9FE' }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={0.1}
        >
          {/* Cyan accent top bar */}
          <div className="h-1.5 w-full" style={{ backgroundColor: '#22d3ee' }} />

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 p-8 lg:p-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {/* ── Left column ── */}
            <motion.div className="flex flex-col gap-5" variants={staggerContainer}>
              {/* Blurb */}
              <motion.p
                className="text-base leading-relaxed font-medium max-w-lg"
                style={{ color: '#4B5563' }}
                variants={fadeInUp}
                custom={0.1}
              >
                I'm always open to discussing backend engineering, agentic systems, or exciting
                opportunities. Feel free to reach out!
              </motion.p>

              {/* Email block */}
              <motion.a
                href={`mailto:${personal.email}`}
                className="group flex flex-col gap-1.5 border-4 border-black p-5 transition-all duration-200"
                style={{ backgroundColor: '#A5F3FC', boxShadow: '4px 4px 0px #000000' }}
                whileHover={{ y: -3, boxShadow: '6px 6px 0px #000000' }}
                variants={fadeInUp}
                custom={0.2}
              >
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#0891B2' }}>
                  ✉ Reach me at
                </span>
                <span
                  className="text-xl md:text-2xl font-black break-all transition-colors duration-200"
                  style={{ color: '#0e7490' }}
                >
                  {personal.email}
                </span>
                <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-700 transition-colors">
                  Click to open email client →
                </span>
              </motion.a>

              {/* Info chips row */}
              <motion.div className="flex flex-wrap gap-3" variants={fadeInUp} custom={0.3}>
                <div
                  className="flex items-center gap-2 px-3 py-1.5 border-2 border-black text-xs font-bold"
                  style={{ backgroundColor: '#FDE68A', boxShadow: '2px 2px 0px #000000' }}
                >
                  <span>📍</span>
                  <span>{personal.location}</span>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-1.5 border-2 border-black text-xs font-bold"
                  style={{ backgroundColor: '#BBF7D0', boxShadow: '2px 2px 0px #000000' }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                  <span>Open to Opportunities</span>
                </div>
                {personal.phone && (
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 border-2 border-black text-xs font-bold"
                    style={{ backgroundColor: '#C4B5FD', boxShadow: '2px 2px 0px #000000' }}
                  >
                    <span>📞</span>
                    <span>{personal.phone}</span>
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* ── Right column: Social links ── */}
            <motion.div
              className="flex flex-col gap-4"
              variants={fadeInUp}
              custom={0.3}
            >
              <div
                className="px-3 py-1.5 border-2 border-black self-start"
                style={{ backgroundColor: '#7C3AED', boxShadow: '2px 2px 0px #000000' }}
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  Find me on
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="flex flex-col items-center gap-1.5 border-2 border-black p-3 transition-all duration-200"
                    style={{ backgroundColor: '#1e1b4b', boxShadow: '3px 3px 0px #000000' }}
                    whileHover={{ y: -3, boxShadow: '4px 4px 0px #000000', scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    variants={fadeInUp}
                    custom={0.1 * (i + 4)}
                    aria-label={link.label}
                  >
                    {link.icon}
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── Brand Icons ── */

function LinkedInIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.364l-6.545-4.636v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.273l6.545-4.636 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335" />
      <path d="M0 5.457v13.909c0 .904.732 1.636 1.636 1.636h3.819V11.73L12 16.364V9.273L5.455 4.64 3.927 3.493C2.309 2.28 0 3.434 0 5.457z" fill="#34A853" />
      <path d="M18.545 11.73v9.273h3.819A1.636 1.636 0 0 0 24 19.366V5.457c0-2.023-2.31-3.178-3.927-1.964L18.545 4.64v7.09z" fill="#4285F4" />
      <path d="M5.455 11.73L12 16.364l6.545-4.636V4.64L12 9.273 5.455 4.64v7.09z" fill="#FBBC05" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
interface ContactItemProps {
  icon: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

function ContactItem({ icon, label, value, href, external }: ContactItemProps) {
  const content = (
    <motion.div
      className="flex items-center gap-4 p-4 border-3 border-gray-300 transition-all duration-200"
      style={{
        backgroundColor: '#FFFBEB',
        boxShadow: '3px 3px 0px #000000',
      }}
      whileHover={{
        y: -2,
        borderColor: '#F59E0B',
        boxShadow: '4px 4px 0px #000000',
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: '#FEF3C7', color: '#F59E0B', border: '2px solid #F59E0B' }}
      >
        {ICONS[icon]}
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest font-bold text-gray-700">{label}</p>
        <p className="text-base font-semibold text-black mt-0.5">{value}</p>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="hover:opacity-90 transition-opacity block"
      >
        {content}
      </a>
    );
  }

  return content;
}
