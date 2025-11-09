'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { PickupPoint } from '@shared/index';
import { Button } from '@/components/ui/Button';
import { ButtonSize } from '@/components/ui/button.types';
import { Card } from '@/components/ui/Card';
import { useClientStore } from '@/stores/clientStore';
import { useIsRTL } from '@/hooks/useLocale';
import { pickupPointSearchSchema, type PickupPointSearchData } from './PickupPointSelector.schema';
import { useTranslations } from 'next-intl';
import { geocodeAddress } from '@/utils/geocoding';

// Dynamically import the map component to avoid SSR issues
const PickupPointMap = dynamic(() => import('./PickupPointMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] rounded-lg border border-border bg-accent/10 flex items-center justify-center">
      <p className="text-secondary">Chargement de la carte...</p>
    </div>
  ),
});

interface PickupPointSelectorProps {
  initialData?: PickupPoint;
  onSave: (point: PickupPoint) => void;
  onCancel: () => void;
  initialIsOpen?: boolean;
}

// Mock data for pickup points
const generateMockPickupPoints = (searchAddress?: string): PickupPoint[] => {
  const basePoints: PickupPoint[] = [
    {
      id: '1',
      name: 'Relais Colis - Centre Commercial',
      address: '123 Rue de la République',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
      latitude: 48.8566,
      longitude: 2.3522,
      openingHours: 'Lun-Ven: 9h-19h, Sam: 10h-18h',
      phone: '+33 1 23 45 67 89',
      distance: 0.5,
    },
    {
      id: '2',
      name: 'Point Relais - Gare du Nord',
      address: '456 Boulevard de Denain',
      city: 'Paris',
      postalCode: '75010',
      country: 'France',
      latitude: 48.8809,
      longitude: 2.3553,
      openingHours: 'Lun-Dim: 6h-23h',
      phone: '+33 1 23 45 67 90',
      distance: 1.2,
    },
    {
      id: '3',
      name: 'Mondial Relay - Montmartre',
      address: '789 Rue Lepic',
      city: 'Paris',
      postalCode: '75018',
      country: 'France',
      latitude: 48.8867,
      longitude: 2.3431,
      openingHours: 'Lun-Sam: 9h-20h',
      phone: '+33 1 23 45 67 91',
      distance: 2.1,
    },
    {
      id: '4',
      name: 'Relais Colis - Châtelet',
      address: '321 Rue de Rivoli',
      city: 'Paris',
      postalCode: '75004',
      country: 'France',
      latitude: 48.8584,
      longitude: 2.3469,
      openingHours: 'Lun-Sam: 10h-19h',
      phone: '+33 1 23 45 67 92',
      distance: 0.8,
    },
    {
      id: '5',
      name: 'Point Relais - Bastille',
      address: '654 Boulevard Richard Lenoir',
      city: 'Paris',
      postalCode: '75011',
      country: 'France',
      latitude: 48.8532,
      longitude: 2.3697,
      openingHours: 'Lun-Ven: 8h-20h, Sam: 9h-18h',
      phone: '+33 1 23 45 67 93',
      distance: 1.5,
    },
  ];

  // Generate more points for infinite scroll
  const additionalPoints: PickupPoint[] = Array.from({ length: 20 }, (_, i) => ({
    id: `${basePoints.length + i + 1}`,
    name: `Point Relais ${basePoints.length + i + 1}`,
    address: `${100 + i * 10} Rue Example`,
    city: 'Paris',
    postalCode: `7500${(i % 9) + 1}`,
    country: 'France',
    latitude: 48.8566 + (Math.random() - 0.5) * 0.1,
    longitude: 2.3522 + (Math.random() - 0.5) * 0.1,
    openingHours: 'Lun-Ven: 9h-19h',
    phone: `+33 1 23 45 67 ${90 + i}`,
    distance: 2 + i * 0.3,
  }));

  return [...basePoints, ...additionalPoints];
};

export default function PickupPointSelector({
  initialData,
  onSave,
  onCancel,
  initialIsOpen = true,
}: PickupPointSelectorProps) {
  const t = useTranslations('cart');
  // Get isRTL from store
  const isRTL = useIsRTL();

  // Get pickup point from store
  const storePickupPoint = useClientStore((state) => state.pickupPoint);
  const setPickupPoint = useClientStore((state) => state.setPickupPoint);

  // Use store data if available, otherwise use initialData prop
  const savedPoint = storePickupPoint || initialData;

  // Determine initial open state: if we have saved data, start collapsed
  const cardInitialIsOpen = savedPoint ? false : initialIsOpen;

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<PickupPointSearchData>({
    resolver: zodResolver(pickupPointSearchSchema),
    defaultValues: {
      searchAddress: '',
    },
  });

  const searchAddress = watch('searchAddress');
  const { ref, ...searchAddressRegister } = register('searchAddress');

  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<PickupPoint | null>(savedPoint || null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedPoints, setDisplayedPoints] = useState<PickupPoint[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const itemsPerPage = 10;

  // Mock coordinates for search address (in real app, use geocoding API)
  const [searchCoordinates, setSearchCoordinates] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // Update selectedPoint when savedPoint changes
  useEffect(() => {
    if (savedPoint) {
      setSelectedPoint(savedPoint);
    }
  }, [savedPoint]);

  // Track if card is open for focus management
  const [isCardOpen, setIsCardOpen] = useState(cardInitialIsOpen);

  // Focus on search input when card opens and input is empty
  useEffect(() => {
    if (isCardOpen && searchInputRef.current && !searchAddress) {
      // Small delay to ensure the component is fully rendered
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isCardOpen, searchAddress]);

  // Load pickup points and set search coordinates with debounce
  useEffect(() => {
    // Debounce the geocoding to avoid too many API calls
    const debounceTimer = setTimeout(() => {
      setIsLoading(true);
      
      // Geocode the search address
      const geocodeSearch = async () => {
        if (searchAddress && searchAddress.trim()) {
          try {
            const geocodeResult = await geocodeAddress(searchAddress);
            if (geocodeResult) {
              setSearchCoordinates({
                lat: geocodeResult.lat,
                lng: geocodeResult.lng,
              });
            } else {
              // If geocoding fails, clear coordinates
              setSearchCoordinates(null);
            }
          } catch (error) {
            console.error('Error geocoding address:', error);
            setSearchCoordinates(null);
          }
        } else {
          setSearchCoordinates(null);
        }
      };

      // Simulate API call for pickup points
      const loadPickupPoints = async () => {
        // Small delay to show loading state
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        const points = generateMockPickupPoints(searchAddress);
        setPickupPoints(points);
        setDisplayedPoints(points.slice(0, itemsPerPage));
        setPage(1);
        setHasMore(points.length > itemsPerPage);
        setIsLoading(false);
      };

      // Run geocoding and loading in parallel
      Promise.all([geocodeSearch(), loadPickupPoints()]);
    }, 500); // 500ms debounce

    return () => clearTimeout(debounceTimer);
  }, [searchAddress]);

  // Infinite scroll observer
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const nextPage = page + 1;
          const startIndex = page * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const nextPoints = pickupPoints.slice(startIndex, endIndex);
          if (nextPoints.length > 0) {
            setDisplayedPoints((prev) => [...prev, ...nextPoints]);
            setPage(nextPage);
            setHasMore(endIndex < pickupPoints.length);
          } else {
            setHasMore(false);
          }
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore, page, pickupPoints]
  );

  const handleSelectPoint = (point: PickupPoint) => {
    setSelectedPoint(point);
  };

  const handleSave = () => {
    if (selectedPoint) {
      // Save to Zustand store
      setPickupPoint(selectedPoint);
      // Also call the onSave callback for backward compatibility
      onSave(selectedPoint);
    }
  };

  // Summary content to show when collapsed
  const summaryContent = savedPoint ? (
    <>
      <p className="font-medium text-primary">{savedPoint.name}</p>
      <p>{savedPoint.address}</p>
      <p>
        {savedPoint.postalCode} {savedPoint.city}
      </p>
      {savedPoint.openingHours && (
        <p className="text-sm mt-2">
          <span className="font-medium">{t('pickupPointForm.openingHours')}:</span>{' '}
          {savedPoint.openingHours}
        </p>
      )}
    </>
  ) : undefined;

  return (
    <Card
      title={t('pickupPointForm.selectPickupPoint')}
      initialIsOpen={cardInitialIsOpen}
      summary={summaryContent}
      editLabel={t('editDeliveryInfo')}
      onToggle={(isOpen) => setIsCardOpen(isOpen)}
    >
      <div className="mb-4">
        <label htmlFor="address-search" className="block text-sm font-medium text-primary mb-2">
          {t('pickupPointForm.searchAddress')}
        </label>
        <input
          {...searchAddressRegister}
          ref={(e) => {
            ref(e);
            searchInputRef.current = e;
          }}
          type="text"
          id="address-search"
          placeholder={t('pickupPointForm.searchAddress')}
          className={`w-full rounded-md border ${
            errors.searchAddress ? 'border-red-500' : 'border-border'
          } px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
        {errors.searchAddress && (
          <p className="mt-1 text-sm text-red-600">{errors.searchAddress.message}</p>
        )}
      </div>

      {/* Content Grid: List on left, Map on right (desktop only) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pickup Points List */}
        <div className="space-y-4">
          {isLoading && displayedPoints.length === 0 ? (
            <div className="text-center py-8 text-secondary">{t('pickupPointForm.loading')}</div>
          ) : displayedPoints.length === 0 ? (
            <div className="text-center py-8 text-secondary">
              {t('pickupPointForm.noPickupPoints')}
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {displayedPoints.map((point, index) => (
                <div
                  key={point.id}
                  ref={index === displayedPoints.length - 1 ? lastElementRef : null}
                  onClick={() => handleSelectPoint(point)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPoint?.id === point.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-semibold text-primary mb-1">{point.name}</h5>
                      <p className="text-sm text-secondary mb-1">{point.address}</p>
                      <p className="text-sm text-secondary">
                        {point.postalCode} {point.city}
                      </p>
                      {point.distance !== undefined && (
                        <p className="text-sm text-primary mt-2">
                          {t('pickupPointForm.distance')}: {point.distance.toFixed(1)}{' '}
                          {t('pickupPointForm.km')}
                        </p>
                      )}
                      {point.openingHours && (
                        <p className="text-xs text-secondary mt-1">
                          {t('pickupPointForm.openingHours')}: {point.openingHours}
                        </p>
                      )}
                      {point.phone && (
                        <p className="text-xs text-secondary mt-1">
                          {t('pickupPointForm.phone')}: {point.phone}
                        </p>
                      )}
                    </div>
                    {selectedPoint?.id === point.id && (
                      <div className="ml-2 text-primary">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div ref={loadingRef} className="text-center py-4 text-secondary">
                  {t('pickupPointForm.loading')}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Interactive Map (Desktop only) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 h-[600px] rounded-lg border border-border overflow-hidden">
            <PickupPointMap
              selectedPoint={selectedPoint}
              searchAddress={searchAddress}
              searchCoordinates={searchCoordinates}
              pickupPoints={displayedPoints}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <Button onClick={onCancel} variant="secondary" size={ButtonSize.Small} isRTL={isRTL}>
          {t('chooseAnotherDeliveryMethod')}
        </Button>
        {selectedPoint && (
          <Button onClick={handleSave} variant="primary" size={ButtonSize.Small} isRTL={isRTL}>
            {t('pickupPointForm.save')}
          </Button>
        )}
      </div>
    </Card>
  );
}
