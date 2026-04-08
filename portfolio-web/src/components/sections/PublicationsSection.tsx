import SectionShell from "./SectionShell";

interface PublicationsSectionProps {
  publications: string[];
}

const PublicationsSection = ({ publications }: PublicationsSectionProps) => {
  return (
    <SectionShell
      id="publications"
      title="Publications"
      description="Research notes, long-form engineering essays, and technical breakdowns from the lab notebook."
    >
      <div className="publications-stack">
        {publications.length > 0 ? (
          publications.map((publication) => (
            <article key={publication} className="glass-card publication-card">
              <h3>{publication}</h3>
              <p>
                Full publication references and links can be attached here as your technical writing archive grows.
              </p>
            </article>
          ))
        ) : (
          <article className="glass-card publication-card publication-card--empty">
            <h3>Transmission Queue Open</h3>
            <p>
              Publications are being prepared. This section will soon feature deep-dives on backend architecture,
              event pipelines, and agentic AI experiments.
            </p>
          </article>
        )}
      </div>
    </SectionShell>
  );
};

export default PublicationsSection;
