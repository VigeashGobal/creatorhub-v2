'use client'

import { Activity, Search, Grid3X3, DollarSign } from 'lucide-react'

interface MobileTabBarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export default function MobileTabBar({ currentPage, onPageChange }: MobileTabBarProps) {
  const tabs = [
    { id: 'analytics', name: 'Social Pulse', icon: Activity },
    { id: 'trends', name: 'Trends', icon: Search },
    { id: 'workflow', name: 'Tasks', icon: Grid3X3 },
    { id: 'financial', name: 'Finance', icon: DollarSign }
  ]

  return (
    <div className="w-full bg-bg-soft/95 backdrop-blur-lg border-t border-edge-subtle">
      <div className="flex items-center justify-around px-2 py-3 pb-6">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = currentPage === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onPageChange(tab.id)}
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all ${
                isActive 
                  ? 'text-accent-blue bg-accent-blue/10' 
                  : 'text-fg-dim hover:text-fg-high'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium">{tab.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

