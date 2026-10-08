export type GalleryItem = {
  /** "render" = visualisation image, "drawing" = full shop-drawing sheet */
  kind: "render" | "drawing";
  /** path relative to /public, e.g. "projects/vu-riyadh/render-01.webp" */
  src: string;
  thumb: string;
  width: number;
  height: number;
  thumbWidth: number;
  thumbHeight: number;
  alt: string;
  caption: string;
};

export type Project = {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  /** leave "" if unknown – the site hides empty fields */
  location: string;
  year: string;
  role: string;
  summary: string;
  description: string[];
  scope: string[];
  /** Facts taken from the drawing title blocks */
  technical: { label: string; value: string }[];
  coverImage: string;
  coverAlt: string;
  /** "cover" crops to fill the frame (renders), "contain" shows a whole drawing sheet */
  coverFit?: "cover" | "contain";
  coverWidth: number;
  coverHeight: number;
  gallery: GalleryItem[];
};
