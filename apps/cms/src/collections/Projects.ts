import type { Block, CollectionConfig } from "payload";
import { env } from "@/env/server";

const LabelBlock: Block = {
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
      url: ({ data }) => `${env.PORTFOLIO_URL}/work-preview/${data.id}`,
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "labels",
      type: "blocks",
      blocks: [LabelBlock],
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
