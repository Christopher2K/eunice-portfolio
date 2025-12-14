import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { ConvertLexicalToHTMLArgs } from "node_modules/@payloadcms/richtext-lexical/dist/features/converters/lexicalToHtml/sync";
import { sanitizeMedia } from "@/features/media/data/sanitize-media";
import { sdk } from "@/sdk";
import type { SanitizedProject } from "../projects.types";

export const getProjectById = async (projectId: string) => {
  const project = await sdk.findByID({
    collection: "projects",
    id: projectId,
  });

  return {
    ...project,
    labels: project.labels?.map((label) => ({
      name: label.labelName,
      value: label.labelValue,
    })),
    description: convertLexicalToHTML({
      data: project.description as unknown as ConvertLexicalToHTMLArgs["data"],
    }),
    mainImage:
      typeof project.mainImage !== "number"
        ? sanitizeMedia(project.mainImage)
        : undefined,
  } satisfies SanitizedProject;
};
