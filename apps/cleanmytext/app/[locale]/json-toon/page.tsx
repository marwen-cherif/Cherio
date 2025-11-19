'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { jsonToToon, toonToJson } from '@/utils/jsonToonConverter';
import { useToast } from '@/hooks/use-toast';
import { Copy, ArrowLeftRight, Trash2, FileJson, FileText } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import Script from 'next/script';

export default function JsonToonPage() {
  const t = useTranslations('jsonToon');
  const { toast } = useToast();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [conversionMode, setConversionMode] = useState<'json-to-toon' | 'toon-to-json'>('json-to-toon');
  const inputTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-focus on the input textarea when component mounts
    if (inputTextareaRef.current) {
      inputTextareaRef.current.focus();
    }
  }, []);

  const handleConvert = () => {
    if (!inputText.trim()) {
      toast({
        title: t('error'),
        description: t('emptyInput'),
        variant: 'destructive',
      });
      return;
    }

    try {
      if (conversionMode === 'json-to-toon') {
        const toon = jsonToToon(inputText);
        setOutputText(toon);
      } else {
        const json = toonToJson(inputText);
        setOutputText(json);
      }
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('conversionError'),
        variant: 'destructive',
      });
      setOutputText('');
    }
  };

  const handleSwap = () => {
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
    setConversionMode(conversionMode === 'json-to-toon' ? 'toon-to-json' : 'json-to-toon');
  };

  const handleCopy = async (text: string, type: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: t('copied'),
        description: t('copiedToClipboard', { type }),
      });
    } catch (err) {
      toast({
        title: t('error'),
        description: t('copyError'),
        variant: 'destructive',
      });
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const getStats = (text: string) => {
    const characters = text.length;
    const lines = text ? text.split('\n').length : 0;
    return { characters, lines };
  };

  const inputStats = getStats(inputText);
  const outputStats = getStats(outputText);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t.title,
    description: t.seoDescription || t.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'JSON to TOON conversion',
      'TOON to JSON conversion',
      'LLM token optimization',
      'Free online converter',
    ],
  };

  return (
    <>
      <Script
        id="structured-data-json-toon"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-500 max-w-2xl mx-auto mt-2">
            {t('seoDescription')}
          </p>
        </div>

        {/* Conversion Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-1 inline-flex gap-2">
            <Button
              onClick={() => setConversionMode('json-to-toon')}
              variant={conversionMode === 'json-to-toon' ? 'default' : 'ghost'}
              size="sm"
              className="gap-2"
            >
              <FileJson className="h-4 w-4" />
              {t('jsonToToon')}
            </Button>
            <Button
              onClick={() => setConversionMode('toon-to-json')}
              variant={conversionMode === 'toon-to-json' ? 'default' : 'ghost'}
              size="sm"
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              {t('toonToJson')}
            </Button>
          </div>
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
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    {conversionMode === 'json-to-toon' ? (
                      <>
                        <FileJson className="h-5 w-5" />
                        JSON
                      </>
                    ) : (
                      <>
                        <FileText className="h-5 w-5" />
                        TOON
                      </>
                    )}
                  </h2>
                  {inputText && (
                    <div className="flex items-center gap-2">
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        {inputStats.characters} {t('characters')} • {inputStats.lines} {t('lines')}
                      </div>
                      <Button
                        onClick={() => handleCopy(inputText, conversionMode === 'json-to-toon' ? 'JSON' : 'TOON')}
                        size="sm"
                        variant="outline"
                        className="h-8 px-2 sm:px-3 border-2 shadow-sm dark:shadow-md"
                      >
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline ml-1">{t('copy')}</span>
                      </Button>
                    </div>
                  )}
                </div>
                <textarea
                  ref={inputTextareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    conversionMode === 'json-to-toon'
                      ? t('pasteJsonPlaceholder')
                      : t('pasteToonPlaceholder')
                  }
                  className="w-full h-64 sm:h-80 p-3 sm:p-4 border border-slate-300 dark:border-slate-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm sm:text-base font-mono"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  onClick={handleConvert}
                  disabled={!inputText}
                  className="flex-1 sm:flex-none shadow-md dark:shadow-lg"
                  variant="default"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('convert')}</span>
                  <span className="sm:hidden">{t('convert')}</span>
                </Button>
                <Button
                  onClick={handleSwap}
                  disabled={!inputText && !outputText}
                  variant="outline"
                  className="flex-1 sm:flex-none border-2 shadow-md dark:shadow-lg"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('swap')}</span>
                  <span className="sm:hidden">{t('swap')}</span>
                </Button>
                <Button
                  onClick={handleClear}
                  disabled={!inputText && !outputText}
                  variant="outline"
                  className="flex-1 sm:flex-none border-2 shadow-md dark:shadow-lg"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('clear')}</span>
                  <span className="sm:hidden">{t('clear')}</span>
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
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    {conversionMode === 'json-to-toon' ? (
                      <>
                        <FileText className="h-5 w-5" />
                        TOON
                      </>
                    ) : (
                      <>
                        <FileJson className="h-5 w-5" />
                        JSON
                      </>
                    )}
                  </h2>
                  {outputText && (
                    <div className="flex items-center gap-2">
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        {outputStats.characters} {t('characters')} • {outputStats.lines} {t('lines')}
                      </div>
                      <Button
                        onClick={() =>
                          handleCopy(
                            outputText,
                            conversionMode === 'json-to-toon' ? 'TOON' : 'JSON'
                          )
                        }
                        size="sm"
                        variant="outline"
                        className="h-8 px-2 sm:px-3 border-2 shadow-sm dark:shadow-md"
                      >
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline ml-1">{t('copy')}</span>
                      </Button>
                    </div>
                  )}
                </div>
                <textarea
                  value={outputText}
                  readOnly
                  placeholder={
                    conversionMode === 'json-to-toon'
                      ? t('toonOutputPlaceholder')
                      : t('jsonOutputPlaceholder')
                  }
                  className="w-full h-64 sm:h-80 p-3 sm:p-4 border border-slate-300 dark:border-slate-600 rounded-md resize-none focus:outline-none bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm sm:text-base font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
            {t('aboutTitle')}
          </h3>
          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-slate-700 dark:text-slate-300">
            <p className="mb-3">{t('aboutDescription')}</p>
            <ul className="list-disc list-inside space-y-2 mb-3">
              <li>{t('benefit1')}</li>
              <li>{t('benefit2')}</li>
              <li>{t('benefit3')}</li>
            </ul>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t('seoKeywords')}
            </p>
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
    </>
  );
}

