import type { CertificationItem } from "../../types/portfolio";
import SectionShell from "./SectionShell";

interface AchievementsSectionProps {
  certifications: CertificationItem[];
  awards: string[];
}

const AchievementsSection = ({ certifications, awards }: AchievementsSectionProps) => {
  return (
    <SectionShell
      id="achievements"
      title="Achievements"
      description="Milestones earned by modernizing enterprise platforms, lifting throughput, and shipping reliable backend systems."
    >
      <div className="achievements-grid">
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

export default AchievementsSection;
