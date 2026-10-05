import type { ModelContext, ModelContextTool } from './modelContext.types';

export function getModelContext(): ModelContext | undefined {
  return document.modelContext ?? navigator.modelContext;
}

async function registerTool(
  modelContext: ModelContext,
  tool: ModelContextTool,
  signal: AbortSignal
): Promise<void> {
  await modelContext.registerTool(tool, { signal });

  // The legacy preview ignores `signal`: unregister by name when it is aborted.
  if (!modelContext.unregisterTool) return;
  const unregister = () => {
    try {
      modelContext.unregisterTool?.(tool.name);
    } catch {
      // Already unregistered through the signal.
    }
  };
  if (signal.aborted) unregister();
  else signal.addEventListener('abort', unregister, { once: true });
}

/** Registers tools on the page; aborting `signal` unregisters them. No-op without WebMCP. */
export async function registerTools(tools: ModelContextTool[], signal: AbortSignal): Promise<void> {
  const modelContext = getModelContext();
  if (!modelContext) return;

  const results = await Promise.allSettled(
    tools.map((tool) => registerTool(modelContext, tool, signal))
  );
  results.forEach((result, index) => {
    if (result.status === 'rejected' && !signal.aborted) {
      console.warn(`[WebMCP] Could not register "${tools[index].name}"`, result.reason);
    }
  });
}
