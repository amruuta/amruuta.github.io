export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  github: string;
  leetcode: string;
  medium: string;
  phone: string;
  location: string;
  resumeUrl: string;
  summary: string;
}

export type SkillsMap = Record<string, string[]>;

export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  location: string;
  responsibilities: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  year: string;
  achievements: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

export interface CertificationItem {
  name: string;
  url: string | null;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: SkillsMap;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  awards: string[];
  publications: string[];
}
