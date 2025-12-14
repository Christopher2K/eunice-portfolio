import {
  RefreshRouteOnSave,
  useLivePreview,
} from "@payloadcms/live-preview-react";
import {
  createFileRoute,
  useLoaderData,
  useRouter,
} from "@tanstack/react-router";
import { env } from "@/env";
import { ProjectView } from "@/features/projects/components/project-view";
import { sdk } from "@/sdk";

export const Route = createFileRoute("/work-preview/$projectId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const project = await sdk.findByID({
      collection: "projects",
      id: params.projectId,
    });

    return project;
  },
  ssr: false,
});

function RouteComponent() {
  const initialData = Route.useLoaderData();
  const router = useRouter();
  const { data } = useLivePreview({
    initialData,
    serverURL: env.VITE_PAYLOAD_URL,
    depth: 2,
  });

  console.log("data", data);

  const reload = () => {
    router.invalidate({ forcePending: true, sync: true });
  };

  return (
    <>
      <RefreshRouteOnSave refresh={reload} serverURL={env.VITE_PAYLOAD_URL} />
      <ProjectView />
    </>
  );
}
