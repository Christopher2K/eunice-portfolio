import type { Block } from "payload";

export const ParagraphContentBlock: Block = {
  slug: "ParagraphContent",
  interfaceName: "ParagraphContentBlock",
  fields: [
    {
      name: "title",
      type: "text",
      required: false,
    },
    {
      name: "text",
      type: "richText",
      required: true,
    },
  ],
};
