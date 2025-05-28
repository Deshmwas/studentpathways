// "use client"

// import * as React from "react"
// import { Pie, PieChart, Label } from "recharts"
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   ChartConfig,
// } from "@/components/ui/chart"

// type DonutChartProps = {
//   data: { name: string; value: number }[]
//   config: ChartConfig
//   centerLabel?: string
// }

// export const DonutChart = ({ data, config, centerLabel = "Total" }: DonutChartProps) => {
//   const totalValue = React.useMemo(() => {
//     return data.reduce((acc, item) => acc + item.value, 0)
//   }, [data])

//   return (
//     <ChartContainer
//       config={config}
//       className="mx-auto aspect-square max-h-[250px]"
//     >
//       <PieChart>
//         <ChartTooltip
//           cursor={false}
//           content={<ChartTooltipContent hideLabel />}
//         />
//         <Pie
//           data={data}
//           dataKey="value"
//           nameKey="name"
//           innerRadius={60}
//           strokeWidth={5}
//         >
//           <Label
//             content={({ viewBox }) => {
//               // safely access viewBox cx/cy using type assertion
//               const vb = viewBox as { cx?: number; cy?: number }

//               if (!vb || typeof vb.cx !== "number" || typeof vb.cy !== "number") {
//                 return null
//               }

//               return (
//                 <text
//                   x={vb.cx}
//                   y={vb.cy}
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                 >
//                   <tspan
//                     x={vb.cx}
//                     y={vb.cy}
//                     className="fill-foreground text-2xl font-bold"
//                   >
//                     {totalValue.toLocaleString()}
//                   </tspan>
//                   <tspan
//                     x={vb.cx}
//                     y={vb.cy + 20}
//                     className="fill-muted-foreground text-xs"
//                   >
//                     {centerLabel}
//                   </tspan>
//                 </text>
//               )
//             }}
//           />
//         </Pie>
//       </PieChart>
//     </ChartContainer>
//   )
// }

"use client"

import * as React from "react"
import { Pie, PieChart, Label, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"

type DonutChartProps = {
  data: { name: string; value: number }[]
  config: ChartConfig
  centerLabel?: string
}

export const DonutChart = ({ data, config, centerLabel = "Total" }: DonutChartProps) => {
  const totalValue = React.useMemo(() => {
    return data.reduce((acc, item) => acc + item.value, 0)
  }, [data])

  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <defs>
          <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" /> {/* blue-500 */}
            <stop offset="100%" stopColor="#1e40af" /> {/* blue-900 */}
          </linearGradient>
        </defs>

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill="url(#blueGradient)" />
          ))}

          <Label
            content={({ viewBox }) => {
              const vb = viewBox as { cx?: number; cy?: number }

              if (!vb || typeof vb.cx !== "number" || typeof vb.cy !== "number") {
                return null
              }

              return (
                <text
                  x={vb.cx}
                  y={vb.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x={vb.cx}
                    y={vb.cy}
                    className="fill-foreground text-2xl font-bold"
                  >
                    {totalValue.toLocaleString()}
                  </tspan>
                  <tspan
                    x={vb.cx}
                    y={vb.cy + 20}
                    className="fill-muted-foreground text-xs"
                  >
                    {centerLabel}
                  </tspan>
                </text>
              )
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
