import { personalInfo } from '@/data/career';

/** Mounted by app/api/mcp/route.ts. */
export const MCP_ENDPOINT_PATH = '/api/mcp';

/** Name suggested to agents and users when they add the server as a connector. */
export const MCP_CONNECTOR_NAME = 'marwen-cherif';

/** Used where the request origin is unknown, e.g. during server rendering. */
export const PRODUCTION_ORIGIN = new URL(personalInfo.website ?? 'https://marwen-cherif.cherio.me')
  .origin;

export function mcpEndpointUrl(origin: string): string {
  return `${origin}${MCP_ENDPOINT_PATH}`;
}

export function claudeCodeAddCommand(endpointUrl: string): string {
  return `claude mcp add --transport http ${MCP_CONNECTOR_NAME} ${endpointUrl}`;
}
