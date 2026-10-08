# Rami Salam Zarifa — Portfolio

A fully static portfolio (React + Vite + TypeScript, no backend) built from the uploaded CV and the 34-page shop-drawing portfolio. It deploys to GitHub Pages with the included workflow.

## 1. Install, run, build

```bash
npm install
npm run dev       # local dev server → http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

Requires Node 20+ (Node 22 recommended).

## 2. Deploy to GitHub Pages

1. Create a GitHub repository and push this folder to the `main` branch.
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. `.github/workflows/deploy.yml` runs `npm ci && npm run build` and publishes `dist/`.
4. The site appears at `https://<user>.github.io/<repo>/` (or `https://<user>.github.io/` if the repo is named `<user>.github.io`).

Asset paths are relative (`base: "./"`) and navigation uses hash routes (`#/work/<slug>`), so it works under any sub-path with no server rewrites. `public/404.html` is a friendly fallback.

## 3. Where to change things

| What | Where |
|---|---|
| **Profile photo** | Put your photo in `public/images/` (e.g. `profile.jpg`, portrait ≈ 4:5). In `src/data/profile.ts` set `photo: "images/profile.jpg"` and `photoIsPlaceholder: false`. The current `profile.svg` is a labelled placeholder. |
| **Email** | `src/data/profile.ts` → `email`. The *Email me* (`mailto:`) and *Contact via Gmail* (compose URL) buttons both use it. Currently taken from your CV. |
| **LinkedIn** | `src/data/profile.ts` → `linkedin` (full URL). Your CV had none, so it is empty and every LinkedIn button/link is hidden until you set it. |
| **Phone** | `profile.phone`; shown only if `showPhone: true`. |
| **CV PDF** | Replace `public/cv.pdf` (same filename). The one included was generated from your CV text. |
| **Full portfolio PDF** | Replace `public/portfolio.pdf`. (It is 27 MB; delete it and the `portfolioPdf` field if you don't want it hosted.) |
| **Projects & images** | `src/data/projects.ts`. Images live in `public/projects/<slug>/`. To add a project, copy an object, add a folder of images, fill the fields. Empty `year` / `location` are hidden automatically. |
| **Experience / Education / Skills** | `src/data/experience.ts`, `education.ts`, `skills.ts` (all from the CV). |
| **Colours & fonts** | CSS variables at the top of `src/index.css` (`:root` = light, `[data-theme="dark"]` = dark). |

## 4. SEO

- Title, description and Open Graph tags are in `index.html`; the site title is also in `profile.siteTitle`.
- After you know your public URL, replace the 4 `SITE_URL` placeholders in `index.html` (canonical, `og:url`, `og:image`) with e.g. `rami.github.io/portfolio`.
- The social preview image is `public/og.jpg` (1200×630).

## 5. Notes on content

- Nothing was invented: facts come from the CV and the sheets' title blocks. The CV lists no LinkedIn, awards or certifications beyond the two courses shown.
- Client names printed in the drawing title blocks are **not** typed into the site, but they are visible inside the full-size sheet images and in `portfolio.pdf`. Check you are allowed to publish those sheets (employer/client permission), and blur the title blocks if needed.
- The render photos are the reference images placed on the sheets; they are labelled "render reference", not presented as your own visualisations.

## Structure

```
public/            cv.pdf, portfolio.pdf, og.jpg, favicon.svg, images/, projects/<slug>/
src/data/          profile, projects, experience, education, skills (all editable content)
src/components/    Navbar, Hero, Work, ProjectPage, ProjectGallery, Lightbox, About, Experience, Education, Skills, Contact, Footer, ThemeToggle
src/index.css      design system (light + dark)
.github/workflows/deploy.yml
```
