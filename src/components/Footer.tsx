import { gmailCompose, mailto, profile } from "../data/profile";
import { ArrowUp } from "./Icons";

export default function Footer({ onTop }: { onTop: () => void }) {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div>
          <p className="footer__name">© {new Date().getFullYear()} {profile.name}</p>
          <p className="mono">Architecture • Shop Drawing • Interior Design</p>
        </div>
        <ul className="footer__links mono">
          {profile.linkedin && <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>}
          <li><a href={mailto()}>Email</a></li>
          <li><a href={gmailCompose()} target="_blank" rel="noopener noreferrer">Gmail</a></li>
        </ul>
        <p className="footer__coord mono" aria-hidden="true">+ 33.5138° N / 36.2765° E</p>
        <button type="button" className="footer__top mono" onClick={onTop}>Top <ArrowUp width={14} height={14} /></button>
      </div>
    </footer>
  );
}
