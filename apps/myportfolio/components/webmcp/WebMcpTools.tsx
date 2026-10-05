'use client';

import { useWebMcpTools } from './WebMcpTools.hooks';

interface WebMcpToolsProps {
  locale: string;
}

export default function WebMcpTools({ locale }: WebMcpToolsProps) {
  useWebMcpTools(locale);
  return null;
}
