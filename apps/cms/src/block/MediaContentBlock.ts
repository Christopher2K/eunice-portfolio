import type { Block } from "payload";

export const MediaContentBlock: Block = {
  slug: "MediaContent",
  interfaceName: "MediaContentBlock",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Full width", value: "fullWidth" },
        { label: "Landscape", value: "landscape" },
        { label: "Dual", value: "dual" },
        { label: "Grid", value: "grid" },
      ],
    },
    {
      name: "mediaList",
      label: "Media List",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
      admin: {
        isSortable: true,
      },
    },
  ],
};
