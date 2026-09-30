import type { SanitizedProject } from "@/features/projects/projects.types";

export type HomeProject = {
  project: SanitizedProject;
  opacity: number;
};

export type SanitizedHome = {
  projects: HomeProject[];
};
