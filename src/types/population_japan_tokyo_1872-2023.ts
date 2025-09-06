export interface PopulationData {
  japaneseYear: string | null;
  westernYear: number | null;
  tokyoPopulationNote: string | null;
  tokyoPopulation: number | null;
  tokyoChange: number | null;
  tokyoChangeRate: number | null;
  tokyoNationalRatio: number | null;
  nationalPopulationNote: string | null;
  nationalPopulation: number | null;
  nationalChange: number | null;
  nationalChangeRate: number | null;
}

// CSVパース時の生データ型（全て文字列またはundefined）
export interface RawPopulationCSV {
  "和暦（年次）"?: string;
  "西暦（年次）"?: string;
  "東京都／人口補足"?: string;
  "東京都／人口"?: string;
  "東京都／増減"?: string;
  "東京都／増減率(%)"?: string;
  "東京都／対全国比(%)"?: string;
  "全国／人口補足"?: string;
  "全国／人口(千人)"?: string;
  "全国／増減(千人)"?: string;
  "全国／増減率(%)"?: string;
}

export const transformPopulationData = (
  raw: RawPopulationCSV
): PopulationData => {
  return {
    japaneseYear: parseString(raw["和暦（年次）"]),
    westernYear: parseNumber(raw["西暦（年次）"]),
    tokyoPopulationNote: parseString(raw["東京都／人口補足"]),
    tokyoPopulation: parseNumber(raw["東京都／人口"]),
    tokyoChange: parseNumber(raw["東京都／増減"]),
    tokyoChangeRate: parseNumber(raw["東京都／増減率(%)"]),
    tokyoNationalRatio: parseNumber(raw["東京都／対全国比(%)"]),
    nationalPopulationNote: parseString(raw["全国／人口補足"]),
    nationalPopulation: parseNumber(raw["全国／人口(千人)"]),
    nationalChange: parseNumber(raw["全国／増減(千人)"]),
    nationalChangeRate: parseNumber(raw["全国／増減率(%)"]),
  };
};

const parseString = (value: string | undefined): string | null =>
  value === undefined || value === "" ? null : String(value).trim();

const parseNumber = (value: string | undefined): number | null => {
  if (value === undefined || value === "") {
    return null;
  }

  const cleanValue = value.replace(/[,\s]/g, "").trim();
  if (cleanValue === "") {
    return null;
  }

  const parsedValue = Number(cleanValue);
  return Number.isNaN(parsedValue) ? null : parsedValue;
};
