import type { ProjectItem } from "../../types/portfolio";
import SectionShell from "./SectionShell";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <SectionShell
      id="projects"
      title="Projects"
      description="Field-tested builds where AI workflows and backend services converge into tools teams can actually use."
    >
      <div className="projects-grid">
        {projects.map((project) => {
          return (
          <article key={project.name} className="glass-card project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <ul className="chip-list" role="list">
              {project.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <ul className="detail-list" role="list">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
          );
        })}
      </div>
    </SectionShell>
  );
};

export default ProjectsSection;
