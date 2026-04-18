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
  const left = align === 'left';
  return (
    <div className={`${compact ? 'mb-5' : 'mb-16'} ${left ? '' : 'text-center'}`}>
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
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
