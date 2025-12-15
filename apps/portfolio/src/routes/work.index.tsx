import { createFileRoute } from "@tanstack/react-router";
import { Box } from "styled/jsx";
import { ProjectTile } from "@/features/projects/components/project-tile";
import { getAllProjects } from "@/features/projects/data/get-projects";

export const Route = createFileRoute("/work/")({
  component: RouteComponent,
  loader: () => getAllProjects(),
});

function RouteComponent() {
  const projects = Route.useLoaderData();

  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        base: "1fr",
        lg: "repeat(2, 1fr)",
      }}
      gap="10"
      px={{
        base: "5",
        lg: "10",
      }}
      mt={{
        base: "100px",
        lg: "200px",
      }}
      mb={{
        base: "20",
        lg: "160px",
      }}
    >
      {projects.map((project) => (
        <ProjectTile
          key={project.id}
          id={project.id.toString()}
          thumbnail={project.mainImage.url}
          name={project.name}
          type={project.projectType}
        />
      ))}
    </Box>
  );
}
