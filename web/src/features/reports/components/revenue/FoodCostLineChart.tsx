import { Card } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/CardTitle";
import { BUSINESS_SETTINGS } from "@/constants/settings";
import { formatPercent } from "@/lib/format";
import type { MonthlyRevenue } from "../../lib/revenueReport";

const WIDTH = 460;
const HEIGHT = 180;
const x = (index: number, count: number) =>
  36 + (index * (WIDTH - 60)) / Math.max(count - 1, 1);
const y = (value: number) =>
  HEIGHT - 24 - ((value - 0.3) / 0.1) * (HEIGHT - 40);
const TARGET = BUSINESS_SETTINGS.foodCostTarget;
const LINE = "var(--color-wait)";
const AXIS = "var(--color-ink-subtle)";

export function FoodCostLineChart({ months }: { months: MonthlyRevenue[] }) {
  const points = months
    .map(
      (row, index) => `${x(index, months.length)},${y(row.foodCost).toFixed(1)}`
    )
    .join(" ");

  return (
    <Card>
      <CardTitle>
        Food cost thực tế theo tháng so với mục tiêu {formatPercent(TARGET, 0)}
      </CardTitle>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Food cost các tháng"
      >
        <line
          x1="36"
          x2={WIDTH - 24}
          y1={y(TARGET)}
          y2={y(TARGET)}
          stroke={AXIS}
          strokeDasharray="4 4"
        />
        <text x="36" y={y(TARGET) + 15} fontSize="11" fill={AXIS}>
          Mục tiêu {formatPercent(TARGET, 0)}
        </text>
        <polyline points={points} fill="none" stroke={LINE} strokeWidth="2" />
        {months.map((row, index) => (
          <g key={row.month}>
            <title>{`${row.month}: ${formatPercent(row.foodCost)}`}</title>
            <circle
              cx={x(index, months.length)}
              cy={y(row.foodCost).toFixed(1)}
              r="4.5"
              fill={LINE}
              stroke="#fff"
              strokeWidth="2"
            />
            <text
              x={x(index, months.length)}
              y={(y(row.foodCost) - 10).toFixed(1)}
              textAnchor="middle"
              fontSize="11"
              fill="var(--color-ink)"
            >
              {formatPercent(row.foodCost)}
            </text>
            <text
              x={x(index, months.length)}
              y={HEIGHT - 6}
              textAnchor="middle"
              fontSize="11"
              fill={AXIS}
            >
              {row.month}
            </text>
          </g>
        ))}
      </svg>
    </Card>
  );
}
