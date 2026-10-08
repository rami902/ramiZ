import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "../data/types";
import { asset } from "../lib";
import { ArrowLeft, ArrowRight, Close, Minus, Plus } from "./Icons";

type Z = { s: number; x: number; y: number };
const MIN = 1, MAX = 6;

export default function Lightbox({ items, index, onClose, onIndex }: {
  items: GalleryItem[]; index: number; onClose: () => void; onIndex: (i: number) => void;
}) {
  const item = items[index];
  const [z, setZ] = useState<Z>({ s: 1, x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const [drag, setDrag] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const ptrs = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ d: number; s: number; sx: number; sy: number; zx: number; zy: number; moved: boolean }>({ d: 0, s: 1, sx: 0, sy: 0, zx: 0, zy: 0, moved: false });

  const clamp = useCallback((n: Z): Z => {
    const st = stage.current, im = img.current;
    const s = Math.min(MAX, Math.max(MIN, n.s));
    if (!st || !im || s === 1) return { s, x: s === 1 ? 0 : n.x, y: s === 1 ? 0 : n.y };
    const mx = Math.max(0, (im.offsetWidth * s - st.clientWidth) / 2);
    const my = Math.max(0, (im.offsetHeight * s - st.clientHeight) / 2);
    return { s, x: Math.min(mx, Math.max(-mx, n.x)), y: Math.min(my, Math.max(-my, n.y)) };
  }, []);

  const go = useCallback((d: number) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);
  const zoomBy = useCallback((f: number) => setZ((p) => clamp({ ...p, s: p.s * f })), [clamp]);

  useEffect(() => { setZ({ s: 1, x: 0, y: 0 }); setLoaded(false); }, [index]);

  // scroll lock, focus management, keyboard
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    document.body.classList.add("no-scroll");
    closeBtn.current?.focus();
    return () => { document.body.classList.remove("no-scroll"); prev?.focus?.(); };
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "+" || e.key === "=") zoomBy(1.4);
      else if (e.key === "-" || e.key === "_") zoomBy(1 / 1.4);
      else if (e.key === "0") setZ({ s: 1, x: 0, y: 0 });
      else if (e.key === "Tab" && dialog.current) {
        const f = Array.from(dialog.current.querySelectorAll<HTMLElement>("button:not([disabled])"));
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose, zoomBy]);

  // preload neighbours
  useEffect(() => {
    [index + 1, index - 1].forEach((i) => {
      const n = items[(i + items.length) % items.length];
      if (n) new Image().src = asset(n.src);
    });
  }, [index, items]);

  const onWheel = (e: React.WheelEvent) => zoomBy(e.deltaY < 0 ? 1.15 : 1 / 1.15);

  const onDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    g.moved = false; g.sx = e.clientX; g.sy = e.clientY; g.zx = z.x; g.zy = z.y; g.s = z.s;
    if (ptrs.current.size === 2) {
      const [a, b] = [...ptrs.current.values()];
      g.d = Math.hypot(a.x - b.x, a.y - b.y);
    }
    setDrag(true);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!ptrs.current.has(e.pointerId)) return;
    ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (ptrs.current.size === 2) {
      const [a, b] = [...ptrs.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (g.d > 0) setZ((p) => clamp({ ...p, s: g.s * (d / g.d) }));
      g.moved = true;
    } else if (z.s > 1) {
      g.moved = true;
      setZ((p) => clamp({ ...p, x: g.zx + (e.clientX - g.sx), y: g.zy + (e.clientY - g.sy) }));
    }
  };
  const onUp = (e: React.PointerEvent) => {
    const g = gesture.current;
    const wasSingle = ptrs.current.size === 1;
    ptrs.current.delete(e.pointerId);
    if (ptrs.current.size === 0) setDrag(false);
    // swipe to navigate while not zoomed
    if (wasSingle && z.s === 1) {
      const dx = e.clientX - g.sx, dy = e.clientY - g.sy;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
    }
  };
  const onDouble = (e: React.MouseEvent) => {
    if (z.s > 1) return setZ({ s: 1, x: 0, y: 0 });
    const st = stage.current!.getBoundingClientRect();
    const s = 2.6;
    const cx = e.clientX - (st.left + st.width / 2), cy = e.clientY - (st.top + st.height / 2);
    setZ(clamp({ s, x: -cx * (s - 1), y: -cy * (s - 1) }));
  };

  return createPortal(
    <div className="lb" role="dialog" aria-modal="true" aria-label={`Image viewer: ${item.caption}`} ref={dialog}>
      <div className="lb__top">
        <span className="mono lb__count" aria-live="polite">{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
        <div className="lb__tools">
          <button type="button" onClick={() => zoomBy(1 / 1.4)} aria-label="Zoom out" disabled={z.s <= MIN}><Minus /></button>
          <button type="button" className="lb__pct mono" onClick={() => setZ({ s: 1, x: 0, y: 0 })} aria-label="Reset zoom">{Math.round(z.s * 100)}%</button>
          <button type="button" onClick={() => zoomBy(1.4)} aria-label="Zoom in" disabled={z.s >= MAX}><Plus /></button>
          <button type="button" ref={closeBtn} onClick={onClose} aria-label="Close viewer"><Close /></button>
        </div>
      </div>

      <div
        className={`lb__stage ${z.s > 1 ? "is-zoomed" : ""} ${drag ? "is-drag" : ""}`}
        ref={stage}
        onWheel={onWheel}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onDoubleClick={onDouble}
        onClick={(e) => {
          // pointer capture retargets clicks to the stage, so test against the image bounds instead
          const r = img.current?.getBoundingClientRect();
          const outside = !r || e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
          if (outside && z.s === 1 && !gesture.current.moved) onClose();
        }}
      >
        <img
          key={item.src}
          ref={img}
          className={`lb__img ${loaded ? "is-loaded" : ""}`}
          src={asset(item.src)}
          alt={item.alt}
          width={item.width}
          height={item.height}
          draggable={false}
          onLoad={() => setLoaded(true)}
          style={{ transform: `translate3d(${z.x}px, ${z.y}px, 0) scale(${z.s})`, backgroundImage: `url(${asset(item.thumb)})` }}
        />
        {!loaded && <span className="lb__loading mono" role="status">Loading…</span>}
      </div>

      <button type="button" className="lb__nav lb__nav--prev" onClick={() => go(-1)} aria-label="Previous image"><ArrowLeft /></button>
      <button type="button" className="lb__nav lb__nav--next" onClick={() => go(1)} aria-label="Next image"><ArrowRight /></button>

      <div className="lb__cap">
        <span className="mono">{item.kind === "render" ? "Render" : "Drawing"}</span>
        <p>{item.caption}</p>
        <span className="mono lb__hint">← → navigate · + − zoom · double-click · Esc</span>
      </div>
    </div>,
    document.body,
  );
}
