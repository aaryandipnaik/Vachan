import type React from "react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  Tooltip as RechartsTooltip,
} from "recharts"

export const ChartContainer = ({
  children,
  data,
  className,
}: { children: React.ReactNode; data: any[]; className?: string }) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>{children}</RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

export const Chart = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const Line = (props: any) => {
  return <RechartsLine {...props} />
}

export const LineChart = RechartsLineChart

export const XAxis = (props: any) => {
  return <RechartsXAxis {...props} />
}

export const YAxis = (props: any) => {
  return <RechartsYAxis {...props} />
}

export const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return <RechartsTooltip content={children} />
}

export const ChartTooltipContent = ({
  active,
  payload,
  label,
}: { active?: boolean; payload?: any[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border border-gray-200 rounded-md shadow-md">
        <p className="font-bold">{label}</p>
        {payload.map((item, index) => (
          <p key={`tooltip-item-${index}`} className="text-gray-700">
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    )
  }

  return null
}

