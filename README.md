# martincs.org

The Martin Consulting Solutions website. Plain static files in `public/`, no build step.

- `public/index.html`: the home page.
- `public/resources/`: the resource library. Each resource is an open page plus a one-page PDF. The optional "Email me the PDF" form posts to Meridian (`/api/library-request`); the list of resources Meridian will send lives in Meridian's `lib/library/policy.ts`.
- `public/sitemap.xml`: add a line for every new page.

Deploys: Vercel project `martin-consulting-solutions`, production branch `main`. A push to `main` deploys.
