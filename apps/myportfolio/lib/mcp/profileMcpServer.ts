import {
  fromJsonSchema,
  type CallToolResult,
  type JsonSchemaType,
  type McpServer,
} from '@modelcontextprotocol/server';
import messages from '@/messages/en.json';
import type { ToolInput } from '@/lib/webmcp/modelContext.types';
import { PROFILE_TOOLS } from '@/lib/webmcp/profileTools';
import { isToolError } from '@/lib/webmcp/toolInput.utils';

export const MCP_SERVER_INFO = { name: 'marwen-cherif-portfolio', version: '1.0.0' };

export const MCP_INSTRUCTIONS =
  "Read-only tools presenting Marwen Cherif, Fullstack Tech Lead, to recruiters, hiring managers, founders, developers and clients, computed from the portfolio's career data. Start with get_profile_overview, or with get_tailored_pitch once you know who the user is. Use match_job_requirements when the user shares a job offer or a brief, and get_contact_info to reach Marwen or download the CV.";

function toCallToolResult(data: unknown): CallToolResult {
  return { content: [{ type: 'text', text: JSON.stringify(data) }], isError: isToolError(data) };
}

/** MCP endpoint adapter: every tool that does not act on the page, answered in English by default. */
export function registerProfileTools(server: McpServer, origin: string): void {
  for (const tool of PROFILE_TOOLS.filter(({ browserOnly }) => !browserOnly)) {
    server.registerTool(
      tool.name,
      {
        title: messages.webmcp.titles[tool.name],
        description: tool.description,
        inputSchema: fromJsonSchema<ToolInput>(tool.inputSchema as JsonSchemaType),
        annotations: { readOnlyHint: tool.readOnly, idempotentHint: true, openWorldHint: false },
      },
      (input) =>
        toCallToolResult(
          tool.run(input, { locale: 'en', origin, currentYear: new Date().getFullYear() })
        )
    );
  }
}
