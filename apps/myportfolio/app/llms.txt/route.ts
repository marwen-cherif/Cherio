import { getPublicOrigin } from 'mcp-handler';
import { buildLlmsTxt } from '@/lib/llms/llmsTxt.utils';

export function GET(request: Request): Response {
  return new Response(buildLlmsTxt(getPublicOrigin(request), new Date().getFullYear()), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
