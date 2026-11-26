import { DISTRIBUTION_KEYS, RESIDENCE_LOTS } from './BeWelCalculator.data';
import type {
  CalculationTotals,
  DistributionKey,
  DistributionKeyId,
  ExpenseCalculation,
  ExpenseItem,
  LotCategory,
  ResidenceLot,
  SelectionMode,
} from './BeWelCalculator.types';

export function getDistributionKey(keyId: DistributionKeyId): DistributionKey {
  return DISTRIBUTION_KEYS.find((k) => k.id === keyId) ?? DISTRIBUTION_KEYS[0];
}

export function parsePositiveNumber(raw: string): number {
  const normalized = raw.replace(',', '.').replace(/[^\d.]/g, '');
  const parsed = Number.parseFloat(normalized);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }
  return parsed;
}

export function getSelectedLots(selectedLotIds: readonly number[]): ResidenceLot[] {
  const idSet = new Set(selectedLotIds);
  return RESIDENCE_LOTS.filter((lot) => idSet.has(lot.id));
}

export function getTantiemesForKey(
  selectionMode: SelectionMode,
  selectedLots: readonly ResidenceLot[],
  manualTantiemes: string,
  keyId: DistributionKeyId
): number {
  if (selectionMode === 'manual') {
    return parsePositiveNumber(manualTantiemes);
  }
  return selectedLots.reduce((sum, lot) => sum + (lot.tantiemes[keyId] ?? 0), 0);
}

export function calculateExpenseShare(
  item: ExpenseItem,
  selectionMode: SelectionMode,
  selectedLots: readonly ResidenceLot[],
  manualTantiemes: string
): ExpenseCalculation {
  const key = getDistributionKey(item.keyId);
  const residenceAmount = parsePositiveNumber(item.amount);
  const useFixedThirty = Boolean(key.supportsFixedThirtyPercent && item.heatingFixedThirtyOnly);
  const applicableAmount = useFixedThirty ? residenceAmount * 0.3 : residenceAmount;
  const userTantiemes = getTantiemesForKey(
    selectionMode,
    selectedLots,
    manualTantiemes,
    item.keyId
  );
  const baseTantiemes = key.base;
  const shareRatio = baseTantiemes > 0 ? Math.min(userTantiemes / baseTantiemes, 1) : 0;
  const userAmount = applicableAmount * shareRatio;

  return {
    item,
    residenceAmount,
    applicableAmount,
    userTantiemes,
    baseTantiemes,
    shareRatio,
    userAmount,
    isConcerned: userTantiemes > 0,
  };
}

export function calculateAllExpenses(
  items: readonly ExpenseItem[],
  selectionMode: SelectionMode,
  selectedLots: readonly ResidenceLot[],
  manualTantiemes: string
): { rows: ExpenseCalculation[]; totals: CalculationTotals } {
  const rows = items.map((item) =>
    calculateExpenseShare(item, selectionMode, selectedLots, manualTantiemes)
  );

  const totalResidenceAmount = rows.reduce((sum, row) => sum + row.residenceAmount, 0);
  const totalApplicableAmount = rows.reduce((sum, row) => sum + row.applicableAmount, 0);
  const totalUserAmount = rows.reduce((sum, row) => sum + row.userAmount, 0);
  const effectiveShareRatio =
    totalApplicableAmount > 0 ? totalUserAmount / totalApplicableAmount : 0;

  return {
    rows,
    totals: {
      totalResidenceAmount,
      totalApplicableAmount,
      totalUserAmount,
      effectiveShareRatio,
    },
  };
}

export function filterLots(
  lots: readonly ResidenceLot[],
  category: LotCategory | 'all',
  query: string
): ResidenceLot[] {
  const trimmed = query.trim();
  return lots.filter((lot) => {
    if (category !== 'all' && lot.category !== category) {
      return false;
    }
    if (!trimmed) {
      return true;
    }
    return String(lot.id).includes(trimmed);
  });
}

export function formatEuro(value: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(ratio: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(ratio);
}

export function formatInteger(value: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    maximumFractionDigits: 2,
  }).format(value);
}
