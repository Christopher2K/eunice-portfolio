import { createFileRoute } from "@tanstack/react-router";
import { ProjectsDesktopCarousel } from "@/features/home/components/projects-desktop-carousel";
import { ProjectsMobileCarousel } from "@/features/home/components/projects-mobile-carousel";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <>
      <ProjectsMobileCarousel />
      <ProjectsDesktopCarousel />
    </>
  );
}
