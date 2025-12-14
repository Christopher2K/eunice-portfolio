import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "name",
  },
  access: {
    create: ({ req }) => {
      return Boolean(req.user);
    },
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "ratio",
      type: "select",
      required: true,
      options: [
        { label: "1:1", value: "1/1" },
        { label: "4:3", value: "2/3" },
        { label: "4:3", value: "3/4" },
        { label: "4:3", value: "4/3" },
        { label: "16:9", value: "16/9" },
      ],
    },
    {
      name: "caption",
      type: "text",
      required: false,
    },
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    mimeTypes: ["image/*", "video/*"],
  },
};
