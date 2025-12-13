import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  orderable: true,
  access: {
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    livePreview: {
      url: "http://localhost:3000/work/preview",
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "client",
      type: "text",
      required: true,
    },
    {
      name: "agency",
      type: "text",
      required: true,
    },
    {
      name: "website",
      type: "text",
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "projectType",
      type: "relationship",
      relationTo: "projectTypes",
      label: "Project Type",
      required: true,
    },
    {
      name: "mainImage",
      label: "Main Image",
      type: "relationship",
      relationTo: "media",
      required: true,
    },
    {
      name: "mediaContent",
      label: "Media Content",
      relationTo: "mediaDispositions",
      type: "relationship",
      hasMany: true,
      required: true,
    },
  ],
};
