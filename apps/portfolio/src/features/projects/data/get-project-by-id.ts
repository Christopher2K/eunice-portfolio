import { sdk } from "@/sdk";
import { sanitizeProject } from "./sanitize-project";

export const getProjectById = async (projectId: string) => {
  const project = await sdk.findByID({
    collection: "projects",
    id: projectId,
  });

  return sanitizeProject(project);
};
