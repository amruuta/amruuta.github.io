import type { CertificationItem, EducationItem } from "../../types/portfolio";
import SectionShell from "./SectionShell";

interface HighlightsSectionProps {
  education: EducationItem[];
  certifications: CertificationItem[];
  awards: string[];
}

const HighlightsSection = ({ education, certifications, awards }: HighlightsSectionProps) => {
  return (
    <SectionShell
      id="highlights"
      title="Education & Highlights"
      description="Academic foundation, certifications, and recognition earned through platform modernization work."
    >
      <div className="highlights-grid">
        <article className="glass-card">
          <h3>Education</h3>
          {education.map((item) => (
            <div key={`${item.institution}-${item.year}`} className="highlight-block">
              <p className="title-line">
                {item.degree} in {item.field}
              </p>
              <p>{item.institution}</p>
              <p className="muted-copy">{item.year}</p>
              <ul className="detail-list" role="list">
                {item.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </article>

        <article className="glass-card">
          <h3>Certifications</h3>
          <ul className="detail-list" role="list">
            {certifications.map((certification) => (
              <li key={certification.name}>
                {certification.url ? (
                  <a href={certification.url} target="_blank" rel="noreferrer">
                    {certification.name}
                  </a>
                ) : (
                  certification.name
                )}
              </li>
            ))}
          </ul>
        </article>

        <article className="glass-card">
          <h3>Awards</h3>
          <ul className="detail-list" role="list">
            {awards.map((award) => (
              <li key={award}>{award}</li>
            ))}
          </ul>
        </article>
      </div>
    </SectionShell>
  );
};

export default HighlightsSection;
