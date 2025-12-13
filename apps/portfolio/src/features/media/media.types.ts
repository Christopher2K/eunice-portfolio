export type MediaFormat = "16/9" | "4/3" | "3/4" | "2/3" | "1/1";

export type MediaVariant = "image" | "video";

export type Media = {
  id: string;
  variant: MediaVariant;
  format: MediaFormat;
  src: string;
  altText: string;
  title?: string;
};

export type MediaFullWidthPresentation = {
  id: string;
  variant: "FULL_WIDTH";
  media: Media;
};

export type MediaLandscapePresentation = {
  id: string;
  variant: "LANDSCAPE";
  media: Media;
};

export type MediaPortraitPresentation = {
  id: string;
  variant: "PORTRAIT";
  media: Media;
};

export type MediaDualPresentation = {
  id: string;
  variant: "DUAL";
  medium: [Media, Media];
};

export type MediaGridPresentation = {
  id: string;
  variant: "GRID";
  media: Array<Media>;
};

export type MediaPresentation =
  | MediaFullWidthPresentation
  | MediaLandscapePresentation
  | MediaPortraitPresentation
  | MediaDualPresentation
  | MediaGridPresentation;
