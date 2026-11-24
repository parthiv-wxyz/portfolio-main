# Personal Portfolio

A single-page personal portfolio for Parthiv Prakash, built with React 19, TypeScript, and Vite. The site presents an introduction, skills, experience timeline, project cards, and a contact form in a responsive layout with light/dark themes and motion effects.

## Features

- Responsive single-page navigation for About, Skills, Experience, Projects, and Contact.
- Light/dark theme toggle with `localStorage` persistence and system-theme fallback.
- Smooth scrolling with Lenis and reduced-motion support in the stylesheet.
- Framer Motion entrance, scroll, and project-filter animations.
- Project filtering by Web, Machine Learning, and AI.
- Contact form validation with React Hook Form and Zod.
- Optional EmailJS delivery with a graceful local confirmation when EmailJS is not configured.
- SEO metadata, canonical URL, Open Graph/Twitter tags, and Person JSON-LD via React Helmet.
- Vercel Analytics and Speed Insights components included in the app.

## Requirements

- Node.js 20 or newer recommended.
- npm.

## Run locally

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Open the local URL printed by Vite. The npm scripts call the locally installed Vite, TypeScript, and ESLint binaries, so they work on Windows, macOS, and Linux (including CI and Netlify builds).

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check the project and create a production build in `dist/`. |
| `npm run preview` | Preview the latest production build locally. |
| `npm run lint` | Run ESLint. Add file paths or flags after the command when needed. |

## Project structure

```text
src/
  App.tsx                 Main page, sections, interactions, and contact form
  main.tsx                React entry point and providers
  components/Section.tsx Reusable animated section heading wrapper
  data/portfolio.ts      Profile, social links, skills, milestones, and projects
  hooks/useTheme.ts      Theme state and localStorage persistence
  styles/global.css      Global design tokens, layout, responsive CSS, and animations
eslint.config.js         ESLint 10 flat configuration
public/
  prof.jpg               Portrait rendered in the About section
  profile.svg            Optional profile asset currently not referenced by the app
  robots.txt             Crawler rules
  sitemap.xml            Sitemap with the deployed site URL
```

## Customize the portfolio

Most content is centralized in [`src/data/portfolio.ts`](src/data/portfolio.ts):

- `profile`: name, role, email, location, bio, and objective.
- `socials`: GitHub, LinkedIn, and Instagram URLs.
- `skillGroups`: skill categories and their technologies.
- `milestones`: experience and education timeline entries.
- `projects`: project descriptions, categories, stacks, features, links, and gradients.

The About section currently contains a few presentation-specific details in [`src/App.tsx`](src/App.tsx), including the education label and portrait alt text. Replace `public/prof.jpg` with an optimized image if you want a different portrait. The résumé download button expects `public/resume.pdf` to exist.

## Environment variables

Copy `.env.example` to `.env` for local development:

```env
VITE_SITE_URL=https://your-domain.com
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key
```

`VITE_SITE_URL` is used for the canonical URL and social metadata. Update the URL in `public/sitemap.xml` as well. The three EmailJS values are optional during development; without all three, submitting the form only shows a local success message and does not send an email.

When EmailJS is enabled, configure the template to accept the fields `name`, `email`, and `message`. Vite exposes `VITE_*` values to the browser, so only use the EmailJS public key here—never put private credentials in this file.

## Build and deploy

Run a production check before deployment:

```powershell
npm run lint
npm run build
npm run preview
```

The generated site is in `dist/`. It can be deployed to Vercel or another static hosting provider that supports a Vite build. Set the same public environment variables in the hosting provider's project settings, and use the production domain for both `VITE_SITE_URL` and `public/sitemap.xml`.

## Notes

- The app is currently a single route wrapped in `BrowserRouter`; no route-specific pages are defined.
- Project links and some profile copy are starter content and should be replaced before publishing.
- `public/robots.txt` allows crawling and points to `/sitemap.xml`.
- `npm run lint` uses the ESLint 10 flat configuration in `eslint.config.js`.
