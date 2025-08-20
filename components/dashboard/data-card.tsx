import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface DataCardProps {
  name: string
  symbol: string
  currentPrice: number
  priceChangePercentage: number
}

export function DataCard({ 
  name, 
  symbol, 
  currentPrice, 
  priceChangePercentage 
}: DataCardProps) {
  const isPositive = priceChangePercentage >= 0
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-gray-500 uppercase">{symbol}</p>
          </div>
          <div className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '↑' : '↓'} {Math.abs(priceChangePercentage).toFixed(2)}%
          </div>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold">${currentPrice.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}