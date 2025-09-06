import { useId } from "react";
import { periodOptions } from "../types/population_japan_tokyo_1872-2023_period";

interface PeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  filteredDataCount?: number;
}

export const PeriodSelector = ({
  selectedPeriod,
  onPeriodChange,
  filteredDataCount,
}: PeriodSelectorProps) => {
  const periodSelectId = useId();
  const currentPeriod =
    periodOptions.find((option) => option.value === selectedPeriod) ||
    periodOptions[0];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPeriodChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor={periodSelectId}>期間選択：</label>
      <select
        id={periodSelectId}
        value={selectedPeriod}
        onChange={handleChange}
      >
        {periodOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div>
        <p>
          表示期間：{currentPeriod.start}年 - {currentPeriod.end}年
        </p>
        {filteredDataCount !== undefined && (
          <p>データ点数：{filteredDataCount}年分</p>
        )}
      </div>
    </div>
  );
};
