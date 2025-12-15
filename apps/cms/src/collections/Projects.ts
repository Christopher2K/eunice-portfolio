import type { Media, Project } from "@payload-types";
import type { CollectionConfig, JSONField } from "payload";
import { LinkContentBlock } from "@/block/LinkContentBlock";
import { QuoteContentBlock } from "@/block/QuoteContentBlock";
import { env } from "@/env/server";
import { LabelBlock } from "../block/LabelBlock";
import { MediaContentBlock } from "../block/MediaContentBlock";

const SiblingProjectJSONSchema: JSONField["typescriptSchema"] = [
  () => ({
    oneOf: [
      { type: "null" },
      {
        type: "object",
        additionalProperties: false,
        properties: {
          id: { type: "number", required: true },
          name: { type: "string", required: true },
          mainImage: {
            $ref: "#/definitions/media",
            required: true,
          },
        },
      },
    ],
  }),
];

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
      name: "content",
      type: "blocks",
      blocks: [MediaContentBlock, QuoteContentBlock, LinkContentBlock],
    },
    {
      name: "previousProject",
      type: "json",
      virtual: true,
      hidden: true,
      typescriptSchema: SiblingProjectJSONSchema,
      hooks: {
        afterRead: [
          async ({ data, req: { payload } }) => {
            const result = await payload.find({
              collection: "projects",
              where: {
                _order: {
                  less_than: (data as Project)._order,
                },
              },
              sort: "_order",
              limit: 1,
              pagination: false,
              depth: 1,
              select: {
                id: true,
                name: true,
                mainImage: true,
              },
            });

            const nextProject = result.docs[0] as Project | undefined;

            if (nextProject) {
              return {
                id: nextProject.id,
                name: nextProject.name,
                mainImage: nextProject.mainImage as Media,
              };
            }
            return null;
          },
        ],
      },
    },
    {
      name: "nextProject",
      type: "json",
      virtual: true,
      hidden: true,
      typescriptSchema: SiblingProjectJSONSchema,
      hooks: {
        afterRead: [
          async ({ data, req: { payload } }) => {
            const result = await payload.find({
              collection: "projects",
              where: {
                _order: {
                  greater_than: (data as Project)._order,
                },
              },
              sort: "_order",
              limit: 1,
              pagination: false,
              depth: 1,
              select: {
                id: true,
                name: true,
                mainImage: true,
              },
            });

            const nextProject = result.docs[0] as Project | undefined;

            if (nextProject) {
              return {
                id: nextProject.id,
                name: nextProject.name,
                mainImage: nextProject.mainImage as Media,
              };
            }
            return null;
          },
        ],
      },
    },
  ],
};
