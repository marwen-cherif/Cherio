import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { registerTools } from '@/lib/webmcp/modelContext';
import { createProfileTools } from '@/lib/webmcp/profileTools';
import { resolveLocale } from '@/lib/webmcp/toolInput.utils';

/** Exposes the profile tools to in-browser AI agents through WebMCP, when supported. */
export function useWebMcpTools(locale: string) {
  const t = useTranslations('webmcp.titles');

  useEffect(() => {
    const controller = new AbortController();
    const tools = createProfileTools({
      locale: resolveLocale(locale),
      origin: window.location.origin,
      getTitle: (name) => t(name),
    });

    void registerTools(tools, controller.signal);
    return () => controller.abort();
  }, [locale, t]);
}
