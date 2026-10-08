import { gmailCompose, mailto, profile } from "../data/profile";
import { asset, useReveal } from "../lib";
import { ArrowUpRight, Download, Linkedin, Mail } from "./Icons";
import SectionTitle from "./SectionTitle";

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="contact" className="section contact" aria-label="Contact">
      <div className="wrap">
        <SectionTitle index="05" label="Contact">
          Let&rsquo;s create something <em>meaningful</em>.
        </SectionTitle>
        <div ref={ref} className="contact__grid reveal">
          <div className="contact__lines">
            <div>
              <p className="mono">Email</p>
              <a className="contact__big" href={mailto()}>{profile.email}</a>
            </div>
            {profile.linkedin && (
              <div>
                <p className="mono">LinkedIn</p>
                <a className="contact__big" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  {profile.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </a>
              </div>
            )}
            {profile.showPhone && profile.phone && (
              <div>
                <p className="mono">Phone</p>
                <a className="contact__big" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
              </div>
            )}
          </div>
          <div className="contact__side">
            <p className="contact__avail">{profile.availability}</p>
            <div className="contact__btns">
              <a className="btn btn--solid" href={mailto()}>Email Me <Mail /></a>
              <a className="btn" href={gmailCompose()} target="_blank" rel="noopener noreferrer">Contact via Gmail <ArrowUpRight /></a>
              {profile.linkedin && (
                <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Linkedin /></a>
              )}
            </div>
            <div className="contact__docs">
              <a href={asset(profile.cv)} download="Rami-Salam-Zarifa-CV.pdf" className="btn btn--line">Download CV <Download /></a>
              <a href={asset(profile.portfolioPdf)} target="_blank" rel="noopener" className="btn btn--line">Full portfolio PDF <Download /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
