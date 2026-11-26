'use client';

import { useTranslations } from 'next-intl';
import { DISTRIBUTION_KEYS } from './BeWelCalculator.data';
import type { DistributionKeyId, ExpenseItem } from './BeWelCalculator.types';

interface ExpenseListProps {
  expenses: readonly ExpenseItem[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (
    id: string,
    patch: Partial<Pick<ExpenseItem, 'label' | 'keyId' | 'amount' | 'heatingFixedThirtyOnly'>>
  ) => void;
  onReset: () => void;
}

export default function ExpenseList({
  expenses,
  onAdd,
  onRemove,
  onUpdate,
  onReset,
}: ExpenseListProps) {
  const t = useTranslations('beWel');

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{t('stepExpensesTitle')}</h2>
          <p className="text-sm text-gray-600">{t('stepExpensesSubtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            {t('resetExpenses')}
          </button>
          <button
            type="button"
            onClick={onAdd}
            className="rounded-lg bg-gray-900 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            + {t('addExpense')}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {expenses.map((expense, index) => (
          <div key={expense.id} className="rounded-lg border border-gray-200 bg-gray-50/60 p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
              <div className="md:col-span-4">
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  {t('expenseNameLabel')} #{index + 1}
                </label>
                <input
                  type="text"
                  value={expense.label}
                  onChange={(e) => onUpdate(expense.id, { label: e.target.value })}
                  placeholder={t('expenseNamePlaceholder')}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-5">
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  {t('expenseKeyLabel')}
                </label>
                <select
                  value={expense.keyId}
                  onChange={(e) =>
                    onUpdate(expense.id, {
                      keyId: Number(e.target.value) as DistributionKeyId,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                >
                  {DISTRIBUTION_KEYS.map((key) => (
                    <option key={key.id} value={key.id}>
                      {key.id}. {t(`keys.${key.id}`)} (/{key.base})
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  {t('expenseAmountLabel')}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={expense.amount}
                  onChange={(e) => onUpdate(expense.id, { amount: e.target.value })}
                  placeholder={t('expenseAmountPlaceholder')}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end md:col-span-1">
                <button
                  type="button"
                  onClick={() => onRemove(expense.id)}
                  disabled={expenses.length <= 1}
                  aria-label={t('removeExpense')}
                  className="rounded-lg border border-gray-300 bg-white px-2.5 py-2 text-xs font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ✕
                </button>
              </div>
            </div>

            {expense.keyId === 11 && (
              <div className="mt-3 flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
                <input
                  id={`heating-30-${expense.id}`}
                  type="checkbox"
                  checked={expense.heatingFixedThirtyOnly}
                  onChange={(e) =>
                    onUpdate(expense.id, { heatingFixedThirtyOnly: e.target.checked })
                  }
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <label htmlFor={`heating-30-${expense.id}`} className="text-xs text-amber-900">
                  <span className="block font-medium">{t('heatingThirtyLabel')}</span>
                  <span className="text-amber-800">{t('heatingThirtyHint')}</span>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
