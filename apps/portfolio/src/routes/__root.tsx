import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouter,
} from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { Footer, Navigation } from "@/ui/elements";
import indexCss from "@/ui/index.css?url";

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
        href: "/fonts/SpaceMono-Regular.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "",
      },
      {
        rel: "preload",
        href: "/fonts/TWKLausanne-300.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "",
      },
      {
        rel: "preload",
        href: "/fonts/TWKLausanne-750.woff2",
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

function RootDocument({ children }: PropsWithChildren) {
  const router = useRouter();
  const isHome = router.latestLocation.pathname === "/";

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Navigation mode={isHome ? "fixed" : "sticky"} />
        {children}
        {!isHome && <Footer />}
        <Scripts />
      </body>
    </html>
  );
}
