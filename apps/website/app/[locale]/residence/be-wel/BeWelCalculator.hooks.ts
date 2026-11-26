'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { RESIDENCE_LOTS } from './BeWelCalculator.data';
import type {
  DistributionKeyId,
  ExpenseItem,
  LotCategory,
  SelectionMode,
} from './BeWelCalculator.types';
import {
  calculateAllExpenses,
  filterLots,
  formatEuro,
  formatInteger,
  formatPercent,
  getSelectedLots,
} from './BeWelCalculator.utils';

const STORAGE_KEY = 'cherio-be-wel-calculator-v1';

interface PersistedState {
  selectionMode: SelectionMode;
  selectedLotIds: number[];
  manualTantiemes: string;
  expenses: ExpenseItem[];
}

function createEmptyExpense(index: number): ExpenseItem {
  return {
    id: `expense-${Date.now()}-${index}`,
    label: '',
    keyId: 1,
    amount: '',
    heatingFixedThirtyOnly: false,
  };
}

function parsePersistedState(raw: string | null): Partial<PersistedState> | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    const data = parsed as Record<string, unknown>;
    const result: Partial<PersistedState> = {};

    if (data.selectionMode === 'lots' || data.selectionMode === 'manual') {
      result.selectionMode = data.selectionMode;
    }
    if (Array.isArray(data.selectedLotIds)) {
      result.selectedLotIds = data.selectedLotIds.filter(
        (id): id is number => typeof id === 'number' && Number.isInteger(id)
      );
    }
    if (typeof data.manualTantiemes === 'string') {
      result.manualTantiemes = data.manualTantiemes;
    }
    if (Array.isArray(data.expenses) && data.expenses.length > 0) {
      const validExpenses = data.expenses.filter(
        (item): item is ExpenseItem =>
          Boolean(item) &&
          typeof item === 'object' &&
          typeof (item as ExpenseItem).id === 'string' &&
          typeof (item as ExpenseItem).label === 'string' &&
          typeof (item as ExpenseItem).keyId === 'number' &&
          typeof (item as ExpenseItem).amount === 'string'
      );
      if (validExpenses.length > 0) {
        result.expenses = validExpenses.map((item) => ({
          ...item,
          heatingFixedThirtyOnly: Boolean(item.heatingFixedThirtyOnly),
        }));
      }
    }
    return result;
  } catch {
    return null;
  }
}

export function useBeWelCalculator(locale: string) {
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('lots');
  const [selectedLotIds, setSelectedLotIds] = useState<number[]>([1]);
  const [manualTantiemes, setManualTantiemes] = useState<string>('100');
  const [categoryFilter, setCategoryFilter] = useState<LotCategory | 'all'>('all');
  const [lotSearch, setLotSearch] = useState<string>('');
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: 'expense-initial-1', label: '', keyId: 1, amount: '1000', heatingFixedThirtyOnly: false },
  ]);
  const [copied, setCopied] = useState<boolean>(false);
  const hasLoadedStorage = useRef(false);

  useEffect(() => {
    const saved = parsePersistedState(window.localStorage.getItem(STORAGE_KEY));
    if (saved) {
      if (saved.selectionMode) setSelectionMode(saved.selectionMode);
      if (saved.selectedLotIds) setSelectedLotIds(saved.selectedLotIds);
      if (saved.manualTantiemes !== undefined) setManualTantiemes(saved.manualTantiemes);
      if (saved.expenses) setExpenses(saved.expenses);
    }
    hasLoadedStorage.current = true;
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage.current) return;
    const payload: PersistedState = {
      selectionMode,
      selectedLotIds,
      manualTantiemes,
      expenses,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota or private browsing errors
    }
  }, [selectionMode, selectedLotIds, manualTantiemes, expenses]);

  const selectedLots = useMemo(() => getSelectedLots(selectedLotIds), [selectedLotIds]);

  const filteredLots = useMemo(
    () => filterLots(RESIDENCE_LOTS, categoryFilter, lotSearch),
    [categoryFilter, lotSearch]
  );

  const calculation = useMemo(
    () => calculateAllExpenses(expenses, selectionMode, selectedLots, manualTantiemes),
    [expenses, selectionMode, selectedLots, manualTantiemes]
  );

  const toggleLot = (lotId: number) => {
    setSelectedLotIds((prev) =>
      prev.includes(lotId)
        ? prev.filter((id) => id !== lotId)
        : [...prev, lotId].sort((a, b) => a - b)
    );
  };

  const clearLots = () => setSelectedLotIds([]);

  const addExpense = () => {
    setExpenses((prev) => [...prev, createEmptyExpense(prev.length + 1)]);
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) => (prev.length > 1 ? prev.filter((item) => item.id !== id) : prev));
  };

  const updateExpense = (
    id: string,
    patch: Partial<Pick<ExpenseItem, 'label' | 'keyId' | 'amount' | 'heatingFixedThirtyOnly'>>
  ) => {
    setExpenses((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextKeyId: DistributionKeyId = patch.keyId ?? item.keyId;
        return {
          ...item,
          ...patch,
          heatingFixedThirtyOnly:
            nextKeyId === 11
              ? (patch.heatingFixedThirtyOnly ?? item.heatingFixedThirtyOnly)
              : false,
        };
      })
    );
  };

  const resetExpenses = () => {
    setExpenses([createEmptyExpense(1)]);
  };

  const copySummary = async (keyNames: Record<DistributionKeyId, string>) => {
    const lotDesc =
      selectionMode === 'manual'
        ? `Tantièmes: ${manualTantiemes}`
        : `Lots: ${selectedLots.map((l) => l.id).join(', ') || '-'}`;

    const lines = calculation.rows.map((row, idx) => {
      const name = row.item.label.trim() || `#${idx + 1}`;
      const keyLabel = `${row.item.keyId}. ${keyNames[row.item.keyId]}`;
      return `- ${name} [${keyLabel}] : ${formatEuro(row.residenceAmount, locale)} → ${formatInteger(row.userTantiemes, locale)}/${formatInteger(row.baseTantiemes, locale)} (${formatPercent(row.shareRatio, locale)}) = ${formatEuro(row.userAmount, locale)}`;
    });

    const text = [
      `Be-Well (${lotDesc})`,
      ...lines,
      `Total : ${formatEuro(calculation.totals.totalUserAmount, locale)} / ${formatEuro(calculation.totals.totalResidenceAmount, locale)}`,
    ].join('\n');

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return {
    selectionMode,
    setSelectionMode,
    selectedLotIds,
    selectedLots,
    filteredLots,
    manualTantiemes,
    setManualTantiemes,
    categoryFilter,
    setCategoryFilter,
    lotSearch,
    setLotSearch,
    expenses,
    calculation,
    copied,
    toggleLot,
    clearLots,
    addExpense,
    removeExpense,
    updateExpense,
    resetExpenses,
    copySummary,
  };
}
