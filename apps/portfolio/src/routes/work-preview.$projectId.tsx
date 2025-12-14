import type { Project } from "@payload-types";
import {
  RefreshRouteOnSave,
  useLivePreview,
} from "@payloadcms/live-preview-react";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { env } from "@/env";
import { ProjectView } from "@/features/projects/components/project-view";
import { sdk } from "@/sdk";

export const Route = createFileRoute("/work-preview/$projectId")({
  component: RouteComponent,
  ssr: true,
  loader: async ({ params }) => {
    const project = await sdk.findByID({
      collection: "projects",
      id: params.projectId,
    });

    return project as Omit<Project, "description">;
  },
});

function RouteComponent() {
  const initialData = Route.useLoaderData() as Project;
  const router = useRouter();
  const { data } = useLivePreview({
    initialData,
    serverURL: env.VITE_PAYLOAD_URL,
    depth: 2,
  });

  const reload = () => {
    router.invalidate({ forcePending: true, sync: true });
  };

  return (
    <>
      <RefreshRouteOnSave refresh={reload} serverURL={env.VITE_PAYLOAD_URL} />
      <ProjectView
        name={data.name}
        labels={
          data.labels?.map(({ labelName, labelValue }) => ({
            name: labelName,
            value: labelValue,
          })) ?? []
        }
        description={convertLexicalToHTML({ data: data.description })}
      />
    </>
  );
}
