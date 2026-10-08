import type { SVGProps } from "react";
const base = (p: SVGProps<SVGSVGElement>) => ({
  width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.5, strokeLinecap: "square" as const, strokeLinejoin: "miter" as const, "aria-hidden": true, focusable: false, ...p,
});
export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M3 12h17M14 6l6 6-6 6" /></svg>);
export const ArrowLeft = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M21 12H4M10 6l-6 6 6 6" /></svg>);
export const ArrowUp = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M12 21V4M6 10l6-6 6 6" /></svg>);
export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M6 18 18 6M8 6h10v10" /></svg>);
export const Download = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M12 3v13M6 11l6 6 6-6M4 21h16" /></svg>);
export const Mail = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M3 5h18v14H3zM3 6l9 7 9-7" /></svg>);
export const Linkedin = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M4 9h4v11H4zM10 9h4v2c.8-1.4 2.2-2.2 3.8-2.2C20 8.8 21 10.3 21 13v7h-4v-6.3c0-1.2-.5-2-1.6-2-1.2 0-1.9.9-1.9 2.1V20h-4z" /><circle cx="6" cy="5" r="1.4" /></svg>);
export const Close = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M5 5l14 14M19 5 5 19" /></svg>);
export const Plus = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M12 4v16M4 12h16" /></svg>);
export const Minus = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M4 12h16" /></svg>);
export const Menu = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M3 8h18M3 16h18" /></svg>);
export const Expand = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>);
