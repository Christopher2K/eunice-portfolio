import { useEffect, useRef, useState } from "react";
import { css } from "styled/css";
import { styled } from "styled/jsx";
import type { SanitizedMedia } from "../media.types";

const useInView = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
};

type LazyVideoProps = {
  media: SanitizedMedia;
  className: string;
};

const LazyVideo = ({ media, className }: LazyVideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ref, isInView } = useInView();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <styled.video
      ref={(node) => {
        videoRef.current = node;
        ref.current = node;
      }}
      className={className}
      src={media.url}
      poster={media.thumbnailURL ?? undefined}
      aria-label={media.alt}
      muted
      playsInline
      loop
      preload="none"
    />
  );
};

export type MediaItemProps = {
  media: SanitizedMedia;
  aspectRatio?: string;
  objectFit?: "contain" | "cover";
  loading?: "lazy" | "eager";
  pointerEvents?: "none";
};

export const MediaItem = ({
  media,
  aspectRatio = media.ratio,
  objectFit,
  loading,
  pointerEvents,
}: MediaItemProps) => {
  const className = css({
    width: "100%",
    aspectRatio,
    objectFit,
    pointerEvents,
  });
  const isVideo = media.mimeType?.startsWith("video/");

  if (isVideo) {
    return <LazyVideo media={media} className={className} />;
  }

  return (
    <styled.img
      className={className}
      src={media.url}
      alt={media.alt}
      loading={loading}
      decoding={loading === "lazy" ? "async" : undefined}
    />
  );
};
