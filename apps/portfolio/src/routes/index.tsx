import { createFileRoute } from "@tanstack/react-router";
import { ProjectsDesktopCarousel } from "@/features/home/components/projects-desktop-carousel";
import { ProjectsMobileCarousel } from "@/features/home/components/projects-mobile-carousel";
import { getAllProjects } from "@/features/projects/data/get-projects";

export const Route = createFileRoute("/")({
  component: App,
  loader: () => getAllProjects(),
});

function App() {
  const projects = Route.useLoaderData();

  return (
    <>
      <ProjectsMobileCarousel projects={projects} />
      <ProjectsDesktopCarousel projects={projects} />
    </>
  );
}
