import "./App.css";
import AchievementsSection from "./components/sections/AchievementsSection";
import SiteHeader from "./components/layout/SiteHeader";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import EducationSection from "./components/sections/EducationSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import HeroSection from "./components/sections/HeroSection";
import PublicationsSection from "./components/sections/PublicationsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";
import portfolioData from "./data/portfolioData";

const navItems = [
  { id: "about", label: "About Me" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
];

function App() {
  return (
    <div className="app-shell">
      <SiteHeader
        name={portfolioData.personal.name}
        items={navItems}
        resumeUrl={portfolioData.personal.resumeUrl}
      />

      <main className="content-shell">
        <HeroSection personal={portfolioData.personal} />
        <AboutSection personal={portfolioData.personal} />
        <SkillsSection skills={portfolioData.skills} />
        <ExperienceSection experience={portfolioData.experience} />
        <EducationSection education={portfolioData.education} />
        <AchievementsSection
          certifications={portfolioData.certifications}
          awards={portfolioData.awards}
        />
        <ProjectsSection projects={portfolioData.projects} />
        <PublicationsSection publications={portfolioData.publications} />
        <ContactSection personal={portfolioData.personal} />
      </main>
    </div>
  );
}

export default App;
