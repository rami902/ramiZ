export type Experience = {
  company: string;
  place: string;
  position: string;
  mode: string;
  period: string;
  current: boolean;
  responsibilities: string[];
};

/** From the CV, newest start date first. Add `achievements` later if you have measurable results. */
export const experience: Experience[] = [
  {
    company: "Symmetric",
    place: "UAE",
    position: "Shop Drawing",
    mode: "Remote / Online",
    period: "April 2026 — Present",
    current: true,
    responsibilities: [
      "Prepare 2D shop drawings and interior elevations based on approved designs.",
      "Develop technical drawings with accurate dimensions and material information.",
      "Coordinate drawing details with furniture layouts and project requirements.",
      "Support the preparation and organization of technical documentation for interior projects.",
    ],
  },
  {
    company: "Sada",
    place: "UAE",
    position: "Shop Drawing",
    mode: "Remote / Online",
    period: "April 2026 — Present",
    current: true,
    responsibilities: [
      "Prepare 2D shop drawings and interior elevations.",
      "Develop technical drawings based on approved designs and project information.",
      "Assist with quantity takeoff and project documentation.",
      "Coordinate furniture, materials, dimensions, and other technical drawing information.",
    ],
  },
  {
    company: "VU",
    place: "Saudi Arabia",
    position: "Shop Drawing / Quantity Takeoff",
    mode: "",
    period: "February 2026 — May 2026",
    current: false,
    responsibilities: [
      "Prepared shop drawings and interior elevations.",
      "Assisted with quantity takeoff and project documentation.",
      "Worked with architectural and interior design information to develop technical drawings.",
      "Applied project dimensions and material information to drawing documentation.",
    ],
  },
  {
    company: "DO Group",
    place: "",
    position: "Shop Drawing",
    mode: "",
    period: "October 2025 — 6 June 2026",
    current: false,
    responsibilities: [
      "Prepared 2D shop drawings and interior elevations.",
      "Developed detailed elevations based on approved furniture layouts, renders, and project documentation.",
      "Prepared quantities and incorporated furniture information into BOQ-related documentation.",
      "Applied project dimensions, material descriptions, and technical requirements to drawings.",
      "Prepared drawing layouts and organized technical information for project documentation.",
    ],
  },
];
