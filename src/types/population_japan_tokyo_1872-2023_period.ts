export interface PeriodOption {
  value: string;
  label: string;
  start: number;
  end: number;
}

export const periodOptions: PeriodOption[] = [
  { value: "all", label: "すべて (1872-2023)", start: 1872, end: 2023 },
  { value: "prewar", label: "戦前期 (1872-1945)", start: 1872, end: 1945 },
  { value: "recovery", label: "復興期 (1945-1970)", start: 1945, end: 1970 },
  { value: "mature", label: "成熟期 (1970-2000)", start: 1970, end: 2000 },
  { value: "modern", label: "現代期 (2000-2023)", start: 2000, end: 2023 },
];
