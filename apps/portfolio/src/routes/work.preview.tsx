import { ready, subscribe, unsubscribe } from "@payloadcms/live-preview";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { env } from "@/env";
import { ProjectView } from "@/features/projects/components/project-view";

export const useLivePreview = <T extends {}>(): {
  data: T | null;
  isLoading: boolean;
} => {
  const serverURL = env.VITE_PAYLOAD_URL;
  const depth = 1;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasSentReadyMessage = useRef(false);

  const onChange = useCallback((mergedData: T) => {
    setData(mergedData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const subscription = subscribe<object>({
      // @ts-expect-error
      callback: onChange,
      depth,
      initialData: {},
      serverURL,
    });

    if (!hasSentReadyMessage.current) {
      hasSentReadyMessage.current = true;

      ready({
        serverURL,
      });
    }

    return () => {
      unsubscribe(subscription);
    };
  }, [onChange]);

  return {
    data,
    isLoading,
  };
};

export const Route = createFileRoute("/work/preview")({
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  const { data, isLoading } = useLivePreview();
  console.log(data);

  return <ProjectView />;
}
