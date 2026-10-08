import type { ReactNode } from "react";
import { useReveal } from "../lib";

export default function SectionTitle({ index, label, children }: { index: string; label: string; children: ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="section-title reveal">
      <div className="section-title__meta mono">
        <span>{index}</span>
        <span className="section-title__rule" aria-hidden="true" />
        <span>{label}</span>
      </div>
      <h2>{children}</h2>
    </div>
  );
}
