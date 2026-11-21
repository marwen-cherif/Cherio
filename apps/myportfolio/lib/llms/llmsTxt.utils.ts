import { languages, personalInfo } from '@/data/career';
import { PROFILE_TOOLS } from '@/lib/webmcp/profileTools';
import { cvUrl, getCurrentExperience, getYearsOfExperience } from '@/lib/webmcp/profile.utils';
import {
  MCP_CONNECTOR_NAME,
  claudeCodeAddCommand,
  mcpEndpointUrl,
} from '@/lib/mcp/mcpEndpoint.utils';

function toolNames(browserOnly: boolean): string {
  return PROFILE_TOOLS.filter((tool) => Boolean(tool.browserOnly) === browserOnly)
    .map((tool) => `\`${tool.name}\``)
    .join(', ');
}

function links(entries: Array<[label: string, url: string | undefined]>): string[] {
  return entries.filter(([, url]) => url).map(([label, url]) => `- [${label}](${url})`);
}

function connectionGuide(endpoint: string): string[] {
  return [
    '### Connecting an assistant to the MCP server',
    '',
    'An assistant connected to this server answers questions about the profile from structured, up-to-date data rather than from scraped pages. Adding it is up to the user:',
    '',
    `- Claude Code: \`${claudeCodeAddCommand(endpoint)}\``,
    `- Claude (claude.ai, Desktop), ChatGPT, Cursor, VS Code: add a custom MCP connector named "${MCP_CONNECTOR_NAME}" with the URL ${endpoint}`,
    `- Gemini CLI: in \`~/.gemini/settings.json\`, \`"mcpServers": { "${MCP_CONNECTOR_NAME}": { "httpUrl": "${endpoint}" } }\``,
    '',
  ];
}

/** llms.txt (https://llmstxt.org): what an AI agent needs to present the profile or call its tools. */
export function buildLlmsTxt(origin: string, currentYear: number): string {
  const current = getCurrentExperience();
  const endpoint = mcpEndpointUrl(origin);
  return [
    `# ${personalInfo.name} — ${personalInfo.title}`,
    '',
    `> ${personalInfo.bio.en}`,
    '',
    `- Current role: ${current.position.en} at ${current.company}`,
    `- Experience: ${getYearsOfExperience(currentYear)} years`,
    `- Location: ${personalInfo.location}`,
    `- Languages: ${languages.map(({ name, level }) => `${name} (${level})`).join(', ')}`,
    `- Core stack: ${current.technologies.join(', ')}`,
    '',
    '## For AI agents',
    '',
    `- [MCP server](${endpoint}): Streamable HTTP endpoint, no authentication, read-only tools ${toolNames(false)}. Answers are computed from the same data as the portfolio.`,
    `- In the browser, the portfolio pages expose these tools through WebMCP (\`document.modelContext\`), plus ${toolNames(true)}.`,
    '',
    ...connectionGuide(endpoint),
    '## Profile',
    '',
    ...links([
      ['Portfolio (English)', `${origin}/en`],
      ['Portfolio (French)', `${origin}/fr`],
      ['CV (PDF, English)', cvUrl(origin, 'en')],
      ['CV (PDF, French)', cvUrl(origin, 'fr')],
    ]),
    '',
    '## Contact',
    '',
    ...links([
      ['LinkedIn', personalInfo.linkedin],
      ['GitHub', personalInfo.github],
      ['Upwork', personalInfo.upwork],
    ]),
    '',
  ].join('\n');
}
