import type { Block } from "payload";

export const LinkContentBlock: Block = {
  slug: "LinkContent",
  interfaceName: "LinkContentBlock",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "See it live",
    },
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
    {
      name: "layout",
      type: "select",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
        { label: "Center", value: "center" },
      ],
      defaultValue: "center",
      required: true,
    },
  ],
};
