export type SkillGroup = { code: string; title: string; items: string[] };

/** Only skills and software listed on the CV. */
export const skillGroups: SkillGroup[] = [
  {
    code: "01",
    title: "Documentation",
    items: [
      "2D Shop Drawings",
      "Interior Elevations",
      "Architectural Drafting",
      "Technical Drawings",
      "Working Drawings",
      "Quantity Takeoff",
      "BOQ Support",
    ],
  },
  {
    code: "02",
    title: "Coordination",
    items: ["Furniture Layout Coordination", "Material Specifications", "Dimensions and Measurements"],
  },
  {
    code: "03",
    title: "Visualization",
    items: ["Architectural Visualization", "3D Modeling", "3D Rendering"],
  },
  { code: "04", title: "Graphic", items: ["Graphic Design", "Logo Design"] },
];

export const software = ["AutoCAD", "3ds Max", "V-Ray", "Adobe Photoshop", "Adobe Illustrator"];

/** Short working principles, each restating something stated in the CV. */
export const approach = [
  {
    title: "Drawn from the approved design",
    text: "Elevations are developed from approved designs, furniture layouts and renders — so what is built matches what was agreed.",
  },
  {
    title: "Dimensions and materials, stated",
    text: "Project dimensions, material descriptions and technical requirements are applied to every drawing.",
  },
  {
    title: "Quantities travel with the drawing",
    text: "Quantity take-off and BOQ-related information are prepared together with the drawings they belong to.",
  },
];
