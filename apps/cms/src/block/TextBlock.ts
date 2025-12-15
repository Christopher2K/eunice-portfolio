import type { Block } from "payload";

export const TextBlock: Block = {
  slug: "Text",
  interfaceName: "TextBlock",
  fields: [
    {
      name: "text",
      type: "text",
      required: true,
    },
  ],
};
