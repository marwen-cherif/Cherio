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

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Icons**: iconoir-react
- **Animations**: framer-motion

## License

Private project - All rights reserved.

