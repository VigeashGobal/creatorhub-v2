'use client'

import { Card } from '@creatorhub/ui'
import { Filter, ArrowUpDown, X, Calendar, TrendingUp, DollarSign } from 'lucide-react'
import { useState, useEffect } from 'react'

interface FilterOption {
  id: string
  label: string
  value: string
}

interface SortOption {
  id: string
  label: string
  value: string
  icon: any
}

interface FilterSortPanelProps {
  onFilterChange?: (filters: string[]) => void
  onSortChange?: (sort: string) => void
  className?: string
}

const platformFilters: FilterOption[] = [
  { id: 'all', label: 'All Platforms', value: 'all' },
  { id: 'youtube', label: 'YouTube', value: 'youtube' },
  { id: 'instagram', label: 'Instagram', value: 'instagram' },
  { id: 'tiktok', label: 'TikTok', value: 'tiktok' }
]

const dateRangeFilters: FilterOption[] = [
  { id: 'today', label: 'Today', value: 'today' },
  { id: 'week', label: 'This Week', value: 'week' },
  { id: 'month', label: 'This Month', value: 'month' },
  { id: 'quarter', label: 'This Quarter', value: 'quarter' },
  { id: 'year', label: 'This Year', value: 'year' },
  { id: 'all', label: 'All Time', value: 'all' }
]

const sortOptions: SortOption[] = [
  { id: 'views', label: 'Most Views', value: 'views', icon: TrendingUp },
  { id: 'engagement', label: 'Highest Engagement', value: 'engagement', icon: TrendingUp },
  { id: 'revenue', label: 'Highest Revenue', value: 'revenue', icon: DollarSign },
  { id: 'recent', label: 'Most Recent', value: 'recent', icon: Calendar },
  { id: 'oldest', label: 'Oldest First', value: 'oldest', icon: Calendar }
]

export function FilterSortPanel({ onFilterChange, onSortChange, className = '' }: FilterSortPanelProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>(['all'])
  const [activeDateRange, setActiveDateRange] = useState<string>('month')
  const [activeSort, setActiveSort] = useState<string>('views')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterToggle = (value: string) => {
    if (value === 'all') {
      setActiveFilters(['all'])
    } else {
      setActiveFilters(prev => {
        const newFilters = prev.filter(f => f !== 'all')
        if (newFilters.includes(value)) {
          const filtered = newFilters.filter(f => f !== value)
          return filtered.length > 0 ? filtered : ['all']
        } else {
          return [...newFilters, value]
        }
      })
    }
  }

  const handleSortChange = (value: string) => {
    setActiveSort(value)
    if (onSortChange) onSortChange(value)
  }

  const clearFilters = () => {
    setActiveFilters(['all'])
    setActiveDateRange('month')
    setActiveSort('views')
  }

  const hasActiveFilters = activeFilters.length > 1 || activeFilters[0] !== 'all' || activeDateRange !== 'month' || activeSort !== 'views'

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(activeFilters)
    }
  }, [activeFilters, onFilterChange])

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-accent-blue" />
          <h2 className="text-lg font-bold text-fg-high">Filters & Sort</h2>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-fg-dim hover:text-fg-high transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-accent-blue hover:underline"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-fg-dim mb-2">Platform</div>
        <div className="flex flex-wrap gap-2">
          {platformFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterToggle(filter.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeFilters.includes(filter.value)
                  ? 'bg-accent-blue text-white'
                  : 'bg-bg-soft text-fg-dim hover:bg-bg-sunken hover:text-fg-high'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-fg-dim mb-2">Date Range</div>
        <div className="flex flex-wrap gap-2">
          {dateRangeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveDateRange(filter.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeDateRange === filter.value
                  ? 'bg-accent-purple text-white'
                  : 'bg-bg-soft text-fg-dim hover:bg-bg-sunken hover:text-fg-high'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <div className="text-xs font-semibold text-fg-dim mb-2 flex items-center gap-1">
          <ArrowUpDown className="w-3 h-3" />
          Sort By
        </div>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.id}
                onClick={() => handleSortChange(option.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1 ${
                  activeSort === option.value
                    ? 'bg-accent-green text-white'
                    : 'bg-bg-soft text-fg-dim hover:bg-bg-sunken hover:text-fg-high'
                }`}
              >
                <Icon className="w-3 h-3" />
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-edge-subtle">
          <div className="text-xs text-fg-dim mb-2">Active Filters:</div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.filter(f => f !== 'all').map((filter) => (
              <span
                key={filter}
                className="px-2 py-1 text-xs bg-accent-blue/20 text-accent-blue rounded flex items-center gap-1"
              >
                {filter}
                <button
                  onClick={() => handleFilterToggle(filter)}
                  className="hover:text-accent-pink"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {activeDateRange !== 'month' && (
              <span className="px-2 py-1 text-xs bg-accent-purple/20 text-accent-purple rounded">
                {dateRangeFilters.find(f => f.value === activeDateRange)?.label}
              </span>
            )}
            {activeSort !== 'views' && (
              <span className="px-2 py-1 text-xs bg-accent-green/20 text-accent-green rounded">
                {sortOptions.find(s => s.value === activeSort)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}

