import type { PersonalInfo } from "../../types/portfolio";
import { normalizeLink } from "../../utils/format";

interface HeroSectionProps {
  personal: PersonalInfo;
}

const HeroSection = ({ personal }: HeroSectionProps) => {
  const linkedIn = normalizeLink(personal.linkedin);

  const heroIntro =
    "I design resilient systems that scale in production, modernize enterprise platforms, and ship measurable impact. My sweet spot is event-driven backend engineering with strong product ownership and practical AI acceleration.";

  return (
    <section id="home" className="hero-section">
      <div className="hero-heading-stack">
        <div className="hero-chip">Open to oportunites</div>
        <h1 className="hero-intro-title">Hi! I am {personal.name}.</h1>
      </div>
      <p className="hero-summary">{heroIntro}</p>

      <div className="hero-actions">
        <a className="btn-pill btn-pill--primary" href={`mailto:${personal.email}`}>
          Contact Me
        </a>
        <a className="btn-pill btn-pill--frosted" href={personal.resumeUrl} target="_blank" rel="noreferrer">
          Download Resume
        </a>
      </div>

      <div className="hero-meta">
        <span>{personal.location}</span>
        <span>{personal.phone}</span>
      </div>

      {linkedIn && (
        <ul className="hero-links" role="list">
          <li>
            <a href={linkedIn} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      )}
    </section>
  );
};

export default HeroSection;
