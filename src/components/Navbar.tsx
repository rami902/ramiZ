import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import ThemeToggle from "./ThemeToggle";
import { Close, Menu } from "./Icons";
import type { Theme } from "../lib";

export const NAV = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

type Props = {
  active: string;
  scrolled: boolean;
  progress: number;
  theme: Theme;
  onToggleTheme: () => void;
  onNavigate: (id: string) => void;
  onHome: () => void;
};

export default function Navbar({ active, scrolled, progress, theme, onToggleTheme, onNavigate, onHome }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };
  const activeNav = active === "skills" ? "about" : active === "education" ? "experience" : active;

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className="wrap nav__bar">
        <a
          href="#/"
          className="nav__logo"
          onClick={(e) => { e.preventDefault(); setOpen(false); onHome(); }}
          aria-label={`${profile.name} — back to top`}
        >
          <span className="nav__mark" aria-hidden="true">{profile.initials}</span>
          <span className="nav__name">{profile.name}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={activeNav === n.id ? "is-active" : ""}
              aria-current={activeNav === n.id ? "true" : undefined}
              onClick={(e) => { e.preventDefault(); go(n.id); }}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`menu ${open ? "is-open" : ""}`} hidden={!open && undefined}>
        <nav className="wrap menu__inner" aria-label="Mobile">
          {NAV.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); go(n.id); }} tabIndex={open ? 0 : -1}>
              <span className="mono">0{i + 1}</span>
              {n.label}
            </a>
          ))}
          <div className="menu__foot mono">{profile.email}</div>
        </nav>
      </div>
    </header>
  );
}
