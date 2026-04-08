import type { ExperienceItem } from "../../types/portfolio";
import SectionShell from "./SectionShell";
import clsaLogo from "../../assets/logos/clsa-symbol-square.svg";
import persistentSystemsLogo from "../../assets/logos/persistent-symbol-square.png";
import westernUnionLogo from "../../assets/logos/western-union-symbol-square.svg";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

type CompanyLogo = {
  src: string;
  variant: "wu" | "clsa" | "persistent";
};

const companyLogos: Record<string, CompanyLogo> = {
  "Western Union": { src: westernUnionLogo, variant: "wu" },
  CLSA: { src: clsaLogo, variant: "clsa" },
  "Persistent Systems": { src: persistentSystemsLogo, variant: "persistent" },
};

const getSigil = (company: string) =>
  company
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
  return (
    <SectionShell
      id="experience"
      title="Experience"
      description="Career timeline from core engineering labs to enterprise platforms, where each release sharpened reliability and scale."
    >
      <div className="experience-timeline">
        <div className="experience-timeline__line" aria-hidden="true" />
        {experience.map((role) => {
          const companyLogo = companyLogos[role.company];
          const badgeClassName = companyLogo
            ? `experience-node__sigil experience-node__sigil--${companyLogo.variant}`
            : "experience-node__sigil";

          return (
          <article key={`${role.company}-${role.duration}`} className="experience-node">
            <div className={badgeClassName}>
              {companyLogo ? (
                <img
                  className={`experience-node__logo experience-node__logo--${companyLogo.variant}`}
                  src={companyLogo.src}
                  alt={`${role.company} logo`}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span aria-hidden="true">{getSigil(role.company)}</span>
              )}
            </div>

            <div className="experience-card experience-node__body">
              <div className="experience-head">
                <div>
                  <h3>
                    {role.company.toUpperCase()} | {role.position}
                  </h3>
                  <p>{role.duration}</p>
                </div>

                <div className="experience-meta">
                  <span>{role.location}</span>
                </div>
              </div>

              <ul className="detail-list" role="list">
                {role.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
          );
        })}
      </div>
    </SectionShell>
  );
};

export default ExperienceSection;
