import { createFileRoute } from "@tanstack/react-router";
import { ProjectView } from "@/features/projects/components/project-view";

export const Route = createFileRoute("/work/$projectId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProjectView />;
}
