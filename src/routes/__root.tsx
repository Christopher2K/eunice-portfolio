import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import indexCss from "@/ui/index.css?url";
import spaceMonoRegular from "../../public/fonts/SpaceMono-Regular.woff2?url";
import twkLausanne300 from "../../public/fonts/TWKLausanne-300.woff2?url";
import twkLausanne750 from "../../public/fonts/TWKLausanne-750.woff2?url";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "preload",
        href: twkLausanne300,
        as: "font",
        type: "font/woff2",
        crossOrigin: "",
      },
      {
        rel: "preload",
        href: twkLausanne750,
        as: "font",
        type: "font/woff2",
        crossOrigin: "",
      },
      {
        rel: "preload",
        href: spaceMonoRegular,
        as: "font",
        type: "font/woff2",
        crossOrigin: "",
      },
      {
        rel: "stylesheet",
        href: indexCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}

        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
