import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

interface DataTab {
  id: string
  label: string
}

interface DataTabsProps {
  tabs: DataTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function DataTabs({ tabs, activeTab, onTabChange }: DataTabsProps) {
  return (
    <div className="flex border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === tab.id
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}