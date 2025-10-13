import { createFileRoute } from "@tanstack/react-router";
import { Carousel } from "@/features/home/components/carousel";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return <Carousel />;
}
