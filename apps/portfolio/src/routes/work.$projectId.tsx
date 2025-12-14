import type { Project } from "@payload-types";
import {
  RefreshRouteOnSave,
  useLivePreview,
} from "@payloadcms/live-preview-react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Fragment, useCallback, useMemo } from "react";
import { env } from "@/env";
import { ProjectView } from "@/features/projects/components/project-view";
import { getProjectById } from "@/features/projects/data/get-project-by-id";
import { sanitizeProject } from "@/features/projects/data/sanitize-project";
import {
  isSatitizedProject,
  type SanitizedProject,
} from "@/features/projects/projects.types";

type WorkSearchParams = {
  preview?: boolean;
};

export const Route = createFileRoute("/work/$projectId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const project = getProjectById(params.projectId);
    return project;
  },
  validateSearch: (searchParams: Record<string, unknown>): WorkSearchParams => {
    return {
      preview: "preview" in searchParams,
    };
  },
});

function RouteComponent() {
  const project = Route.useLoaderData();
  const { preview } = Route.useSearch();

  if (preview) {
    return <PreviewProjectView initialProject={project} />;
  }

  return <ProjectView project={project} />;
}

type RouteViewProps = {
  initialProject: SanitizedProject;
};

function PreviewProjectView({ initialProject }: RouteViewProps) {
  const router = useRouter();
  const { data: unsanitizedProject } = useLivePreview<
    Project | SanitizedProject
  >({
    initialData: initialProject,
    serverURL: env.VITE_PAYLOAD_URL,
    depth: 2,
  });

  const project = useMemo(() => {
    if (isSatitizedProject(unsanitizedProject)) {
      return unsanitizedProject;
    }

    return sanitizeProject(unsanitizedProject);
  }, [unsanitizedProject]);

  const reload = useCallback(() => {
    router.invalidate({ forcePending: true, sync: true });
  }, [router]);

  return (
    <Fragment>
      <RefreshRouteOnSave refresh={reload} serverURL={env.VITE_PAYLOAD_URL} />
      <ProjectView project={project} />
    </Fragment>
  );
}
