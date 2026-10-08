import { education } from "../data/education";
import { useReveal } from "../lib";
import SectionTitle from "./SectionTitle";

export default function Education() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="education" className="section" aria-label="Education">
      <div className="wrap">
        <SectionTitle index="04" label="Education">
          Studied at <em>Damascus</em>.
        </SectionTitle>
        <div ref={ref} className="edu reveal">
          {education.map((e) => (
            <article key={e.institution} className="edu__item">
              <p className="edu__period mono">{e.period}</p>
              <div>
                <h3>{e.institution}</h3>
                <p className="edu__faculty">{e.faculty}</p>
                <p className="edu__degree">{e.degree}</p>
                <p className="edu__note mono">{e.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
