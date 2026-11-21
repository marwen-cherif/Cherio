'use client';

import { useTranslations } from 'next-intl';
import { Check, Copy, Cpu } from 'iconoir-react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { useAgentAccess } from './AgentAccess.hooks';

const CODE_CLASS =
  'block w-full overflow-x-auto rounded-lg bg-muted px-4 py-3 font-mono text-sm text-foreground';

/** Tells visitors, and the AI agents reading the page, how to connect an assistant to the MCP server. */
export default function AgentAccess() {
  const t = useTranslations('contact.agents');
  const { endpoint, claudeCodeCommand, copied, copyEndpoint } = useAgentAccess();

  return (
    <AnimatedCard className="p-8 md:p-12" delay={0.2} hover={false}>
      <h3 className="flex items-center gap-3 text-3xl font-bold text-foreground mb-4">
        <Cpu className="w-8 h-8 text-primary" />
        {t('title')}
      </h3>
      <p className="text-muted-foreground mb-6">{t('description')}</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <code className={CODE_CLASS}>{endpoint}</code>
        <button
          type="button"
          onClick={copyEndpoint}
          className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-4 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {copied ? t('copied') : t('copy')}
        </button>
      </div>

      <p className="font-semibold text-foreground mb-2">{t('claudeCode')}</p>
      <code className={`${CODE_CLASS} mb-6`}>{claudeCodeCommand}</code>

      <a href="/llms.txt" className="text-primary hover:underline">
        {t('llmsTxt')}
      </a>
    </AnimatedCard>
  );
}
