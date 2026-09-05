import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeInUp, viewport } from '../../lib/animations';
import { useTheme } from '../../lib/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  compact?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  compact = false,
}: SectionHeadingProps) {
  const { isDark } = useTheme();
  const left = align === 'left';
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);

  // Words rise out from behind a mask as the heading scrolls in, with a rule
  // drawing underneath. Split per word rather than per character so long titles
  // stay readable and screen readers still get the whole string (the visible
  // spans are aria-hidden; the real text sits in a sr-only node).
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const words = el.querySelectorAll<HTMLElement>('[data-word]');
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 118 });
      if (ruleRef.current) gsap.set(ruleRef.current, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });

      tl.to(words, {
        yPercent: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.075,
      });

      if (ruleRef.current) {
        tl.to(ruleRef.current, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, '-=0.35');
      }
    }, el);

    return () => ctx.revert();
  }, [title]);

  return (
    <motion.div
      className={`${compact ? 'mb-2' : 'mb-16'} ${left ? '' : 'text-center'}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <span className={`eyebrow inline-block ${compact ? 'mb-1.5' : 'mb-3.5'}`}>{label}</span>
      <h2
        ref={titleRef}
        className={`font-heading ${compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} font-bold text-text-primary ${
          left ? '' : 'max-w-2xl mx-auto'
        }`}
      >
        {/* Real text for assistive tech / SEO — the animated spans are decorative. */}
        <span className="sr-only">{title}</span>
        <span aria-hidden="true">
          {title.split(' ').map((word, i) => (
            // Each word gets a clipping wrapper so it can slide up from nothing.
            <span
              key={`${word}-${i}`}
              className="inline-block overflow-hidden align-bottom"
              style={{ paddingBottom: '0.08em' }}
            >
              <span data-word className="inline-block will-change-transform">
                {word}
                {i < title.split(' ').length - 1 ? ' ' : ''}
              </span>
            </span>
          ))}
        </span>
      </h2>

      {/* Rule that draws in under the title */}
      <span
        ref={ruleRef}
        aria-hidden="true"
        className={`block h-[3px] mt-3 ${left ? '' : 'mx-auto'}`}
        style={{
          width: compact ? '48px' : '68px',
          transformOrigin: left ? 'left center' : 'center',
          backgroundColor: isDark ? '#FFFFFF' : '#000000',
        }}
      />

      {subtitle && (
        <p
          className={`${compact ? 'mt-1.5 text-sm' : 'mt-4 text-[0.95rem]'} text-text-secondary leading-relaxed ${
            left ? 'max-w-lg' : 'max-w-xl mx-auto'
          }`}
          style={{ color: isDark ? '#FFFFFF' : undefined }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
