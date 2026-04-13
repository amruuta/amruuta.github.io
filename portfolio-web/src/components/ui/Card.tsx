import { CSSProperties, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hover?: boolean;
}

export default function Card({ children, className = '', style, hover = true }: CardProps) {
  return (
    <div
      className={`card-base p-6 ${hover ? '' : '[transform:none!important] [box-shadow:none!important]'} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
