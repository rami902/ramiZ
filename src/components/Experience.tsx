import { experience } from "../data/experience";
import { useReveal } from "../lib";
import SectionTitle from "./SectionTitle";

function Row({ e, i }: { e: (typeof experience)[number]; i: number }) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li ref={ref} className="xp reveal" style={{ ["--i" as string]: i }}>
      <div className="xp__when mono">
        <span>{e.period}</span>
        {e.current && <b className="xp__now">Current</b>}
      </div>
      <div className="xp__what">
        <h3>{e.company}{e.place && <span>, {e.place}</span>}</h3>
        <p className="xp__role">{e.position}{e.mode && <> <span className="mono">· {e.mode}</span></>}</p>
        <ul>{e.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section" aria-label="Experience">
      <div className="wrap">
        <SectionTitle index="03" label="Experience">
          Practice, <em>2025 — now</em>.
        </SectionTitle>
        <ol className="xps">
          {experience.map((e, i) => <Row key={e.company + e.period} e={e} i={i} />)}
        </ol>
      </div>
    </section>
  );
}
