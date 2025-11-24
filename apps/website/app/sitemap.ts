import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { cherioApps } from '@/cherio.apps.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cherio.me';

  const sitemapEntries: MetadataRoute.Sitemap = [];

  const staticRoutes = ['', '/contact'];

  routing.locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [loc, `${baseUrl}/${loc}${route}`])
          ),
        },
      });
    });
  });

  routing.locales.forEach((locale) => {
    cherioApps.forEach((app) => {
      if (app.published) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/apps/${app.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
          alternates: {
            languages: Object.fromEntries(
              routing.locales.map((loc) => [loc, `${baseUrl}/${loc}/apps/${app.slug}`])
            ),
          },
        });
      }
    });
  });

  return sitemapEntries;
}
