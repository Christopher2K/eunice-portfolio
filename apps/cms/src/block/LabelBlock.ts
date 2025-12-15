import type { Block } from "payload";

export const LabelBlock: Block = {
  slug: "Label",
  interfaceName: "LabelBlock",
  fields: [
    {
      name: "labelName",
      type: "text",
      required: true,
    },
    {
      name: "labelValue",
      type: "text",
      required: true,
    },
  ],
};
