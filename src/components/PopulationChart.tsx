import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PopulationData } from "../types/population_japan_tokyo_1872-2023";
import { periodOptions } from "../types/population_japan_tokyo_1872-2023_period";
import { PeriodSelector } from "./PeriodSelector";

interface PopulationChartProps {
  data: PopulationData[];
}

export const PopulationChart = ({ data }: PopulationChartProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");

  const currentPeriod =
    periodOptions.find((option) => option.value === selectedPeriod) ||
    periodOptions[0];

  if (!data || data.length === 0) {
    return (
      <div>
        <p>表示するデータがありません。</p>
      </div>
    );
  }

  const chartData = data
    .filter((row) =>
      [row.westernYear, row.tokyoPopulation, row.nationalPopulation].every(
        (x) => x !== null
      )
    )
    .map((row) => ({
      year: row.westernYear,
      tokyoPopulation: row.tokyoPopulation,
    }))
    .filter((row) => {
      return (
        row.year !== null &&
        row.year >= currentPeriod.start &&
        row.year <= currentPeriod.end
      );
    });

  const handleChange = (period: string) => setSelectedPeriod(period);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <h3>
        人口推移グラフ（{currentPeriod.start}-{currentPeriod.end}年）
      </h3>
      <PeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={handleChange}
        filteredDataCount={chartData.length}
      />

      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            type="number"
            scale="linear"
            domain={[2000, "dataMax"]}
            tickFormatter={(value) => `${value}年`}
          />
          <YAxis
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip
            labelFormatter={(value) => `${value}年`}
            formatter={(value: number, name: string) => [
              `${value.toLocaleString()}人`,
              name,
            ]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="tokyoPopulation"
            stroke="#2563eb"
            strokeWidth={2}
            name="東京都人口"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
