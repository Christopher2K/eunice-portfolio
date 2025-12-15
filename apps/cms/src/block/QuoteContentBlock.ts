import type { Block } from "payload";

export const QuoteContentBlock: Block = {
  slug: "QuoteContent",
  interfaceName: "QuoteContentBlock",
  fields: [
    {
      name: "author",
      type: "text",
      required: true,
    },
    {
      name: "text",
      type: "richText",
      required: true,
    },
    {
      name: "layout",
      type: "select",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
      ],
      defaultValue: "small",
      required: true,
    },
  ],
};
