import type { Block } from "payload";
import { LinkBlock } from "./LinkBlock";
import { TextBlock } from "./TextBlock";

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
      type: "blocks",
      minRows: 1,
      maxRows: 1,
      blocks: [TextBlock, LinkBlock],
      required: true,
    },
  ],
};
