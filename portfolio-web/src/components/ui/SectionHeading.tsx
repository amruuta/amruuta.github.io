interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const left = align === 'left';
  return (
    <div className={`mb-16 ${left ? '' : 'text-center'}`}>
      <span className="eyebrow inline-block mb-3.5">{label}</span>
      <h2
        className={`font-heading text-3xl md:text-4xl font-bold text-text-primary ${
          left ? '' : 'max-w-2xl mx-auto'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-text-secondary text-[0.95rem] leading-relaxed ${
            left ? 'max-w-lg' : 'max-w-xl mx-auto'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
