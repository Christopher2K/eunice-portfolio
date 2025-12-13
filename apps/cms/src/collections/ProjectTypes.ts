import type { CollectionConfig } from "payload";

export const ProjectTypes: CollectionConfig = {
  access: {
    read: () => true,
  },
  slug: "projectTypes",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};
