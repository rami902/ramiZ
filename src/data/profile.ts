/**
 * PROFILE — the main place to edit your personal details.
 * Facts come from the uploaded CV. Empty strings are hidden by the site.
 */
export const profile = {
  name: "Rami Salam Zarifa",
  firstName: "Rami",
  initials: "RZ",
  /** Title exactly as on the CV. Change to "Architecture Engineer" etc. when it applies. */
  title: "Architecture Student",
  roles: ["Shop Drawing", "Interior Design"],
  tagline:
    "Turning approved interior designs into precise, buildable drawings.",
  statement:
    "Fourth-year architecture student at Damascus University, working remotely with companies in the UAE and on projects connected to Saudi Arabia — preparing clear 2D shop drawings, interior elevations and quantity take-offs.",
  availability:
    "Available for architectural drafting, shop drawing, interior design, and related architectural roles.",

  // ---- CONTACT ------------------------------------------------------------
  email: "zryftramy32@gmail.com",
  /** Paste your full LinkedIn profile URL, e.g. "https://www.linkedin.com/in/your-name". Empty = hidden. */
  linkedin: "",
  /** Phone is on your CV; it is hidden on the website unless you set showPhone to true. */
  phone: "+963 937 942 807",
  showPhone: false,
  residence: "Syria",
  nationality: "Syrian",

  // ---- FILES (all inside /public) ----------------------------------------
  /** Replace public/images/profile.svg with your photo, then set this to e.g. "images/profile.jpg" */
  photo: "images/profile.jpg",
  photoAlt: "Portrait of Rami Salam Zarifa",
  photoIsPlaceholder: false,
  cv: "cv.pdf",
  portfolioPdf: "portfolio.pdf",

  // ---- SEO ----------------------------------------------------------------
  siteTitle: "Rami Salam Zarifa — Architecture Student | Shop Drawing & Interior Design Portfolio",
};

export const mailto = (subject = "Portfolio enquiry") =>
  `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;

export const gmailCompose = (subject = "Portfolio enquiry") =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}`;
