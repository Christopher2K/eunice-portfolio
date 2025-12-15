import type { CollectionConfig } from "payload";
import { env } from "@/env/server";
import { LabelBlock } from "../block/LabelBlock";
import { MediaContentBlock } from "../block/MediaContentBlock";

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
