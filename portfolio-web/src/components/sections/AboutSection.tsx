import type { PersonalInfo } from "../../types/portfolio";
import SectionShell from "./SectionShell";

interface AboutSectionProps {
  personal: PersonalInfo;
}

const AboutSection = ({ personal }: AboutSectionProps) => {
  return (
    <SectionShell id="about" title="About Me">
      <article className="glass-card about-card">
        <p className="about-summary">{personal.summary}</p>
      </article>
    </SectionShell>
  );
};

export default AboutSection;
