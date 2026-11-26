'use client';

import { useBeWelCalculator } from './BeWelCalculator.hooks';
import CalculationSummary from './CalculationSummary';
import ExpenseList from './ExpenseList';
import LotSelector from './LotSelector';

interface BeWelCalculatorProps {
  locale: string;
}

export default function BeWelCalculator({ locale }: BeWelCalculatorProps) {
  const {
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
  } = useBeWelCalculator(locale);

  return (
    <div className="space-y-6">
      <LotSelector
        selectionMode={selectionMode}
        selectedLotIds={selectedLotIds}
        selectedLots={selectedLots}
        filteredLots={filteredLots}
        categoryFilter={categoryFilter}
        lotSearch={lotSearch}
        manualTantiemes={manualTantiemes}
        onModeChange={setSelectionMode}
        onCategoryChange={setCategoryFilter}
        onSearchChange={setLotSearch}
        onToggleLot={toggleLot}
        onClearLots={clearLots}
        onManualTantiemesChange={setManualTantiemes}
      />

      <ExpenseList
        expenses={expenses}
        onAdd={addExpense}
        onRemove={removeExpense}
        onUpdate={updateExpense}
        onReset={resetExpenses}
      />

      <CalculationSummary
        locale={locale}
        rows={calculation.rows}
        totals={calculation.totals}
        copied={copied}
        onCopySummary={copySummary}
      />
    </div>
  );
}
