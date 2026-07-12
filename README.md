# oweneldridge.io

My personal site: selected projects, a bio, and a resume.

Next.js (App Router) with TypeScript, exported as plain static files, so
the whole site is a folder any web server can host. Content lives in the
repo as MDX under `src/content/`; there is no CMS and no database, edits
happen in git. Styling is CSS modules over a small set of design tokens
in `src/app/globals.css`, with light and dark themes and an in-page
toggle. The fonts (Fraunces and Newsreader, both OFL) are vendored under
`src/fonts/`, so a build never phones anyone.

## Working on it

```bash
npm install
npm run dev    # local server on :3000
npm run check  # typecheck, lint, and a full static build to out/
```

## Publishing

Primary hosting is Codeberg Pages: `npm run deploy` runs the checks,
builds, and pushes `out/` to the pages repo (see
`scripts/deploy-pages.sh`). GitHub holds a mirror of this repo, where a
small Actions workflow runs the same checks on pull requests.

## Adding a project

Drop a new `.mdx` file in `src/content/projects/` with the same
frontmatter shape as the existing ones (title, summary, year, tech,
links, order). The index and the project page pick it up at build time.

The resume is data in `src/content/resume.ts`; the page and the
downloadable PDF both render from it.
