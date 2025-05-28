"use client"

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "./chart"
import type { ChartConfig } from "./chart"

interface BarChartProps {
  data: { name: string; value: number }[]
  config: ChartConfig
}

export function BarChart({ data, config }: BarChartProps) {
  return (
    <ChartContainer config={config}>
      <ReBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value">
          {data.map((entry, index) => {
            const key = entry.name
            return (
              <Cell
                key={`cell-${index}`}
                fill={`var(--color-${key}, #8884d8)`}
              />
            )
          })}
        </Bar>
      </ReBarChart>
    </ChartContainer>
  )
}
