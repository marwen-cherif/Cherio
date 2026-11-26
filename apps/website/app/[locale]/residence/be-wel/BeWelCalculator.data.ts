import type {
  DistributionKey,
  DistributionKeyId,
  LotCategory,
  ResidenceLot,
  TantiemesMap,
} from './BeWelCalculator.types';

export const DISTRIBUTION_KEYS: readonly DistributionKey[] = [
  { id: 1, base: 6000 },
  { id: 2, base: 5850 },
  { id: 3, base: 1739 },
  { id: 4, base: 2380 },
  { id: 5, base: 2230 },
  { id: 6, base: 1561 },
  { id: 7, base: 1995 },
  { id: 8, base: 3969 },
  { id: 9, base: 2000 },
  { id: 10, base: 3000 },
  { id: 11, base: 3000, supportsFixedThirtyPercent: true },
  { id: 12, base: 3000 },
  { id: 13, base: 960 },
];

type Tuple13 = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

function toTantiemesMap(values: Tuple13): TantiemesMap {
  const map: TantiemesMap = {};
  values.forEach((value, index) => {
    if (value > 0) {
      map[(index + 1) as DistributionKeyId] = value;
    }
  });
  return map;
}

function lot(id: number, category: LotCategory, values: Tuple13): ResidenceLot {
  return {
    id,
    category,
    tantiemes: toTantiemesMap(values),
  };
}

function buildParkingRange(from: number, to: number, hasElevator: boolean): ResidenceLot[] {
  const values: Tuple13 = hasElevator
    ? [5, 5, 0, 0, 0, 0, 0, 0, 3, 4, 0, 0, 10]
    : [5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10];
  const result: ResidenceLot[] = [];
  for (let id = from; id <= to; id += 1) {
    result.push({
      id,
      category: 'parking',
      note: hasElevator ? undefined : 'noElevator',
      tantiemes: toTantiemesMap(values),
    });
  }
  return result;
}

export const RESIDENCE_LOTS: readonly ResidenceLot[] = [
  lot(1, 'buildingA', [30, 30, 30, 0, 0, 30, 0, 30, 0, 0, 18, 18, 0]),
  lot(2, 'buildingA', [22, 22, 22, 0, 0, 22, 0, 22, 0, 0, 12, 13, 0]),
  lot(3, 'buildingA', [39, 39, 39, 0, 0, 39, 0, 39, 0, 0, 22, 22, 0]),
  lot(4, 'buildingA', [27, 27, 27, 0, 0, 27, 0, 27, 0, 0, 15, 15, 0]),
  lot(5, 'buildingA', [24, 24, 24, 0, 0, 24, 0, 24, 0, 0, 15, 15, 0]),
  lot(6, 'buildingA', [84, 84, 84, 0, 0, 0, 0, 84, 0, 0, 49, 49, 0]),
  lot(7, 'buildingA', [94, 94, 94, 0, 0, 0, 0, 94, 0, 0, 54, 54, 0]),
  lot(8, 'buildingA', [43, 43, 43, 0, 0, 43, 0, 43, 42, 0, 25, 25, 0]),
  lot(9, 'buildingA', [77, 77, 77, 0, 0, 77, 0, 77, 75, 0, 44, 44, 0]),
  lot(10, 'buildingA', [76, 76, 76, 0, 0, 76, 0, 76, 74, 0, 44, 44, 0]),
  lot(11, 'buildingA', [21, 21, 21, 0, 0, 21, 0, 21, 21, 0, 12, 12, 0]),
  lot(12, 'buildingA', [63, 63, 63, 0, 0, 63, 0, 63, 61, 0, 36, 36, 0]),
  lot(13, 'buildingA', [95, 95, 95, 0, 0, 95, 0, 95, 92, 0, 54, 54, 0]),
  lot(14, 'buildingA', [44, 44, 44, 0, 0, 44, 0, 44, 53, 0, 25, 25, 0]),
  lot(15, 'buildingA', [78, 78, 78, 0, 0, 78, 0, 78, 93, 0, 44, 44, 0]),
  lot(16, 'buildingA', [77, 77, 77, 0, 0, 77, 0, 77, 93, 0, 44, 44, 0]),
  lot(17, 'buildingA', [22, 22, 22, 0, 0, 22, 0, 22, 26, 0, 12, 12, 0]),
  lot(18, 'buildingA', [65, 65, 65, 0, 0, 65, 0, 65, 76, 0, 36, 36, 0]),
  lot(19, 'buildingA', [97, 97, 97, 0, 0, 97, 0, 97, 115, 0, 54, 54, 0]),
  lot(20, 'buildingA', [45, 45, 45, 0, 0, 45, 0, 45, 63, 0, 25, 25, 0]),
  lot(21, 'buildingA', [80, 80, 80, 0, 0, 80, 0, 80, 112, 0, 44, 44, 0]),
  lot(22, 'buildingA', [79, 79, 79, 0, 0, 79, 0, 79, 112, 0, 44, 44, 0]),
  lot(23, 'buildingA', [22, 22, 22, 0, 0, 22, 0, 22, 31, 0, 12, 12, 0]),
  lot(24, 'buildingA', [66, 66, 66, 0, 0, 66, 0, 66, 92, 0, 36, 36, 0]),
  lot(25, 'buildingA', [99, 99, 99, 0, 0, 99, 0, 99, 138, 0, 54, 54, 0]),
  lot(26, 'buildingA', [25, 25, 25, 0, 0, 25, 0, 25, 37, 0, 12, 12, 0]),
  lot(27, 'buildingA', [96, 96, 96, 0, 0, 96, 0, 96, 145, 0, 49, 50, 0]),
  lot(28, 'buildingA', [61, 61, 61, 0, 0, 61, 0, 61, 94, 0, 32, 32, 0]),
  lot(29, 'buildingA', [88, 88, 88, 0, 0, 88, 0, 88, 133, 0, 45, 45, 0]),

  lot(30, 'buildingB', [40, 40, 0, 40, 40, 0, 40, 40, 0, 0, 26, 24, 0]),
  lot(31, 'buildingB', [23, 23, 0, 23, 23, 0, 23, 23, 0, 0, 15, 14, 0]),
  lot(32, 'buildingB', [23, 23, 0, 23, 23, 0, 23, 23, 0, 0, 15, 14, 0]),
  lot(33, 'buildingB', [55, 55, 0, 55, 55, 0, 0, 55, 0, 0, 34, 32, 0]),
  lot(34, 'buildingB', [83, 83, 0, 83, 83, 0, 0, 83, 0, 0, 53, 49, 0]),
  lot(35, 'buildingB', [97, 97, 0, 97, 97, 0, 0, 97, 0, 0, 58, 54, 0]),
  lot(36, 'buildingB', [47, 47, 0, 47, 47, 0, 47, 47, 0, 51, 27, 27, 0]),
  lot(37, 'buildingB', [21, 21, 0, 21, 21, 0, 21, 21, 0, 23, 12, 12, 0]),
  lot(38, 'buildingB', [75, 75, 0, 75, 75, 0, 75, 75, 0, 84, 44, 44, 0]),
  lot(39, 'buildingB', [77, 77, 0, 77, 77, 0, 77, 77, 0, 83, 44, 44, 0]),
  lot(40, 'buildingB', [22, 22, 0, 22, 22, 0, 22, 22, 0, 24, 12, 13, 0]),
  lot(41, 'buildingB', [77, 77, 0, 77, 77, 0, 77, 77, 0, 81, 43, 43, 0]),
  lot(42, 'buildingB', [63, 63, 0, 63, 63, 0, 63, 63, 0, 66, 35, 35, 0]),
  lot(43, 'buildingB', [50, 50, 0, 50, 50, 0, 50, 50, 0, 53, 28, 28, 0]),
  lot(44, 'buildingB', [49, 49, 0, 49, 49, 0, 49, 49, 0, 53, 28, 28, 0]),
  lot(45, 'buildingB', [48, 48, 0, 48, 48, 0, 48, 48, 0, 63, 27, 27, 0]),
  lot(46, 'buildingB', [21, 21, 0, 21, 21, 0, 21, 21, 0, 29, 12, 12, 0]),
  lot(47, 'buildingB', [76, 76, 0, 76, 76, 0, 76, 76, 0, 105, 44, 44, 0]),
  lot(48, 'buildingB', [79, 79, 0, 79, 79, 0, 79, 79, 0, 104, 44, 44, 0]),
  lot(49, 'buildingB', [23, 23, 0, 23, 23, 0, 23, 23, 0, 30, 12, 13, 0]),
  lot(50, 'buildingB', [79, 79, 0, 79, 79, 0, 79, 79, 0, 102, 43, 43, 0]),
  lot(51, 'buildingB', [64, 64, 0, 64, 64, 0, 64, 64, 0, 83, 35, 35, 0]),
  lot(52, 'buildingB', [51, 51, 0, 51, 51, 0, 51, 51, 0, 66, 28, 28, 0]),
  lot(53, 'buildingB', [50, 50, 0, 50, 50, 0, 50, 50, 0, 66, 28, 28, 0]),
  lot(54, 'buildingB', [49, 49, 0, 49, 49, 0, 49, 49, 0, 76, 27, 27, 0]),
  lot(55, 'buildingB', [21, 21, 0, 21, 21, 0, 21, 21, 0, 35, 12, 12, 0]),
  lot(56, 'buildingB', [78, 78, 0, 78, 78, 0, 78, 78, 0, 126, 44, 44, 0]),
  lot(57, 'buildingB', [81, 81, 0, 81, 81, 0, 81, 81, 0, 125, 44, 44, 0]),
  lot(58, 'buildingB', [23, 23, 0, 23, 23, 0, 23, 23, 0, 35, 12, 13, 0]),
  lot(59, 'buildingB', [80, 80, 0, 80, 80, 0, 80, 80, 0, 122, 43, 43, 0]),
  lot(60, 'buildingB', [65, 65, 0, 65, 65, 0, 65, 65, 0, 100, 35, 35, 0]),
  lot(61, 'buildingB', [52, 52, 0, 52, 52, 0, 52, 52, 0, 79, 28, 28, 0]),
  lot(62, 'buildingB', [51, 51, 0, 51, 51, 0, 51, 51, 0, 79, 28, 28, 0]),
  lot(63, 'buildingB', [54, 54, 0, 54, 54, 0, 54, 54, 0, 97, 29, 29, 0]),
  lot(64, 'buildingB', [25, 25, 0, 25, 25, 0, 25, 25, 0, 41, 12, 12, 0]),
  lot(65, 'buildingB', [97, 97, 0, 97, 97, 0, 97, 97, 0, 164, 49, 50, 0]),
  lot(66, 'buildingB', [89, 89, 0, 89, 89, 0, 89, 89, 0, 155, 46, 47, 0]),
  lot(67, 'buildingB', [66, 66, 0, 66, 66, 0, 66, 66, 0, 116, 35, 35, 0]),
  lot(68, 'buildingB', [53, 53, 0, 53, 53, 0, 53, 53, 0, 93, 28, 28, 0]),
  lot(69, 'buildingB', [53, 53, 0, 53, 53, 0, 53, 53, 0, 95, 28, 29, 0]),

  lot(70, 'commerce', [150, 0, 0, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
  lot(71, 'buildingC', [1401, 1401, 0, 0, 0, 0, 0, 0, 0, 0, 785, 791, 0]),

  ...buildParkingRange(72, 114, true),
  ...buildParkingRange(115, 136, false),
  ...buildParkingRange(137, 167, true),
];
