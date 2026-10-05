/**
 * Typings for the WebMCP API (W3C Web Machine Learning Community Group draft).
 * Spec: https://webmachinelearning.github.io/webmcp/
 */

export type ToolInput = Record<string, unknown>;

export interface ToolAnnotations {
  readOnlyHint?: boolean;
  untrustedContentHint?: boolean;
}

export interface ToolExecuteOptions {
  signal?: AbortSignal;
}

export interface ModelContextTool {
  name: string;
  title?: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  annotations?: ToolAnnotations;
  execute: (input: ToolInput, options?: ToolExecuteOptions) => string | Promise<string>;
}

export interface ModelContextRegisterToolOptions {
  signal?: AbortSignal;
}

export interface ModelContext {
  registerTool: (
    tool: ModelContextTool,
    options?: ModelContextRegisterToolOptions
  ) => Promise<void> | void;
  /** Only exposed by the deprecated `navigator.modelContext` preview, which ignores `signal`. */
  unregisterTool?: (name: string) => void;
}

declare global {
  interface Document {
    modelContext?: ModelContext;
  }

  interface Navigator {
    /** @deprecated Moved to `document.modelContext` (Chrome 150+). */
    modelContext?: ModelContext;
  }
}
