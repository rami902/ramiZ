import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { getProject } from "./data/projects";
import { useRoute, useScrollState, useTheme } from "./lib";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectPage from "./components/ProjectPage";
import { ArrowUp } from "./components/Icons";

const SECTION_IDS = ["work", "about", "skills", "experience", "education", "contact"];
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  const { slug } = useRoute();
  const project = slug ? getProject(slug) : undefined;
  const { theme, toggle } = useTheme();
  const { progress, scrolled, far, active } = useScrollState(slug ? [] : SECTION_IDS);
  const pending = useRef<string | null>(null);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
  }, []);

  const goTo = useCallback((id: string) => {
    if (slug) { pending.current = id; window.location.hash = "#/"; }
    else scrollToId(id);
  }, [slug, scrollToId]);

  const toTop = useCallback(() => {
    if (slug) { pending.current = "__top"; window.location.hash = "#/"; }
    else window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" });
  }, [slug]);

  const back = useCallback(() => { window.location.hash = "#/"; }, []);

  // restore scroll position when switching between the home page and a project
  useLayoutEffect(() => {
    if (slug) { window.scrollTo(0, 0); return; }
    const p = pending.current;
    pending.current = null;
    if (p === "__top") window.scrollTo(0, 0);
    else if (p) scrollToId(p);
    else window.scrollTo(0, Number(sessionStorage.getItem("homeScroll") || 0));
  }, [slug, scrollToId]);

  // direct visit to the home page with a plain #section hash
  useEffect(() => {
    if (!slug && /^#[a-z]+$/.test(window.location.hash)) scrollToId(window.location.hash.slice(1));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const missing = slug && !project;

  return (
    <>
      <a className="skip" href="#main-content">Skip to content</a>
      <Navbar
        active={active}
        scrolled={scrolled || !!slug}
        progress={progress}
        theme={theme}
        onToggleTheme={toggle}
        onNavigate={goTo}
        onHome={toTop}
      />
      {project ? (
        <ProjectPage key={project.id} project={project} onBack={back} />
      ) : missing ? (
        <main id="main-content" className="notfound wrap">
          <p className="mono">404</p>
          <h1>Project not found</h1>
          <a className="btn btn--solid" href="#/" onClick={(e) => { e.preventDefault(); back(); }}>Back to the portfolio</a>
        </main>
      ) : (
        <main id="main-content">
          <Hero onNavigate={goTo} />
          <Work />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Contact />
        </main>
      )}
      <Footer onTop={toTop} />
      <button
        type="button"
        className={`totop ${far ? "is-on" : ""}`}
        onClick={toTop}
        aria-label="Back to top"
        tabIndex={far ? 0 : -1}
      >
        <ArrowUp />
      </button>
    </>
  );
}
