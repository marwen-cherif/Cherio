'use client';

import { useTranslations } from 'next-intl';
import type { LotCategory, ResidenceLot, SelectionMode } from './BeWelCalculator.types';

interface LotSelectorProps {
  selectionMode: SelectionMode;
  selectedLotIds: readonly number[];
  selectedLots: readonly ResidenceLot[];
  filteredLots: readonly ResidenceLot[];
  categoryFilter: LotCategory | 'all';
  lotSearch: string;
  manualTantiemes: string;
  onModeChange: (mode: SelectionMode) => void;
  onCategoryChange: (category: LotCategory | 'all') => void;
  onSearchChange: (value: string) => void;
  onToggleLot: (lotId: number) => void;
  onClearLots: () => void;
  onManualTantiemesChange: (value: string) => void;
}

const CATEGORIES: readonly (LotCategory | 'all')[] = [
  'all',
  'buildingA',
  'buildingB',
  'commerce',
  'buildingC',
  'parking',
];

export default function LotSelector({
  selectionMode,
  selectedLotIds,
  selectedLots,
  filteredLots,
  categoryFilter,
  lotSearch,
  manualTantiemes,
  onModeChange,
  onCategoryChange,
  onSearchChange,
  onToggleLot,
  onClearLots,
  onManualTantiemesChange,
}: LotSelectorProps) {
  const t = useTranslations('beWel');

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{t('stepLotsTitle')}</h2>
          <p className="text-sm text-gray-600">{t('stepLotsSubtitle')}</p>
        </div>
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
          <button
            type="button"
            onClick={() => onModeChange('lots')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              selectionMode === 'lots'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            {t('modeLots')}
          </button>
          <button
            type="button"
            onClick={() => onModeChange('manual')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              selectionMode === 'manual'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            {t('modeManual')}
          </button>
        </div>
      </div>

      {selectionMode === 'manual' ? (
        <div className="max-w-md space-y-2">
          <label htmlFor="manual-tantiemes" className="block text-sm font-medium text-gray-700">
            {t('manualTantiemesLabel')}
          </label>
          <input
            id="manual-tantiemes"
            type="number"
            min="0"
            step="any"
            value={manualTantiemes}
            onChange={(e) => onManualTantiemesChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
          />
          <p className="text-xs text-gray-500">{t('manualTantiemesHint')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    categoryFilter === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(`categories.${category}`)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="search"
                value={lotSearch}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t('searchLotPlaceholder')}
                className="w-56 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
              />
              {selectedLotIds.length > 0 && (
                <button
                  type="button"
                  onClick={onClearLots}
                  className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  {t('clearLots')}
                </button>
              )}
            </div>
          </div>

          {selectedLots.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-900">
              <span className="font-semibold">
                {t('selectedLotsCount', { count: selectedLots.length })}:
              </span>
              {selectedLots.map((lot) => (
                <button
                  key={lot.id}
                  type="button"
                  onClick={() => onToggleLot(lot.id)}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 font-medium text-blue-800 shadow-xs ring-1 ring-blue-200 hover:bg-blue-100"
                >
                  <span>{t('lotLabel', { id: lot.id })}</span>
                  <span aria-hidden="true">×</span>
                </button>
              ))}
            </div>
          )}

          {filteredLots.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">{t('noLotsFound')}</p>
          ) : (
            <div className="grid max-h-60 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {filteredLots.map((lot) => {
                const isSelected = selectedLotIds.includes(lot.id);
                return (
                  <button
                    key={lot.id}
                    type="button"
                    onClick={() => onToggleLot(lot.id)}
                    className={`flex flex-col items-start rounded-lg border px-2.5 py-2 text-left text-xs ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-600'
                        : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-semibold">{t('lotLabel', { id: lot.id })}</span>
                    <span className="text-[11px] text-gray-500">
                      {t(`categories.${lot.category}`)}
                    </span>
                    <span className="mt-0.5 text-[11px] font-medium text-gray-700">
                      {lot.tantiemes[1] ?? 0} / 6000
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
