import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const path = require('path');
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Note: output: 'export' est désactivé pour permettre les routes API
  // Si vous avez besoin d'un export statique, vous devrez utiliser un service externe
  // ou un backend séparé pour gérer l'envoi d'emails
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname, '../../..'),
  },
};

export default withNextIntl(nextConfig);
