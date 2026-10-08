import { profile } from "../data/profile";
import { asset } from "../lib";
import { ArrowRight, Download } from "./Icons";

export default function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <div className="hero__grid" aria-hidden="true">
        <i /><i /><i /><i />
      </div>
      <div className="wrap hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow mono reveal-load" style={{ ["--d" as string]: "0ms" }}>
            <span className="dot" aria-hidden="true" /> {profile.title} <span aria-hidden="true">/</span> {profile.roles.join(" / ")}
          </p>
          <h1 id="hero-name" className="hero__name">
            <span className="line"><span style={{ ["--d" as string]: "80ms" }}>Rami Salam</span></span>
            <span className="line"><span style={{ ["--d" as string]: "190ms" }}><em>Zarifa</em></span></span>
          </h1>
          <p className="hero__tagline reveal-load" style={{ ["--d" as string]: "380ms" }}>{profile.tagline}</p>
          <p className="hero__statement reveal-load" style={{ ["--d" as string]: "460ms" }}>{profile.statement}</p>
          <div className="hero__cta reveal-load" style={{ ["--d" as string]: "560ms" }}>
            <a className="btn btn--solid" href="#work" onClick={(e) => { e.preventDefault(); onNavigate("work"); }}>
              View Selected Work <ArrowRight />
            </a>
            <a className="btn" href={asset(profile.cv)} download="Rami-Salam-Zarifa-CV.pdf">
              Download CV <Download />
            </a>
          </div>
        </div>

        <figure className="hero__portrait reveal-load" style={{ ["--d" as string]: "240ms" }}>
          <div className="hero__frame">
            <img
              src={asset(profile.photo)}
              alt={profile.photoAlt}
              width={800}
              height={1000}
              fetchPriority="high"
              decoding="async"
              className={profile.photoIsPlaceholder ? "is-placeholder" : ""}
            />
            <span className="tick tick--tl" aria-hidden="true" /><span className="tick tick--tr" aria-hidden="true" />
            <span className="tick tick--bl" aria-hidden="true" /><span className="tick tick--br" aria-hidden="true" />
          </div>
          {/* dimension lines in the spirit of the portfolio cover */}
          <svg className="dim dim--top" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 12h400M0 4v16M400 4v16" /><rect x="170" y="2" width="60" height="20" className="dim__gap" />
            <text x="200" y="16" textAnchor="middle">A</text>
          </svg>
          <svg className="dim dim--side" viewBox="0 0 24 500" preserveAspectRatio="none" aria-hidden="true">
            <path d="M12 0v500M4 0h16M4 500h16" /><rect x="2" y="235" width="20" height="30" className="dim__gap" />
            <text x="12" y="254" textAnchor="middle">B</text>
          </svg>
          <figcaption className="hero__cap mono">
            <span>Fig. 00 — Portrait</span>
            <span>Damascus University · 33.51°N 36.28°E</span>
          </figcaption>
        </figure>
      </div>

      <div className="wrap hero__facts reveal-load" style={{ ["--d" as string]: "700ms" }}>
        <dl>
          <div><dt className="mono">Education</dt><dd>B.Arch — Damascus University, 4th year</dd></div>
          <div><dt className="mono">Practice</dt><dd>Shop drawings · Elevations · Quantity take-off</dd></div>
          <div><dt className="mono">Works with</dt><dd>UAE · Saudi Arabia · Remote</dd></div>
          <div><dt className="mono">Tools</dt><dd>AutoCAD · 3ds Max · V-Ray · Adobe</dd></div>
        </dl>
      </div>
    </section>
  );
}
