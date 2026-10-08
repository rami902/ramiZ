import { projects } from "../data/projects";
import type { Project } from "../data/types";
import { asset, useReveal } from "../lib";
import SectionTitle from "./SectionTitle";
import { ArrowRight } from "./Icons";

export const openProject = (slug: string) => {
  sessionStorage.setItem("homeScroll", String(window.scrollY));
  window.location.hash = `#/work/${slug}`;
};

export function Meta({ project, compact = false }: { project: Project; compact?: boolean }) {
  const rows: [string, string][] = [
    ["Location", [project.location, project.year].filter(Boolean).join(" — ")],
    ["Type", project.category],
    ["Role", project.role],
  ];
  return (
    <dl className={`meta ${compact ? "meta--compact" : ""}`}>
      {rows.filter(([, v]) => v).map(([k, v]) => (
        <div key={k}><dt className="mono">{k}</dt><dd>{v}</dd></div>
      ))}
    </dl>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useReveal<HTMLElement>();
  const sheets = project.gallery.filter((g) => g.kind === "drawing").slice(0, 3);
  const href = `#/work/${project.slug}`;
  const go = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    openProject(project.slug);
  };
  return (
    <article ref={ref} className={`project reveal ${index % 2 ? "project--flip" : ""}`} aria-labelledby={`${project.id}-title`}>
      <header className="project__head mono">
        <span>Project {project.number}</span>
        <span className="rule" aria-hidden="true" />
        <span>{project.gallery.length} images</span>
      </header>
      <div className="project__grid">
        <div className="project__media">
          <a href={href} onClick={go} className={`project__cover fit-${project.coverFit ?? "cover"}`} aria-label={`View project: ${project.title}`}>
            <img
              src={asset(project.coverImage)}
              alt={project.coverAlt}
              width={project.coverWidth}
              height={project.coverHeight}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 900px) 62vw, 100vw"
            />
            <span className="project__view mono">View <ArrowRight width={14} height={14} /></span>
          </a>
          <ul className="project__strip" aria-label="Sheets from this project">
            {sheets.map((s) => (
              <li key={s.src}>
                <img src={asset(s.thumb)} alt="" width={s.thumbWidth} height={s.thumbHeight} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
        <div className="project__info">
          <h3 id={`${project.id}-title`} className="project__title">
            <a href={href} onClick={go}>{project.title}</a>
          </h3>
          <Meta project={project} />
          <p className="project__summary">{project.summary}</p>
          <ul className="tags">
            {project.scope.slice(0, 4).map((s) => <li key={s} className="mono">{s}</li>)}
          </ul>
          <a className="btn btn--line" href={href} onClick={go}>View Project <ArrowRight /></a>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="section" aria-label="Selected work">
      <div className="wrap">
        <SectionTitle index="01" label="Selected Work">
          Drawings that <em>carry</em> the design to site.
        </SectionTitle>
        <p className="lede">
          Three sets from the portfolio — interior elevations, plans and details, each paired with the render it was drawn from.
        </p>
        <div className="projects">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
