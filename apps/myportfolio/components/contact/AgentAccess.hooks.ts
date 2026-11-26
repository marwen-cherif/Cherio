import { useState, useSyncExternalStore } from 'react';
import {
  PRODUCTION_ORIGIN,
  claudeCodeAddCommand,
  mcpEndpointUrl,
} from '@/lib/mcp/mcpEndpoint.utils';

const COPIED_FEEDBACK_MS = 2000;

const subscribeToNothing = () => () => {};

/** MCP endpoint of the current deployment (production URL while server rendering). */
export function useAgentAccess() {
  const origin = useSyncExternalStore(
    subscribeToNothing,
    () => window.location.origin,
    () => PRODUCTION_ORIGIN
  );
  const endpoint = mcpEndpointUrl(origin);
  const [copied, setCopied] = useState(false);

  const copyEndpoint = async () => {
    await navigator.clipboard.writeText(endpoint);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
  };

  return { endpoint, claudeCodeCommand: claudeCodeAddCommand(endpoint), copied, copyEndpoint };
}
