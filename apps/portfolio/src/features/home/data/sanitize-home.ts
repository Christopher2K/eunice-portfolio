import type { Home } from "@payload-types";
import { sanitizeProject } from "@/features/projects/data/sanitize-project";
import type { SanitizedHome } from "../home.types";

export const sanitizeHome = (home: Home): SanitizedHome => {
  if (!home.projects) return { projects: [] };

  return {
    projects: home.projects.map((item) => {
      if (typeof item.project === "number") {
        throw new Error(
          "Home project reference was not populated, check the depth",
        );
      }

      return {
        project: sanitizeProject(item.project),
        opacity: item.opacity,
      };
    }),
  };
};
