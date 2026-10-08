import { profile } from "../data/profile";
import { approach } from "../data/skills";
import { useReveal } from "../lib";
import SectionTitle from "./SectionTitle";

export default function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="section" aria-label="About">
      <div className="wrap">
        <SectionTitle index="02" label="About">
          Precision is a <em>design</em> decision.
        </SectionTitle>
        <div ref={ref} className="about reveal">
          <div className="about__lead">
            <p className="lead">
              I am a fourth-year architecture student at Damascus University with hands-on experience preparing shop drawings,
              interior elevations, quantity take-offs and BOQ-related documentation.
            </p>
            <p>
              I work remotely with companies in the UAE and on projects connected to Saudi Arabia, turning approved designs,
              furniture layouts and renders into clear 2D technical drawings — coordinated with materials, dimensions and quantities.
            </p>
            <p>
              Alongside drafting, I work in 3D modelling and rendering, graphic design and logo design.
            </p>
            <p className="about__avail mono">{profile.availability}</p>
          </div>
          <ol className="about__approach" aria-label="How I work">
            {approach.map((a, i) => (
              <li key={a.title}>
                <span className="mono">0{i + 1}</span>
                <div><h3>{a.title}</h3><p>{a.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
