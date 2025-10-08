import { createFileRoute } from "@tanstack/react-router";
import { css } from "styled/css";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return <div className={css({ backgroundColor: "green.400" })}>Hello</div>;
}
