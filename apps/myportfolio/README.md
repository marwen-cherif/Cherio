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

## AI agents

The profile is exposed to AI agents through three channels, all built from `data/career.ts` (updating the
career data updates what every agent sees):

| Channel                                                                                    | Reaches                                                                                          | Where                      |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | -------------------------- |
| [WebMCP](https://webmachinelearning.github.io/webmcp/) (`document.modelContext`)           | Agents running in the visitor's browser (Chrome, Edge, ChatGPT desktop…)                         | Every page                 |
| Remote [MCP](https://modelcontextprotocol.io) server (Streamable HTTP, stateless, no auth) | Claude (claude.ai, Desktop, Code, API), ChatGPT and the OpenAI API, Gemini CLI, Cursor, VS Code… | `/api/mcp`                 |
| [llms.txt](https://llmstxt.org) and schema.org `Person` JSON-LD                            | Agents and search engines that read the site                                                     | `/llms.txt`, page `<head>` |

| Tool                     | What it gives the agent                                                                        | MCP server |
| ------------------------ | ---------------------------------------------------------------------------------------------- | ---------- |
| `get_profile_overview`   | Headline, current role, years of experience, core stack, quantified achievements, languages    | ✓          |
| `get_tailored_pitch`     | Pitch and highlights for the reader: recruiter, hiring manager, founder/CTO, developer, client | ✓          |
| `match_job_requirements` | Evidence-based match of a job offer's requirements (proven / listed / mentioned / not found)   | ✓          |
| `search_experience`      | Experience, projects and education matching keywords (tech, client, domain)                    | ✓          |
| `get_skills`             | Skills by category, with years of professional use when backed by experience                   | ✓          |
| `get_contact_info`       | Contact channels, CV PDF links, optional prefilled `mailto:` link                              | ✓          |
| `draft_contact_message`  | Pre-fills the on-page contact form; the visitor reviews it and sends it from their email app   | —          |
| `show_section`           | Scrolls the page to a section while the agent talks about it                                   | —          |

Code: `lib/webmcp/profileTools.ts` defines every tool once (`PROFILE_TOOLS`), with pure logic in
`lib/webmcp/*.utils.ts`. Two adapters expose them: `createProfileTools` (WebMCP, registered by
`components/webmcp/WebMcpTools`) and `lib/mcp/profileMcpServer.ts` (mounted at `app/api/mcp/route.ts` with
`mcp-handler`, which skips the `browserOnly` page tools). Tool titles are translated under `webmcp.titles` in
`messages/*.json`; audience pitches live in `data/pitches.ts`. `draft_contact_message` reaches
`components/contact/ContactForm` through a `portfolio:contact-draft` window event: nothing is ever sent
without the visitor.

### Connecting an agent to the MCP server

Use the production URL, e.g. `https://marwen-cherif.cherio.me/api/mcp` (or `http://localhost:5103/api/mcp`
locally).

- **Claude Code**: `claude mcp add --transport http marwen-cherif https://marwen-cherif.cherio.me/api/mcp`
- **Claude (claude.ai / Desktop)**, **ChatGPT**, **Cursor**, **VS Code**: add a custom MCP connector or
  server with the URL.
- **Gemini CLI**: in `~/.gemini/settings.json`, `"mcpServers": { "marwen-cherif": { "httpUrl": "<url>" } }`.
- **Inspect**: `npx @modelcontextprotocol/inspector`, then connect to the URL with the Streamable HTTP
  transport.

### How agents discover the MCP server

No agent connects to an MCP server on its own: the user always adds the connector. The site makes sure an
agent that reads it knows the server exists and can suggest it with the exact steps:

- the **"Using an AI assistant?"** block of the contact section (`components/contact/AgentAccess`) shows the
  endpoint and the Claude Code command, as text that page-reading agents see;
- every page links to `/llms.txt` (`<link rel="alternate" type="text/markdown">`), which lists the tools and
  how to connect Claude, ChatGPT, Cursor, VS Code and Gemini CLI;
- `server.json` describes the server for the [official MCP Registry](https://registry.modelcontextprotocol.io),
  which MCP clients and catalogs browse. Publish it once the production URL is live:
  `mcp-publisher login github`, then `mcp-publisher publish` from this folder.

### WebMCP

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
