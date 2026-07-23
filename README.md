# Online CV — Madelein Jordaan

A personal CV website built with React + Vite, deployed to GitHub Pages.

## Project structure

- `src/data/cv.js` — all CV content (profile, skills, experience, education,
  achievements). Edit this file to update the site's content.
- `src/components/` — one component per section.
- `public/resume/` — the downloadable resume PDF linked from the site.
- `private/source-resumes/` — original source PDFs, **git-ignored**. One of
  them contains personal information (ID number, date of birth, home
  address) and must never be committed or published.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow at
`.github/workflows/deploy.yml` that builds the site and deploys it to
GitHub Pages automatically on every push to `main`.

One-time setup after pushing this repo to GitHub:

1. Push this project to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push to `main` (or re-run the workflow from the **Actions** tab) — the
   site will be published at `https://<username>.github.io/<repo-name>/`
   (or `https://<username>.github.io/` if this is a user/organization page
   repo named `<username>.github.io`).

The build uses a relative asset base (`base: './'` in `vite.config.js`), so
it works correctly whether it's served from a user page or a project page —
no need to edit the config either way.
