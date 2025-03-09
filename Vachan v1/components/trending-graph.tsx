"use client"

import { Card } from "@/components/ui/card"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, Line, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  { name: "Mon", "#Covid24": 2000, "#ShadowDeal": 1800, "#FakeMamata": 1400 },
  { name: "Tue", "#Covid24": 3000, "#ShadowDeal": 1500, "#FakeMamata": 2400 },
  { name: "Wed", "#Covid24": 2000, "#ShadowDeal": 4800, "#FakeMamata": 2200 },
  { name: "Thu", "#Covid24": 2780, "#ShadowDeal": 3908, "#FakeMamata": 2000 },
  { name: "Fri", "#Covid24": 1890, "#ShadowDeal": 4800, "#FakeMamata": 2181 },
  { name: "Sat", "#Covid24": 2390, "#ShadowDeal": 3800, "#FakeMamata": 2500 },
  { name: "Sun", "#Covid24": 3490, "#ShadowDeal": 4300, "#FakeMamata": 2100 },
]

export function TrendingGraph() {
  return (
    <Card className="p-4">
      <ChartContainer className="h-[200px] w-full" data={data}>
        <Chart>
          <XAxis dataKey="name" />
          <YAxis />
          <Line dataKey="#Covid24" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line dataKey="#ShadowDeal" stroke="#82ca9d" />
          <Line dataKey="#FakeMamata" stroke="#ff7300" />
          <ChartTooltip>
            <ChartTooltipContent />
          </ChartTooltip>
        </Chart>
      </ChartContainer>
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#8884d8]"></div>
          <span className="text-xs">#Covid24</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#82ca9d]"></div>
          <span className="text-xs">#ShadowDeal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff7300]"></div>
          <span className="text-xs">#FakeMamata</span>
        </div>
      </div>
    </Card>
  )
}

