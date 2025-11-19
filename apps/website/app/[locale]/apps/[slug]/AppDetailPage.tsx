'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CherioAppConfig } from '../../../../cherio.apps.config';

// Simple markdown to HTML converter for basic formatting
function formatMarkdown(text: string): string {
  let html = text;
  
  // Split into paragraphs first
  const paragraphs = html.split(/\n\n+/);
  const processedParagraphs = paragraphs.map((para) => {
    let processed = para.trim();
    
    // Convert numbered lists (1. item)
    if (/^\d+\.\s+/.test(processed)) {
      const listItems = processed.split(/\n(?=\d+\.\s+)/).map((item) => {
        const match = item.match(/^\d+\.\s+(.+)$/);
        return match ? `<li>${match[1]}</li>` : '';
      }).filter(Boolean);
      if (listItems.length > 0) {
        return `<ol class="list-decimal list-inside space-y-2 my-4 ml-4">${listItems.join('')}</ol>`;
      }
    }
    
    // Convert bullet lists (- item or * item)
    if (/^[-*]\s+/.test(processed)) {
      const listItems = processed.split(/\n(?=[-*]\s+)/).map((item) => {
        const match = item.match(/^[-*]\s+(.+)$/);
        return match ? `<li>${match[1]}</li>` : '';
      }).filter(Boolean);
      if (listItems.length > 0) {
        return `<ul class="list-disc list-inside space-y-2 my-4 ml-4">${listItems.join('')}</ul>`;
      }
    }
    
    // Convert bold (**text**)
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert line breaks within paragraph
    processed = processed.replace(/\n/g, '<br />');
    
    return processed ? `<p class="my-4">${processed}</p>` : '';
  });
  
  return processedParagraphs.filter(Boolean).join('');
}

interface AppDetailPageProps {
  app: CherioAppConfig;
  locale: 'fr' | 'en';
}

export default function AppDetailPage({ app, locale }: AppDetailPageProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const media = app.media || [];
  const currentMedia = media[currentMediaIndex];

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % media.length);
    setIsVideoPlaying(false);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + media.length) % media.length);
    setIsVideoPlaying(false);
  };

  const goToMedia = (index: number) => {
    setCurrentMediaIndex(index);
    setIsVideoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="mr-1">←</span>
            {locale === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
              <span className="text-4xl">📱</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{app.publicName[locale]}</h1>
            <p className="text-xl text-gray-300 mb-8">{app.description[locale]}</p>
            {app.published && (
              <a
                href={app.urls[locale]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                {locale === 'fr' ? 'Visiter l\'application' : 'Visit application'}
                <span className="ml-2">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Description longue */}
          {app.longDescription && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{app.longDescription[locale]}</p>
              </div>
            </div>
          )}

          {/* Carrousel d'images/vidéos */}
          {media.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
              <div className="relative">
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                  {currentMedia?.type === 'video' ? (
                    <>
                      {!isVideoPlaying ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                          {currentMedia.thumbnail ? (
                            <img
                              src={currentMedia.thumbnail}
                              alt={currentMedia.alt?.[locale] || ''}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-white text-center">
                              <span className="text-6xl block mb-4 opacity-75">▶</span>
                              <p className="text-lg">{locale === 'fr' ? 'Cliquez pour lire' : 'Click to play'}</p>
                            </div>
                          )}
                          <button
                            onClick={() => setIsVideoPlaying(true)}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                          >
                            <span className="text-6xl text-white">▶</span>
                          </button>
                        </div>
                      ) : (
                        <video
                          src={currentMedia.url}
                          controls
                          autoPlay
                          className="w-full h-full object-contain"
                          onEnded={() => setIsVideoPlaying(false)}
                        >
                          {locale === 'fr' ? 'Votre navigateur ne supporte pas la vidéo.' : 'Your browser does not support video.'}
                        </video>
                      )}
                    </>
                  ) : (
                    <img
                      src={currentMedia.url}
                      alt={currentMedia.alt?.[locale] || ''}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Navigation du carrousel */}
                {media.length > 1 && (
                  <>
                    <button
                      onClick={prevMedia}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg transition-all text-xl"
                      aria-label={locale === 'fr' ? 'Précédent' : 'Previous'}
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextMedia}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg transition-all text-xl"
                      aria-label={locale === 'fr' ? 'Suivant' : 'Next'}
                    >
                      ›
                    </button>

                    {/* Indicateurs */}
                    <div className="flex justify-center gap-2 mt-4">
                      {media.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToMedia(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentMediaIndex
                              ? 'bg-gray-900 w-8'
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`${locale === 'fr' ? 'Aller à' : 'Go to'} ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Section "Comment ça fonctionne" */}
          {app.howItWorks && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">{app.howItWorks.title[locale]}</h2>
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMarkdown(app.howItWorks.content[locale]) }}
              />
            </div>
          )}

          {/* Section "Cas d'usage" */}
          {app.useCases && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">{app.useCases.title[locale]}</h2>
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMarkdown(app.useCases.content[locale]) }}
              />
            </div>
          )}

          {/* Section FAQ */}
          {app.faq && app.faq.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                {locale === 'fr' ? 'FAQ' : 'FAQ'}
              </h2>
              <div className="space-y-6">
                {app.faq.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{faq.question[locale]}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer[locale]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          {app.published && (
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-lg p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">
                {locale === 'fr' ? 'Prêt à essayer ?' : 'Ready to try it?'}
              </h3>
              <p className="text-gray-300 mb-6">
                {locale === 'fr'
                  ? 'Découvrez CleanMyText dès maintenant et nettoyez vos textes en quelques clics.'
                  : 'Discover CleanMyText now and clean your texts in just a few clicks.'}
              </p>
              <a
                href={app.urls[locale]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                {locale === 'fr' ? 'Lancer l\'application' : 'Launch application'}
                <span className="ml-2 text-xl">↗</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

