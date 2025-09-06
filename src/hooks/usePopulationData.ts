import { useEffect, useState } from "react";
import type { CSVDataResult } from "../types/common";
import {
  type PopulationData,
  type RawPopulationCSV,
  transformPopulationData,
} from "../types/population_japan_tokyo_1872-2023";
import { fetchCSVFile } from "../utils/csvReader";

export const usePopulationData = (): CSVDataResult<PopulationData> => {
  const [data, setData] = useState<PopulationData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const filePath = "/population_japan_tokyo_1872-2023.csv";
  useEffect(() => {
    let isMounted = true;

    const fetchCSVData = async () => {
      if (!isMounted) return;
      setLoading(true);
      setError(null);

      try {
        // CSVファイルの読み込み
        const parsedCSVData = await fetchCSVFile<RawPopulationCSV>(filePath);
        if (!isMounted) return;

        const processedData = parsedCSVData.map((line) =>
          transformPopulationData(line)
        );
        setData(processedData);
      } catch (err) {
        if (!isMounted) return;

        const errorMessage =
          err instanceof Error ? err.message : "不明なエラー";
        setError(errorMessage);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCSVData();
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};
