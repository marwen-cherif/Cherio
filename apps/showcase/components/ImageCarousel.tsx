'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCarouselProps {
  mainImage: string;
  images?: string[];
  video?: string;
  productName: string;
  isRTL: boolean;
}

export default function ImageCarousel({
  mainImage,
  images = [],
  video,
  productName,
  isRTL,
}: ImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Combine all media: main image first, then video if exists, then additional images
  const allMedia = [
    { type: 'image' as const, src: mainImage },
    ...(video ? [{ type: 'video' as const, src: video }] : []),
    ...images.map((img) => ({ type: 'image' as const, src: img })),
  ];

  const selectedMedia = allMedia[selectedIndex];

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Image/Video Display */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-accent/20 border border-border group">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {selectedMedia.type === 'video' ? (
              <video
                src={selectedMedia.src}
                controls
                className="h-full w-full object-cover"
                playsInline
              >
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            ) : (
              <Image
                src={selectedMedia.src || '/images/placeholder.jpg'}
                alt={productName}
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                priority={selectedIndex === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {allMedia.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 p-2 shadow-lg opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={isRTL ? "الصورة التالية" : "Image précédente"}
            >
              <svg
                className={`h-5 w-5 text-primary ${isRTL ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 p-2 shadow-lg opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={isRTL ? "الصورة السابقة" : "Image suivante"}
            >
              <svg
                className={`h-5 w-5 text-primary ${isRTL ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Video Indicator */}
        {selectedMedia.type === 'video' && (
          <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} rounded-md bg-black/70 px-3 py-1.5 text-xs font-medium text-white`}>
            {isRTL ? 'فيديو' : 'Vidéo'}
          </div>
        )}

        {/* Zoom overlay on hover for images */}
        {selectedMedia.type === 'image' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>

      {/* Thumbnail Navigation */}
      {allMedia.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {allMedia.map((media, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative flex-shrink-0 aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all ${
                selectedIndex === index
                  ? 'border-primary scale-105'
                  : 'border-border hover:border-secondary'
              }`}
            >
              {media.type === 'video' ? (
                <div className="relative h-full w-full bg-accent/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="h-8 w-8 text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className={`absolute top-1 ${isRTL ? 'left-1' : 'right-1'} rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white`}>
                    {isRTL ? 'فيديو' : 'Vidéo'}
                  </div>
                </div>
              ) : (
                <Image
                  src={media.src || '/images/placeholder.jpg'}
                  alt={`${productName} - Vue ${index + 1}`}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              )}
              {selectedIndex === index && (
                <div className="absolute inset-0 border-2 border-primary rounded-lg" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

