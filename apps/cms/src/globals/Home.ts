import type { GlobalConfig } from "payload";

export const Home: GlobalConfig = {
  slug: "home",
  access: {
    read: () => true,
  },
  admin: {
    group: "Pages",
  },
  fields: [
    {
      name: "projects",
      type: "array",
      label: "Homepage Projects",
      minRows: 1,
      fields: [
        {
          name: "project",
          type: "relationship",
          relationTo: "projects",
          required: true,
        },
        {
          name: "opacity",
          type: "number",
          required: true,
          defaultValue: 0,
          min: 0,
          max: 1,
          admin: {
            step: 0.01,
          },
        },
      ],
    },
  ],
};
