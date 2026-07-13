# oweneldridge.io

My personal site: selected projects, a bio, and a resume.

Next.js (App Router) with TypeScript. Content lives in the repo as MDX
under `src/content/`; there is no CMS and no database, edits happen in
git. Styling is CSS modules over a small set of design tokens in
`src/app/globals.css`, with light and dark themes and an in-page toggle.

## Working on it

```bash
npm install
npm run dev        # local server on :3000
npm run typecheck  # tsc, no emit
npm run lint
npm run build
```

CI runs those same three checks on every pull request.

## Adding a project

Drop a new `.mdx` file in `src/content/projects/` with the same
frontmatter shape as the existing ones (title, summary, year, tech,
links, order). The index and the project page pick it up at build time.

The resume is data in `src/content/resume.ts`; the page and the
downloadable PDF both render from it.
