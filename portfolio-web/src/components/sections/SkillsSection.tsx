import type { SkillsMap } from "../../types/portfolio";
import { toDisplayLabel } from "../../utils/format";
import SectionShell from "./SectionShell";

interface SkillsSectionProps {
  skills: SkillsMap;
}

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const skillGroups = Object.entries(skills);
  const skillTicker = skillGroups.flatMap(([, items]) => items).slice(0, 14);

  return (
    <SectionShell
      id="skills"
      title="Skills"
      description="The engineering toolkit I use to architect services, ship resilient APIs, and prototype AI-driven workflows."
    >
      <div className="skills-signal" aria-hidden="true">
        <div className="skills-signal__track">
          {[...skillTicker, ...skillTicker].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <div className="skills-grid">
        {skillGroups.map(([group, items]) => (
          <article key={group} className="glass-card skill-card">
            <h3>{toDisplayLabel(group)}</h3>
            <p>{items.slice(0, 2).join(" • ")}</p>
            <ul className="chip-list" role="list">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  );
};

export default SkillsSection;
