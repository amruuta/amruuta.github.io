import type { PersonalInfo } from "../../types/portfolio";
import { normalizeLink } from "../../utils/format";

interface ContactSectionProps {
  personal: PersonalInfo;
}

const ContactSection = ({ personal }: ContactSectionProps) => {
  const links = [
    { label: "LinkedIn", href: normalizeLink(personal.linkedin) },
    { label: "GitHub", href: normalizeLink(personal.github) },
    { label: "LeetCode", href: normalizeLink(personal.leetcode) },
    { label: "Medium", href: normalizeLink(personal.medium) },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));

  return (
    <section id="contact" className="contact-section">
      <h2>Open A Channel To The Command Deck.</h2>
      <p>
        If you are building backend-heavy products, distributed workflows, or AI-powered systems, let us design
        the next release orbit together.
      </p>
      <a className="btn-pill btn-pill--primary" href={`mailto:${personal.email}`}>
        {personal.email}
      </a>

      {links.length > 0 && (
        <ul className="contact-links" role="list">
          {links.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ContactSection;
