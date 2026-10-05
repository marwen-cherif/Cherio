import type { Locale } from '@/data/career';
import type { ToolInput } from './modelContext.types';

// Agents may send anything: every reader validates and falls back instead of throwing.

export function resolveLocale(value: unknown, fallback: Locale = 'en'): Locale {
  return value === 'en' || value === 'fr' ? value : fallback;
}

export function readString(input: ToolInput | undefined, key: string): string | undefined {
  const value = input?.[key];
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

/** Accepts a string array, or a comma/semicolon/newline separated string. */
export function readStringArray(input: ToolInput | undefined, key: string): string[] {
  const value = input?.[key];
  const items = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(/[,;\n]/)
      : [];
  return items
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function readEnum<T extends string>(
  input: ToolInput | undefined,
  key: string,
  values: readonly T[],
  fallback: T
): T {
  const value = input?.[key];
  return values.find((candidate) => candidate === value) ?? fallback;
}

export function toToolResult(data: unknown): string {
  return JSON.stringify(data);
}
