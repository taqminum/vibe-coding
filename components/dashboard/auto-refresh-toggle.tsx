import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

interface AutoRefreshToggleProps {
  onToggle: (isEnabled: boolean, interval: number) => void
}

export function AutoRefreshToggle({ onToggle }: AutoRefreshToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [interval, setInterval] = useState(30) // seconds

  const handleToggle = () => {
    const newIsEnabled = !isEnabled
    setIsEnabled(newIsEnabled)
    onToggle(newIsEnabled, interval)
  }

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newInterval = parseInt(e.target.value)
    setInterval(newInterval)
    if (isEnabled) {
      onToggle(true, newInterval)
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <Button 
        onClick={handleToggle}
        variant={isEnabled ? 'primary' : 'secondary'}
      >
        {isEnabled ? 'Disable Auto Refresh' : 'Enable Auto Refresh'}
      </Button>
      <div className="flex items-center">
        <label htmlFor="interval" className="mr-2 text-gray-700">Interval:</label>
        <select 
          id="interval"
          value={interval}
          onChange={handleIntervalChange}
          disabled={!isEnabled}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="30">30 seconds</option>
          <option value="60">1 minute</option>
          <option value="300">5 minutes</option>
        </select>
      </div>
    </div>
  )
}