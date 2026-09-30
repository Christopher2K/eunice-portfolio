import { createFileRoute } from "@tanstack/react-router";
import { ProjectsDesktopCarousel } from "@/features/home/components/projects-desktop-carousel";
import { ProjectsMobileCarousel } from "@/features/home/components/projects-mobile-carousel";
import { getHome } from "@/features/home/data/get-home";

export const Route = createFileRoute("/")({
  component: App,
  loader: () => getHome(),
});

function App() {
  const home = Route.useLoaderData();

  return (
    <>
      <ProjectsMobileCarousel projects={home.projects} />
      <ProjectsDesktopCarousel projects={home.projects} />
    </>
  );
}
