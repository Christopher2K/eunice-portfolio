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

const MediaContentBlock: Block = {
  slug: "MediaContent",
  interfaceName: "MediaContentBlock",
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
      admin: {
        isSortable: true,
      },
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
      url: ({ data }) => `${env.PORTFOLIO_URL}/work/${data.id}?preview=true`,
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
      name: "medium",
      type: "blocks",
      blocks: [MediaContentBlock],
    },
  ],
};
