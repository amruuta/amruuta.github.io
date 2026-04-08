import type { EducationItem } from "../../types/portfolio";
import SectionShell from "./SectionShell";

interface EducationSectionProps {
  education: EducationItem[];
}

const EducationSection = ({ education }: EducationSectionProps) => {
  return (
    <SectionShell
      id="education"
      title="Education"
      description="Foundational training in computer science, algorithms, and systems design that powers my engineering decisions."
    >
      <div className="education-stack">
        {education.map((item) => (
          <article key={`${item.institution}-${item.year}`} className="glass-card education-card">
            <h3>
              {item.degree} in {item.field}
            </h3>
            <p className="title-line">{item.institution}</p>
            <p className="muted-copy">{item.year}</p>
            <ul className="detail-list" role="list">
              {item.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  );
};

export default EducationSection;
