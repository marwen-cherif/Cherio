'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('ui');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  
  // Callback ref to handle video element mounting
  const setVideoRef = (element: HTMLVideoElement | null) => {
    mainVideoRef.current = element;
    if (element) {
      // Ensure video is loaded when element is mounted
      element.load();
    }
  };

  // Combine all media: main image first, then video if exists, then additional images
  const allMedia = [
    { type: 'image' as const, src: mainImage },
    ...(video ? [{ type: 'video' as const, src: video }] : []),
    ...images.map((img) => ({ type: 'image' as const, src: img })),
  ];

  // Preload videos on component mount and ensure they're ready
  useEffect(() => {
    // Get video sources from props
    const videoSources: string[] = [];
    if (video) {
      videoSources.push(video);
    }

    if (videoSources.length === 0) return;

    // Preload videos by creating link elements in the head
    const preloadLinks: HTMLLinkElement[] = [];
    videoSources.forEach((src) => {
      // Check if link already exists to avoid duplicates
      const existingLink = document.querySelector(`link[rel="preload"][as="video"][href="${src}"]`);
      if (existingLink) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = src;
      document.head.appendChild(link);
      preloadLinks.push(link);
    });

    // Preload videos by creating video elements (hidden) and load them fully
    const preloadVideos: HTMLVideoElement[] = [];
    const loadPromises: Promise<void>[] = [];

    videoSources.forEach((src) => {
      // Check if video already exists to avoid duplicates
      const existingVideo = document.querySelector(`video[data-preload="${src}"]`) as HTMLVideoElement;
      if (existingVideo) {
        // If video exists but not loaded, wait for it
        if (existingVideo.readyState < 3) {
          loadPromises.push(
            new Promise((resolve) => {
              existingVideo.addEventListener('canplaythrough', () => resolve(), { once: true });
              existingVideo.load(); // Force reload if needed
            })
          );
        }
        return;
      }

      const videoEl = document.createElement('video');
      videoEl.src = src;
      videoEl.preload = 'auto';
      videoEl.muted = true;
      videoEl.style.display = 'none';
      videoEl.setAttribute('data-preload', src);
      document.body.appendChild(videoEl);
      preloadVideos.push(videoEl);

      // Wait for video to be ready to play
      loadPromises.push(
        new Promise((resolve) => {
          const handleCanPlayThrough = () => {
            resolve();
          };
          videoEl.addEventListener('canplaythrough', handleCanPlayThrough, { once: true });
          videoEl.addEventListener('error', () => resolve(), { once: true }); // Resolve even on error to not block
          videoEl.load(); // Start loading
        })
      );
    });

    // Wait for all videos to be ready (but don't block if some fail)
    Promise.all(loadPromises).catch(() => {
      // Ignore errors, videos will load when needed
    });

    // Cleanup function
    return () => {
      preloadLinks.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
      preloadVideos.forEach((video) => {
        if (video.parentNode) {
          video.parentNode.removeChild(video);
        }
      });
    };
  }, [video]);

  // Use hovered index if available, otherwise use selected index
  const displayIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex;
  const selectedMedia = allMedia[displayIndex];

  // Preload the main video element when it's a video
  useEffect(() => {
    if (selectedMedia.type === 'video' && mainVideoRef.current) {
      const videoElement = mainVideoRef.current;
      const videoSrc = selectedMedia.src;
      
      // Set source and preload
      if (videoElement.src !== videoSrc) {
        videoElement.src = videoSrc;
        videoElement.load(); // Start loading immediately
      } else if (videoElement.readyState < 3) {
        // If source is same but not loaded, load it
        videoElement.load();
      }
    }
  }, [selectedMedia.type, selectedMedia.src]);

  // Handle video autoplay when hovering over video thumbnails
  useEffect(() => {
    if (hoveredIndex !== null && allMedia[hoveredIndex]?.type === 'video' && mainVideoRef.current) {
      const videoElement = mainVideoRef.current;
      const videoSrc = allMedia[hoveredIndex].src;
      
      // Ensure video source is set
      if (videoElement.src !== videoSrc) {
        videoElement.src = videoSrc;
        videoElement.load(); // Load the new source
      }

      // Wait for video to be ready before playing
      const playVideo = () => {
        if (videoElement.readyState >= 3) {
          // Video is ready, play it immediately
          videoElement.play().catch(() => {
            // Ignore autoplay errors
          });
        } else {
          // Wait for video to be ready
          const handleCanPlay = () => {
            videoElement.play().catch(() => {
              // Ignore autoplay errors
            });
          };
          videoElement.addEventListener('canplay', handleCanPlay, { once: true });
        }
      };

      playVideo();
    } else if (hoveredIndex === null && selectedMedia.type !== 'video' && mainVideoRef.current) {
      // When hover ends and selected media is not a video, pause the video
      mainVideoRef.current.pause();
    }
  }, [hoveredIndex, displayIndex, selectedMedia.type]);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    setHoveredIndex(null); // Clear hover when clicking
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
    setHoveredIndex(null); // Clear hover when navigating
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
    setHoveredIndex(null); // Clear hover when navigating
  };

  const handleImageClick = (index: number) => {
    // Open lightbox for both images and videos
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
  };

  const handleLightboxPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
  };

  const handleLightboxNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleLightboxClose();
      } else if (e.key === 'ArrowLeft') {
        handleLightboxPrevious();
      } else if (e.key === 'ArrowRight') {
        handleLightboxNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent body scroll when lightbox is open

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen, lightboxIndex, allMedia.length]);

  return (
    <div className="flex gap-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Image/Video Display */}
      <div className="relative flex-1 aspect-square overflow-hidden rounded-lg bg-accent/20 border border-border group">
        <AnimatePresence mode="wait">
          <motion.div
            key={displayIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {selectedMedia.type === 'video' ? (
              <video
                ref={setVideoRef}
                src={selectedMedia.src}
                controls
                className="max-w-full max-h-full w-auto h-auto object-contain"
                playsInline
                muted={hoveredIndex !== null}
                loop={hoveredIndex !== null}
                preload="auto"
                onLoadedData={() => {
                  // Video data is loaded, ensure it can play immediately on hover
                  if (hoveredIndex !== null && mainVideoRef.current) {
                    mainVideoRef.current.play().catch(() => {
                      // Ignore autoplay errors
                    });
                  }
                }}
              >
                {t('videoNotSupported')}
              </video>
            ) : (
              <button
                onClick={() => handleImageClick(displayIndex)}
                className="w-full h-full flex items-center justify-center"
                aria-label={t('openImagePreview')}
              >
                <Image
                  src={selectedMedia.src || '/images/placeholder.jpg'}
                  alt={productName}
                  width={800}
                  height={800}
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                  priority={displayIndex === 0}
                />
              </button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Fullscreen button for video */}
        {selectedMedia.type === 'video' && (
          <button
            onClick={() => handleImageClick(displayIndex)}
            className={`absolute bottom-4 z-20 rounded-full bg-black/70 hover:bg-black/90 p-2 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white ${isRTL ? 'left-4' : 'right-4'}`}
            aria-label={t('openVideoPreview')}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>
        )}

        {/* Navigation Arrows */}
        {allMedia.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className={`absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 p-2 shadow-lg opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary ${isRTL ? 'right-2' : 'left-2'}`}
              aria-label={t('previousImage')}
            >
              <svg
                className={`h-3.5 w-3.5 text-primary ${isRTL ? 'rotate-180' : ''}`}
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
              className={`absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 p-2 shadow-lg opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary ${isRTL ? 'left-2' : 'right-2'}`}
              aria-label={t('nextImage')}
            >
              <svg
                className={`h-3.5 w-3.5 text-primary ${isRTL ? 'rotate-180' : ''}`}
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
            {t('video')}
          </div>
        )}

      </div>

      {/* Thumbnail Navigation - Vertical on Right */}
      {allMedia.length > 1 && (
        <div className="flex flex-col gap-2 overflow-y-auto pb-2 scrollbar-hide max-h-[600px]">
          {allMedia.map((media, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex-shrink-0 aspect-square w-12 overflow-hidden rounded-lg border-2 transition-all ${
                selectedIndex === index
                  ? 'border-primary scale-105'
                  : 'border-border hover:border-secondary'
              }`}
            >
              {media.type === 'video' ? (
                <div className="relative h-full w-full bg-accent/20 overflow-hidden">
                  <video
                    src={media.src}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    preload="auto"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                    <svg
                      className="h-4 w-4 text-white drop-shadow-lg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className={`absolute top-0.5 ${isRTL ? 'left-0.5' : 'right-0.5'} rounded bg-black/70 px-1 py-0.5 text-[10px] font-medium text-white z-10 pointer-events-none`}>
                    {t('video')}
                  </div>
                </div>
              ) : (
                <Image
                  src={media.src || '/images/placeholder.jpg'}
                  alt={`${productName} - ${t('imageView')} ${index + 1}`}
                  width={48}
                  height={48}
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && allMedia[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={handleLightboxClose}
          >
            {/* Close Button */}
            <button
              onClick={handleLightboxClose}
              className={`absolute top-4 z-10 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white ${isRTL ? 'left-4' : 'right-4'}`}
              aria-label={t('close')}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation Buttons */}
            {allMedia.length > 1 && (
              <>
                <button
                  onClick={handleLightboxPrevious}
                  className={`absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white ${isRTL ? 'right-4' : 'left-4'}`}
                  aria-label={t('previousImage')}
                >
                  <svg
                    className={`h-6 w-6 ${isRTL ? 'rotate-180' : ''}`}
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
                  onClick={handleLightboxNext}
                  className={`absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white ${isRTL ? 'left-4' : 'right-4'}`}
                  aria-label={t('nextImage')}
                >
                  <svg
                    className={`h-6 w-6 ${isRTL ? 'rotate-180' : ''}`}
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

            {/* Media Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {allMedia[lightboxIndex].type === 'video' ? (
                <video
                  src={allMedia[lightboxIndex].src}
                  controls
                  autoPlay
                  className="max-w-full max-h-full w-auto h-auto"
                  playsInline
                >
                  {t('videoNotSupported')}
                </video>
              ) : (
                <Image
                  src={allMedia[lightboxIndex].src || '/images/placeholder.jpg'}
                  alt={`${productName} - ${t('imageView')} ${lightboxIndex + 1}`}
                  width={1200}
                  height={1200}
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                  priority
                />
              )}
            </motion.div>

            {/* Media Counter */}
            {allMedia.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
                {lightboxIndex + 1} / {allMedia.length}
              </div>
            )}

            {/* Video Indicator in Lightbox */}
            {allMedia[lightboxIndex].type === 'video' && (
              <div className={`absolute top-20 ${isRTL ? 'right-4' : 'left-4'} rounded-md bg-black/70 px-3 py-1.5 text-xs font-medium text-white`}>
                {t('video')}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

