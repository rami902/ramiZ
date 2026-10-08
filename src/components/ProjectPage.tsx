import { useEffect } from "react";
import { projects } from "../data/projects";
import type { Project } from "../data/types";
import { asset, useReveal } from "../lib";
import { ArrowLeft, ArrowRight } from "./Icons";
import { Meta } from "./Work";
import ProjectGallery from "./ProjectGallery";

export default function ProjectPage({ project, onBack }: { project: Project; onBack: () => void }) {
  const i = projects.findIndex((p) => p.id === project.id);
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const bodyRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    document.title = `${project.title} — Rami Salam Zarifa`;
    return () => { document.title = "Rami Salam Zarifa — Architecture Student | Shop Drawing & Interior Design Portfolio"; };
  }, [project]);

  return (
    <main id="main-content" className="pp">
      <div className="wrap">
        <a className="pp__back mono" href="#/" onClick={(e) => { e.preventDefault(); onBack(); }}>
          <ArrowLeft width={14} height={14} /> All work
        </a>
        <header className="pp__head">
          <p className="mono pp__num">Project {project.number} <span aria-hidden="true">/</span> {String(projects.length).padStart(2, "0")}</p>
          <h1>{project.title}</h1>
        </header>
      </div>

      <figure className={`pp__hero fit-${project.coverFit ?? "cover"}`}>
        <img src={asset(project.coverImage)} alt={project.coverAlt} width={project.coverWidth} height={project.coverHeight} fetchPriority="high" decoding="async" />
      </figure>

      <div className="wrap">
        <div ref={bodyRef} className="pp__body reveal">
          <Meta project={project} compact />
          <div className="pp__text">
            {project.description.map((d, k) => <p key={k} className={k === 0 ? "lead" : ""}>{d}</p>)}
          </div>
          <aside className="pp__aside" aria-label="Scope and technical information">
            <h2 className="mono">Scope</h2>
            <ul>{project.scope.map((s) => <li key={s}>{s}</li>)}</ul>
            <h2 className="mono">Technical</h2>
            <dl>
              {project.technical.map((t) => <div key={t.label}><dt>{t.label}</dt><dd>{t.value}</dd></div>)}
            </dl>
          </aside>
        </div>

        <ProjectGallery gallery={project.gallery} />

        <nav className="pp__next" aria-label="More projects">
          <a href={`#/work/${prev.slug}`} className="pp__next-a pp__next-a--prev">
            <span className="mono"><ArrowLeft width={14} height={14} /> Previous</span>
            <strong>{prev.title}</strong>
          </a>
          <a href={`#/work/${next.slug}`} className="pp__next-a pp__next-a--next">
            <span className="mono">Next <ArrowRight width={14} height={14} /></span>
            <strong>{next.title}</strong>
          </a>
        </nav>
      </div>
    </main>
  );
}
