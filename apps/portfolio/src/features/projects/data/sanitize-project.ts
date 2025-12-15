import type { Project } from "@payload-types";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { ConvertLexicalToHTMLArgs } from "node_modules/@payloadcms/richtext-lexical/dist/features/converters/lexicalToHtml/sync";
import { sanitizeMedia } from "@/features/media/data/sanitize-media";
import { sanitizeMediaContent } from "@/features/media/data/sanitize-media-content";
import type { SanitizedContent, SanitizedProject } from "../projects.types";

type ProjectContent = Exclude<Project["content"], null | undefined>[number];

export const sanitizeContent = (content: ProjectContent): SanitizedContent => {
  switch (content.blockType) {
    case "MediaContent":
      return sanitizeMediaContent(content);
    case "QuoteContent":
      return {
        __tag: "SanitizedQuoteContent",
        author: content.author,
        text: convertLexicalToHTML({
          data: content.text,
        }),
        layout: content.layout,
      };
    case "LinkContent":
      return {
        __tag: "SanitizedLinkContent",
        title: content.title,
        name: content.name,
        url: content.url,
        layout: content.layout,
      };
  }
};

export const sanitizeProject = (project: Project): SanitizedProject => {
  if (typeof project.mainImage === "number")
    throw new Error("Project has no main image, check the depth");

  if (typeof project.projectType === "number")
    throw new Error("Project has no type, check the depth");

  return {
    __tag: "SanitizedProject",
    id: project.id,
    name: project.name,
    projectType: project.projectType.name,
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
    mainImage: sanitizeMedia(project.mainImage),
    content: project.content?.map((content) => sanitizeContent(content)) ?? [],
  };
};
