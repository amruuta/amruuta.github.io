import { motion } from 'framer-motion';
import { fadeInUp, viewport } from '../../lib/animations';
import { useTheme } from '../../lib/ThemeContext';

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
        className={`font-heading ${compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} font-bold text-text-primary ${
          left ? '' : 'max-w-2xl mx-auto'
        }`}
      >
        {title}
      </h2>
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
