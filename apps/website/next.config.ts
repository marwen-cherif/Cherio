import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const path = require('path');
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export', // Static export
  images: {
    unoptimized: true, // Required for static export
  },
  turbopack: {
    root: path.join(__dirname, '../../..'),
  },
};

export default withNextIntl(nextConfig);
