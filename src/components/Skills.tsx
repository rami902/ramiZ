import { skillGroups, software } from "../data/skills";
import { languages, training } from "../data/education";
import { useReveal } from "../lib";

export default function Skills() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="skills" className="section section--tight" aria-label="Skills and software">
      <div className="wrap">
        <div ref={ref} className="skills reveal">
          <div className="skills__groups">
            {skillGroups.map((g) => (
              <div key={g.code} className="skills__group">
                <h3><span className="mono">{g.code}</span>{g.title}</h3>
                <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="skills__software">
            <h3 className="mono">Software</h3>
            <ul>{software.map((s) => <li key={s}>{s}</li>)}</ul>
            <h3 className="mono">Courses &amp; training</h3>
            <ul className="plain">{training.map((t) => <li key={t.title}><strong>{t.title}</strong><span>{t.provider}</span></li>)}</ul>
            <h3 className="mono">Languages</h3>
            <ul className="plain">{languages.map((l) => <li key={l.name}><strong>{l.name}</strong><span>{l.level}</span></li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
