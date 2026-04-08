import type { ReactNode } from "react";

interface SectionShellProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

const SectionShell = ({ id, title, description, children }: SectionShellProps) => {
  return (
    <section id={id} className="section-shell">
      <div className="section-head">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </section>
  );
};

export default SectionShell;
