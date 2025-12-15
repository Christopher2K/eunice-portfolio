import { sdk } from "@/sdk";
import { sanitizeProject } from "./sanitize-project";

export const getAllProjects = async () => {
  const projects = await sdk.find({
    collection: "projects",
    limit: 99,
  });

  return projects.docs.map((project) => sanitizeProject(project));
};
