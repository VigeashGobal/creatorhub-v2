'use client'

import { Card } from '@creatorhub/ui'
import { Search, TrendingUp, Sparkles, Youtube, Instagram, Music, ArrowRight } from 'lucide-react'
import { useState, useMemo } from 'react'

interface SearchableItem {
  id: string
  type: 'content' | 'metric' | 'insight'
  title: string
  description: string
  platform?: 'youtube' | 'instagram' | 'tiktok'
  value?: number
  category: string
}

interface SearchDiscoveryProps {
  className?: string
}

const searchableItems: SearchableItem[] = [
  {
    id: '1',
    type: 'content',
    title: '10 Secrets to Growing Your Creator Business',
    description: 'TikTok video with 450K views',
    platform: 'tiktok',
    value: 450000,
    category: 'Top Performing'
  },
  {
    id: '2',
    type: 'metric',
    title: 'Total Followers',
    description: '247K followers across all platforms',
    value: 247000,
    category: 'Key Metric'
  },
  {
    id: '3',
    type: 'content',
    title: 'How I Made $10K in One Month',
    description: 'YouTube video with 125K views',
    platform: 'youtube',
    value: 125000,
    category: 'High Revenue'
  },
  {
    id: '4',
    type: 'insight',
    title: 'Best Posting Time',
    description: '6 PM EST shows highest engagement',
    category: 'Recommendation'
  },
  {
    id: '5',
    type: 'content',
    title: 'Behind the Scenes: Content Setup',
    description: 'Instagram post with 85K views',
    platform: 'instagram',
    value: 85000,
    category: 'High Engagement'
  },
  {
    id: '6',
    type: 'metric',
    title: 'Monthly Revenue',
    description: '$775 earned this month',
    value: 775,
    category: 'Key Metric'
  }
]

const platformConfig = {
  youtube: { icon: Youtube, color: 'text-red-500' },
  instagram: { icon: Instagram, color: 'text-pink-500' },
  tiktok: { icon: Music, color: 'text-cyan-400' }
}

export function SearchDiscovery({ className = '' }: SearchDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    const cats = new Set(searchableItems.map(item => item.category))
    return Array.from(cats)
  }, [])

  const filteredItems = useMemo(() => {
    let filtered = searchableItems

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.platform?.toLowerCase().includes(query)
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    return filtered
  }, [searchQuery, selectedCategory])

  const formatValue = (value?: number): string => {
    if (!value) return ''
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return value.toString()
  }

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-accent-blue" />
          <h2 className="text-xl font-bold text-fg-high">Search & Discovery</h2>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
          <input
            type="text"
            placeholder="Search content, metrics, insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-bg border border-edge-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue text-fg-high placeholder-fg-dim"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedCategory === null
                ? 'bg-accent-blue text-white'
                : 'bg-bg-soft text-fg-dim hover:bg-bg-sunken hover:text-fg-high'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedCategory === category
                  ? 'bg-accent-purple text-white'
                  : 'bg-bg-soft text-fg-dim hover:bg-bg-sunken hover:text-fg-high'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-fg-dim">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No results found</p>
            <p className="text-xs mt-1">Try a different search term</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const platformInfo = item.platform ? platformConfig[item.platform] : null
            const PlatformIcon = platformInfo?.icon

            return (
              <div
                key={item.id}
                className="p-3 bg-bg-soft rounded-lg border border-edge-subtle hover:border-accent-blue/30 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {item.type === 'content' && PlatformIcon && (
                      <div className="w-8 h-8 rounded-full bg-bg-sunken flex items-center justify-center flex-shrink-0">
                        <PlatformIcon className={`w-4 h-4 ${platformInfo.color}`} />
                      </div>
                    )}
                    {item.type === 'metric' && (
                      <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-accent-blue" />
                      </div>
                    )}
                    {item.type === 'insight' && (
                      <div className="w-8 h-8 rounded-full bg-accent-yellow/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-accent-yellow" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-fg-high group-hover:text-accent-blue transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue flex-shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-fg-dim line-clamp-1">{item.description}</p>
                    </div>
                  </div>

                  {item.value && (
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-fg-high">
                        {item.type === 'metric' && item.value < 1000 ? '$' : ''}
                        {formatValue(item.value)}
                      </div>
                      {item.type === 'content' && (
                        <div className="text-xs text-fg-dim">views</div>
                      )}
                    </div>
                  )}

                  <ArrowRight className="w-4 h-4 text-fg-dim opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-edge-subtle">
        <div className="text-xs font-semibold text-fg-dim mb-2">Quick Search</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSearchQuery('best performing')}
            className="px-3 py-1.5 text-xs bg-bg-soft text-fg-dim hover:bg-bg-sunken hover:text-fg-high rounded-lg transition-colors"
          >
            Best Performing
          </button>
          <button
            onClick={() => setSearchQuery('revenue')}
            className="px-3 py-1.5 text-xs bg-bg-soft text-fg-dim hover:bg-bg-sunken hover:text-fg-high rounded-lg transition-colors"
          >
            Revenue
          </button>
          <button
            onClick={() => setSearchQuery('engagement')}
            className="px-3 py-1.5 text-xs bg-bg-soft text-fg-dim hover:bg-bg-sunken hover:text-fg-high rounded-lg transition-colors"
          >
            Engagement
          </button>
        </div>
      </div>
    </Card>
  )
}

