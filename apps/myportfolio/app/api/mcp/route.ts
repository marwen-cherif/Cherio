import { createMcpHandler, getPublicOrigin } from 'mcp-handler';
import {
  MCP_INSTRUCTIONS,
  MCP_SERVER_INFO,
  registerProfileTools,
} from '@/lib/mcp/profileMcpServer';

/**
 * Remote MCP endpoint (Streamable HTTP, stateless) for agents outside the browser:
 * Claude, ChatGPT, Gemini CLI, Cursor… Built per request so links use the public origin.
 */
function handler(request: Request): Promise<Response> {
  const origin = getPublicOrigin(request);
  return createMcpHandler((server) => registerProfileTools(server, origin), {
    serverInfo: MCP_SERVER_INFO,
    instructions: MCP_INSTRUCTIONS,
  })(request);
}

export { handler as GET, handler as POST, handler as DELETE };
