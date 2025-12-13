import type { CollectionConfig } from "payload";

export const MediaDispositions: CollectionConfig = {
  access: {
    read: () => true,
  },
  slug: "mediaDispositions",
  fields: [
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
      required: true,
      admin: {
        isSortable: true,
      },
    },
  ],
};
