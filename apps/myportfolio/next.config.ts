import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const path = require('path');
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// Chrome origin-trial token enabling WebMCP for real visitors (read at build time).
const webMcpOriginTrialToken = process.env.WEBMCP_ORIGIN_TRIAL_TOKEN;

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, '../../..'),
  },
  async headers() {
    if (!webMcpOriginTrialToken) return [];
    return [
      {
        source: '/:path*',
        headers: [{ key: 'Origin-Trial', value: webMcpOriginTrialToken }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
