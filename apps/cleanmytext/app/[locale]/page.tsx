'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { cleanText } from '@/utils/textCleaner';
import { useToast } from '@/hooks/use-toast';
import { Copy, Sparkles, Trash2 } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

export default function HomePage() {
  const t = useTranslations('common');
  const { toast } = useToast();
  const [inputText, setInputText] = useState('');
  const [cleanedText, setCleanedText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-focus on the input textarea when component mounts
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleClean = () => {
    const cleaned = cleanText(inputText);
    setCleanedText(cleaned);
  };

  const handleCleanAndCopy = async () => {
    const cleaned = cleanText(inputText);
    setCleanedText(cleaned);

    try {
      await navigator.clipboard.writeText(cleaned);
      toast({
        title: t('copied'),
        description: t('cleanedText'),
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const handleCopy = async () => {
    if (!cleanedText) return;

    try {
      await navigator.clipboard.writeText(cleanedText);
      toast({
        title: t('copied'),
        description: t('cleanedText'),
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const handleClear = () => {
    setInputText('');
    setCleanedText('');
  };

  const getStats = (text: string) => {
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split('\n').length : 0;
    return { characters, words, lines };
  };

  const inputStats = getStats(inputText);
  const cleanedStats = getStats(cleanedText);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        {/* Top Ad Banner - Desktop only */}
        <div className="hidden lg:block mb-6">
          <AdBanner
            adSlot="7500634962"
            adFormat="horizontal"
            className="w-full"
            style={{ minHeight: '90px' }}
          />
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-slate-100">
            {t('title')}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Main Content */}
        <div className="relative">
          {/* Desktop Sidebar Ad - Fixed on the right side */}
          <div className="hidden lg:block absolute right-0 top-0 -mr-[320px] w-[300px]">
            <AdBanner
              adSlot="9935226616"
              adFormat="vertical"
              className="sticky top-4"
              style={{ minHeight: '250px', width: '300px' }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              {/* Mobile Ad Banner - Top */}
              <div className="lg:hidden mb-4">
                <AdBanner
                  adSlot="2929058467"
                  adFormat="horizontal"
                  className="w-full"
                  style={{ minHeight: '90px' }}
                />
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Input
                  </h2>
                  {inputText && (
                    <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      {inputStats.characters} {t('characters')} • {inputStats.words} {t('words')} •{' '}
                      {inputStats.lines} {t('lines')}
                    </div>
                  )}
                </div>
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t('pasteText')}
                  className="w-full h-64 sm:h-80 p-3 sm:p-4 border border-slate-300 dark:border-slate-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm sm:text-base"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  onClick={handleClean}
                  disabled={!inputText}
                  className="flex-1 sm:flex-none"
                  variant="default"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('clean')}</span>
                  <span className="sm:hidden">Clean</span>
                </Button>
                <Button
                  onClick={handleCleanAndCopy}
                  disabled={!inputText}
                  className="flex-1 sm:flex-none"
                  variant="default"
                >
                  <Copy className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('cleanAndCopy')}</span>
                  <span className="sm:hidden">Clean & Copy</span>
                </Button>
                <Button
                  onClick={handleClear}
                  disabled={!inputText && !cleanedText}
                  variant="outline"
                  className="flex-1 sm:flex-none"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('clear')}</span>
                  <span className="sm:hidden">Clear</span>
                </Button>
              </div>

              {/* Mobile Ad Banner - Bottom */}
              <div className="lg:hidden mt-4">
                <AdBanner
                  adSlot="3613360845"
                  adFormat="horizontal"
                  className="w-full"
                  style={{ minHeight: '90px' }}
                />
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {t('cleanedText')}
                  </h2>
                  {cleanedText && (
                    <div className="flex items-center gap-2">
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        {cleanedStats.characters} {t('characters')} • {cleanedStats.words}{' '}
                        {t('words')} • {cleanedStats.lines} {t('lines')}
                      </div>
                      <Button
                        onClick={handleCopy}
                        size="sm"
                        variant="outline"
                        className="h-8 px-2 sm:px-3"
                      >
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline ml-1">{t('copy')}</span>
                      </Button>
                    </div>
                  )}
                </div>
                <textarea
                  value={cleanedText}
                  readOnly
                  placeholder={t('cleanedText')}
                  className="w-full h-64 sm:h-80 p-3 sm:p-4 border border-slate-300 dark:border-slate-600 rounded-md resize-none focus:outline-none bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Ad Banner */}
        <div className="mt-8">
          <AdBanner
            adSlot="7989813450"
            adFormat="horizontal"
            className="w-full"
            style={{ minHeight: '90px' }}
          />
        </div>
      </div>
    </div>
  );
}
