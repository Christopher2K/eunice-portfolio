import { createFileRoute } from "@tanstack/react-router";
import { ProjectView } from "@/features/projects/components/project-view";

export const Route = createFileRoute("/work-preview/$projectId")({
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  return <ProjectView />;
}
