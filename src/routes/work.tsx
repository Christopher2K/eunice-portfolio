import { createFileRoute } from "@tanstack/react-router";
import { Box } from "styled/jsx";
import { ProjectTile } from "@/features/projects/components/project-tile";

const Frames = [
  {
    name: "Wrensilva",
    type: "Website",
    image: "https://picsum.photos/seed/eunice1/1920/1080",
  },
  {
    name: "San Diego Museum of Art",
    type: "Branding",
    image: "https://picsum.photos/seed/eunice2/1920/1080",
  },
  {
    name: "Chicago MOMA",
    type: "Website",
    image: "https://picsum.photos/seed/eunice3/1920/1080",
  },
];

export const Route = createFileRoute("/work")({
  component: RouteComponent,
});

function RouteComponent() {
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
      {Frames.map((frame) => (
        <ProjectTile
          key={frame.name}
          thumbnail={frame.image}
          name={frame.name}
          type={frame.type}
        />
      ))}
    </Box>
  );
}
