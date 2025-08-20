'use client'

import React, { useState, useEffect } from 'react'
import { DataCard } from '@/components/dashboard/data-card'
import { RefreshButton } from '@/components/dashboard/refresh-button'
import { AutoRefreshToggle } from '@/components/dashboard/auto-refresh-toggle'
import { DataTabs } from '@/components/dashboard/data-tabs'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorDisplay } from '@/components/ui/error-display'
import { fetchData } from '@/lib/api/client'
import { CryptoCurrency } from '@/lib/types'

export default function Dashboard() {
  const [data, setData] = useState<CryptoCurrency[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('crypto')
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false)
  const [autoRefreshInterval, setAutoRefreshInterval] = useState(30)

  const tabs = [
    { id: 'crypto', label: 'Cryptocurrency' },
    { id: 'weather', label: 'Weather' },
    { id: 'nasa', label: 'NASA' },
  ]

  const fetchDataHandler = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // 在实际应用中，这里会根据activeTab调用不同的API
      const result = await fetchData<CryptoCurrency[]>('/api/data')
      setData(result)
    } catch (err) {
      setError('Failed to fetch data. Please try again.')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAutoRefreshToggle = (isEnabled: boolean, interval: number) => {
    setAutoRefreshEnabled(isEnabled)
    setAutoRefreshInterval(interval)
  }

  useEffect(() => {
    fetchDataHandler()
  }, [activeTab])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    
    if (autoRefreshEnabled) {
      intervalId = setInterval(() => {
        fetchDataHandler()
      }, autoRefreshInterval * 1000)
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [autoRefreshEnabled, autoRefreshInterval, activeTab])

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Dashboard</h1>
          <p className="text-gray-600">Monitor your API data in real-time</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <DataTabs 
              tabs={tabs} 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <AutoRefreshToggle onToggle={handleAutoRefreshToggle} />
              <RefreshButton 
                onClick={fetchDataHandler} 
                isLoading={loading} 
              />
            </div>
          </div>

          {error && (
            <div className="mb-6">
              <ErrorDisplay 
                message={error} 
                onRetry={fetchDataHandler} 
              />
            </div>
          )}

          {loading && !data.length ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item) => (
                <DataCard
                  key={item.id}
                  name={item.name}
                  symbol={item.symbol}
                  currentPrice={item.current_price}
                  priceChangePercentage={item.price_change_percentage_24h}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}