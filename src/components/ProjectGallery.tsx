import { useMemo, useState } from "react";
import type { GalleryItem } from "../data/types";
import { asset } from "../lib";
import Lightbox from "./Lightbox";
import { Expand } from "./Icons";

type Filter = "all" | "render" | "drawing";

function Tile({ item, onOpen, n }: { item: GalleryItem; onOpen: () => void; n: number }) {
  return (
    <figure className={`tile tile--${item.kind}`}>
      <button type="button" onClick={onOpen} aria-label={`Open full size: ${item.caption}`}>
        <span className="tile__frame" style={{ aspectRatio: `${item.thumbWidth} / ${item.thumbHeight}` }}>
          <img src={asset(item.thumb)} alt={item.alt} width={item.thumbWidth} height={item.thumbHeight} loading="lazy" decoding="async" />
          <span className="tile__zoom" aria-hidden="true"><Expand width={16} height={16} /></span>
        </span>
      </button>
      <figcaption className="mono"><span>{String(n).padStart(2, "0")}</span>{item.caption}</figcaption>
    </figure>
  );
}

export default function ProjectGallery({ gallery }: { gallery: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);
  const renders = useMemo(() => gallery.filter((g) => g.kind === "render"), [gallery]);
  const drawings = useMemo(() => gallery.filter((g) => g.kind === "drawing"), [gallery]);
  // the lightbox walks through exactly what is visible
  const visible = useMemo(
    () => (filter === "render" ? renders : filter === "drawing" ? drawings : [...renders, ...drawings]),
    [filter, renders, drawings],
  );
  const idx = (it: GalleryItem) => visible.indexOf(it);
  const filters: { id: Filter; label: string; n: number }[] = [
    { id: "all", label: "All", n: gallery.length },
    ...(renders.length ? [{ id: "render" as const, label: "Renders", n: renders.length }] : []),
    ...(drawings.length ? [{ id: "drawing" as const, label: "Drawings", n: drawings.length }] : []),
  ];

  return (
    <div className="gallery">
      <div className="gallery__bar">
        <div role="group" aria-label="Filter images" className="filters">
          {filters.map((f) => (
            <button key={f.id} type="button" className={filter === f.id ? "is-on" : ""} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label} <span className="mono">{f.n}</span>
            </button>
          ))}
        </div>
        <p className="mono gallery__hint">Select any image to view full size and zoom</p>
      </div>

      {filter !== "drawing" && renders.length > 0 && (
        <section aria-label="Renders" className="gallery__block">
          <h3 className="gallery__h mono">Renders <span>{renders.length}</span></h3>
          <div className="masonry">
            {renders.map((it) => <Tile key={it.src} item={it} n={renders.indexOf(it) + 1} onOpen={() => setOpen(idx(it))} />)}
          </div>
        </section>
      )}
      {filter !== "render" && drawings.length > 0 && (
        <section aria-label="Drawings" className="gallery__block">
          <h3 className="gallery__h mono">Drawings <span>{drawings.length}</span></h3>
          <div className="sheets">
            {drawings.map((it) => <Tile key={it.src} item={it} n={drawings.indexOf(it) + 1} onOpen={() => setOpen(idx(it))} />)}
          </div>
        </section>
      )}

      {open !== null && <Lightbox items={visible} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </div>
  );
}
