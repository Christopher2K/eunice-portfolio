import type { Block } from "payload";

export const LinkBlock: Block = {
  slug: "Link",
  interfaceName: "LinkBlock",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "url",
      type: "text",
      required: true,
    },
  ],
};
