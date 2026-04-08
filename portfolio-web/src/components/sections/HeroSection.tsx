import { useEffect, useState } from "react";
import type { PersonalInfo } from "../../types/portfolio";
import { normalizeLink } from "../../utils/format";

interface HeroSectionProps {
  personal: PersonalInfo;
}

const HeroSection = ({ personal }: HeroSectionProps) => {
  const linkedIn = normalizeLink(personal.linkedin);
  const titleText = `Hi! I am ${personal.name}.`;
  const [typedTitle, setTypedTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handlePreferenceChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handlePreferenceChange();
    mediaQuery.addEventListener("change", handlePreferenceChange);

    return () => mediaQuery.removeEventListener("change", handlePreferenceChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedTitle(titleText);
      setIsDeleting(false);
      return;
    }

    if (typedTitle.length > titleText.length) {
      setTypedTitle(titleText);
      return;
    }

    let timeoutId: number;

    if (!isDeleting && typedTitle === titleText) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && typedTitle.length === 0) {
      timeoutId = window.setTimeout(() => setIsDeleting(false), 320);
    } else {
      timeoutId = window.setTimeout(() => {
        const nextLength = typedTitle.length + (isDeleting ? -1 : 1);
        setTypedTitle(titleText.slice(0, Math.max(0, nextLength)));
      }, isDeleting ? 48 : 84);
    }

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, prefersReducedMotion, titleText, typedTitle]);

  const heroIntro =
    "I design resilient systems that scale in production, modernize enterprise platforms, and ship measurable impact. My sweet spot is event-driven backend engineering with strong product ownership and practical AI acceleration.";

  return (
    <section id="home" className="hero-section">
      <div className="hero-heading-stack">
        <div className="hero-chip">Actively searching jobs</div>
        <h1 className="hero-intro-title hero-intro-title--typing" aria-label={titleText}>
          <span aria-hidden="true">{typedTitle}</span>
          {!prefersReducedMotion && <span className="hero-intro-title__caret" aria-hidden="true" />}
        </h1>
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
