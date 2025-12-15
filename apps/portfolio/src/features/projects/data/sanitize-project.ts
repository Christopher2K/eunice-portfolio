import type { Project } from "@payload-types";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { ConvertLexicalToHTMLArgs } from "node_modules/@payloadcms/richtext-lexical/dist/features/converters/lexicalToHtml/sync";
import { sanitizeMedia } from "@/features/media/data/sanitize-media";
import { sanitizeMediaContent } from "@/features/media/data/sanitize-media-content";
import type { SanitizedMediaContent } from "@/features/media/media.types";
import type { SanitizedProject } from "../projects.types";

export const sanitizeProject = (project: Project): SanitizedProject => {
  return {
    __tag: "SanitizedProject",
    id: project.id,
    name: project.name,
    projectType:
      typeof project.projectType === "object"
        ? project.projectType.name
        : "Project",
    labels: project.labels?.map((label) => {
      const value = label.labelValue[0];

      return {
        name: label.labelName,
        value:
          value.blockType === "Text"
            ? {
                type: "text",
                text: value.text,
              }
            : {
                type: "link",
                text: value.name,
                url: value.url,
              },
      };
    }),
    description: convertLexicalToHTML({
      data: project.description as unknown as ConvertLexicalToHTMLArgs["data"],
    }),
    mainImage:
      typeof project.mainImage !== "number"
        ? sanitizeMedia(project.mainImage)
        : undefined,
    medium: project.medium?.reduce((list, medium) => {
      const sanitizedMediaContent = sanitizeMediaContent(medium);
      if (sanitizedMediaContent) {
        list.push(sanitizedMediaContent);
      }
      return list;
    }, [] as SanitizedMediaContent[]),
  };
};
