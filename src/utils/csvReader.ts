import { parse } from "papaparse";

export const fetchCSVFile = async <T>(filePath: string): Promise<T[]> => {
  const response = await fetch(filePath);
  if (!response.ok) {
    throw new Error(`HTTPエラー: ${response.status} - ${response.statusText}`);
  }

  const csvText = await response.text();

  const parsedResult = parse<T>(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });

  return parsedResult.data;
};
