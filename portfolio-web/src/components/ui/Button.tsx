import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-5 py-2 font-bold text-xs focus-ring transition-all duration-200 border-2 border-black uppercase tracking-wide rounded-none';

  const primaryClass =
    'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-[6px_6px_0px_#000000] active:shadow-[2px_2px_0px_#000000] active:scale-[0.98] hover:scale-[1.04]';
  const secondaryClass =
    'text-black bg-white hover:shadow-[6px_6px_0px_#000000] active:shadow-[2px_2px_0px_#000000] active:scale-[0.98] hover:scale-[1.04]';

  const classes = `${base} ${variant === 'primary' ? primaryClass : secondaryClass} ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        className={classes}
        style={{
          boxShadow: variant === 'primary' ? '4px 4px 0px #000000' : '4px 4px 0px #000000'
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={classes}
      style={{
        boxShadow: variant === 'primary' ? '4px 4px 0px #000000' : '4px 4px 0px #000000'
      }}
    >
      {children}
    </button>
  );
}
