
export interface Project {
  id: string | number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string;
  metrics?: string[];
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}
