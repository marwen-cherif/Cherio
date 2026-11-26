export type DistributionKeyId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface DistributionKey {
  id: DistributionKeyId;
  base: number;
  supportsFixedThirtyPercent?: boolean;
}

export type LotCategory = 'buildingA' | 'buildingB' | 'commerce' | 'buildingC' | 'parking';

export type TantiemesMap = Partial<Record<DistributionKeyId, number>>;

export interface ResidenceLot {
  id: number;
  category: LotCategory;
  note?: 'noElevator';
  tantiemes: TantiemesMap;
}

export type SelectionMode = 'lots' | 'manual';

export interface ExpenseItem {
  id: string;
  label: string;
  keyId: DistributionKeyId;
  amount: string;
  heatingFixedThirtyOnly: boolean;
}

export interface ExpenseCalculation {
  item: ExpenseItem;
  residenceAmount: number;
  applicableAmount: number;
  userTantiemes: number;
  baseTantiemes: number;
  shareRatio: number;
  userAmount: number;
  isConcerned: boolean;
}

export interface CalculationTotals {
  totalResidenceAmount: number;
  totalApplicableAmount: number;
  totalUserAmount: number;
  effectiveShareRatio: number;
}
