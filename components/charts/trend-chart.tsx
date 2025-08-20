import React from 'react'

interface TrendChartProps {
  data: { time: string; value: number }[]
  title?: string
}

export function TrendChart({ data, title }: TrendChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">No chart data available</p>
      </div>
    )
  }

  // 简单的文本图表表示（在实际应用中，您可以使用Chart.js或Recharts等库）
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue || 1 // 避免除零错误

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div className="h-64 flex items-end space-x-2">
        {data.map((point, index) => {
          const height = ((point.value - minValue) / range) * 100
          return (
            <div 
              key={index}
              className="flex-1 flex flex-col items-center"
              title={`${point.time}: ${point.value}`}
            >
              <div 
                className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                style={{ height: `${height}%` }}
              ></div>
              <div className="text-xs text-gray-500 mt-1 transform -rotate-45 origin-left">
                {point.time}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}