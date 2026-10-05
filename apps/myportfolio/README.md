# My Portfolio

A modern, SEO-optimized portfolio website for Marwen Cherif, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌍 **Internationalization (i18n)**: Full support for English (EN) and French (FR)
- 🔍 **SEO Optimized**: Complete metadata, sitemap, and robots.txt
- 📱 **Responsive Design**: Mobile-first approach with modern UI
- ⚡ **Performance**: Built with Next.js 16 for optimal performance
- 🎨 **Modern UI**: Beautiful gradient designs and smooth animations
- 📊 **Clean Data Structure**: Well-organized career data in TypeScript

## Sections

- **Hero**: Eye-catching introduction with call-to-action
- **About**: Personal bio and background
- **Experience**: Professional work history
- **Education**: Academic background
- **Projects**: Featured projects with details
- **Skills**: Technical skills and technologies
- **Contact**: Contact information and social links

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev:myportfolio

# Or from the app directory
cd apps/myportfolio
pnpm dev
```

The app will be available at `http://localhost:4003`

## Building

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Data Structure

Career information is stored in `data/career.ts` with clean TypeScript interfaces:

- `PersonalInfo`: Personal details and bio
- `Experience`: Work experience entries
- `Education`: Educational background
- `Project`: Project portfolio items
- `Skill`: Technical skills by category

## SEO Features

- Dynamic metadata generation per locale
- Sitemap.xml generation
- Robots.txt configuration
- Open Graph tags
- Twitter Card support
- Canonical URLs
- Language alternates

## AI agents (WebMCP)

The site exposes tools to in-browser AI agents through [WebMCP](https://webmachinelearning.github.io/webmcp/)
(`document.modelContext`, with a fallback to the deprecated `navigator.modelContext`). They are built from
`data/career.ts`, so updating the career data updates what agents see.

| Tool                     | What it gives the agent                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `get_profile_overview`   | Headline, current role, years of experience, core stack, quantified achievements, languages  |
| `match_job_requirements` | Evidence-based match of a job offer's requirements (proven / listed / mentioned / not found) |
| `search_experience`      | Experience, projects and education matching keywords (tech, client, domain)                  |
| `get_skills`             | Skills by category, with years of professional use when backed by experience                 |
| `get_contact_info`       | Contact channels, CV PDF links, optional prefilled `mailto:` link                            |
| `show_section`           | Scrolls the page to a section while the agent talks about it                                 |

Code: `lib/webmcp/` (tools and pure logic) and `components/webmcp/WebMcpTools` (registration, mounted in
`app/[locale]/layout.tsx`). Tool titles are translated under `webmcp.titles` in `messages/*.json`.

- **Local testing**: enable `chrome://flags/#enable-webmcp-testing`, then inspect the tools with the
  [Model Context Tool Inspector](https://chromewebstore.google.com/detail/webmcp-model-context-tool/gbpdfapgefenggkahomfgkhfehlcenpd) extension.
- **Production**: register the production origin for the WebMCP origin trial
  (Chrome 149–156) and set `WEBMCP_ORIGIN_TRIAL_TOKEN` at build time; `next.config.ts` then sends it as
  an `Origin-Trial` header on every page.

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Icons**: iconoir-react
- **Animations**: framer-motion

## License

Private project - All rights reserved.
