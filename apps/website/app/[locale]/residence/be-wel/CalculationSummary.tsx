'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { DISTRIBUTION_KEYS } from './BeWelCalculator.data';
import type {
  CalculationTotals,
  DistributionKeyId,
  ExpenseCalculation,
} from './BeWelCalculator.types';
import { formatEuro, formatInteger, formatPercent } from './BeWelCalculator.utils';

interface CalculationSummaryProps {
  locale: string;
  rows: readonly ExpenseCalculation[];
  totals: CalculationTotals;
  copied: boolean;
  onCopySummary: (keyNames: Record<DistributionKeyId, string>) => void;
}

export default function CalculationSummary({
  locale,
  rows,
  totals,
  copied,
  onCopySummary,
}: CalculationSummaryProps) {
  const t = useTranslations('beWel');
  const [showReference, setShowReference] = useState(false);

  const handleCopy = () => {
    const keyNames = Object.fromEntries(
      DISTRIBUTION_KEYS.map((k) => [k.id, t(`keys.${k.id}`)])
    ) as Record<DistributionKeyId, string>;
    onCopySummary(keyNames);
  };

  return (
    <section className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{t('summaryTitle')}</h2>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg border border-gray-300 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          {copied ? t('copiedSummary') : t('copySummary')}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-medium text-gray-500">{t('totalResidenceLabel')}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {formatEuro(totals.totalResidenceAmount, locale)}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-medium text-gray-500">{t('totalApplicableLabel')}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {formatEuro(totals.totalApplicableAmount, locale)}
          </p>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-xs font-medium text-blue-700">{t('totalUserLabel')}</p>
          <p className="mt-1 text-2xl font-bold text-blue-900">
            {formatEuro(totals.totalUserAmount, locale)}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-medium text-gray-500">{t('effectiveShareLabel')}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {formatPercent(totals.effectiveShareRatio, locale)}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-800">{t('breakdownTitle')}</h3>
        {totals.totalResidenceAmount === 0 ? (
          <p className="rounded-lg border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">
            {t('emptySummaryHint')}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase text-gray-500">
                  <th className="py-2 pr-4 font-medium">{t('tableExpense')}</th>
                  <th className="py-2 pr-4 font-medium">{t('tableKey')}</th>
                  <th className="py-2 pr-4 font-medium">{t('tableTantiemes')}</th>
                  <th className="py-2 pr-4 font-medium">{t('tableShare')}</th>
                  <th className="py-2 text-right font-medium">{t('tableAmount')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row, idx) => (
                  <tr key={row.item.id} className="text-gray-800">
                    <td className="py-2.5 pr-4 font-medium">
                      {row.item.label.trim() || t('defaultExpenseLabel', { index: idx + 1 })}
                      <span className="block text-xs font-normal text-gray-500">
                        {formatEuro(row.residenceAmount, locale)}
                        {row.item.keyId === 11 && row.item.heatingFixedThirtyOnly
                          ? ` → 30% (${formatEuro(row.applicableAmount, locale)})`
                          : ''}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-gray-600">
                      {row.item.keyId}. {t(`keys.${row.item.keyId}`)}
                    </td>
                    <td className="py-2.5 pr-4">
                      {row.isConcerned ? (
                        <span>
                          {formatInteger(row.userTantiemes, locale)} /{' '}
                          {formatInteger(row.baseTantiemes, locale)}
                        </span>
                      ) : (
                        <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                          {t('notConcerned')}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 pr-4">{formatPercent(row.shareRatio, locale)}</td>
                    <td className="py-2.5 text-right font-semibold text-gray-900">
                      {formatEuro(row.userAmount, locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <button
          type="button"
          onClick={() => setShowReference((prev) => !prev)}
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          {showReference ? '▾ ' : '▸ '}
          {t('referenceToggle')}
        </button>

        {showReference && (
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
              <p className="font-semibold">{t('legalNoteTitle')}</p>
              <p className="mt-1 leading-relaxed">{t('legalNoteBody')}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="py-1.5 pr-3">{t('referenceCol')}</th>
                    <th className="py-1.5 pr-3">{t('referenceObject')}</th>
                    <th className="py-1.5 text-right">{t('referenceBase')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {DISTRIBUTION_KEYS.map((key) => (
                    <tr key={key.id} className="text-gray-700">
                      <td className="py-1.5 pr-3 font-semibold">{key.id}</td>
                      <td className="py-1.5 pr-3">{t(`keys.${key.id}`)}</td>
                      <td className="py-1.5 text-right font-medium">
                        {formatInteger(key.base, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
