'use client'

import { useState } from 'react'
import { loadGamificationState } from '../../lib/gamification'
import { AchievementBadge } from '../../components/gamification/AchievementBadge'
import { Card } from '@creatorhub/ui'
import { Trophy, Search, Filter, Share2, Download, DollarSign, Award } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AchievementsPage() {
  const [gamificationState] = useState(loadGamificationState())
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'value' | 'date' | 'category'>('value')
  const router = useRouter()

  const categories = ['revenue', 'streak', 'task', 'social', 'milestone']
  
  const filteredAchievements = gamificationState.achievements
    .filter(achievement => {
      const matchesSearch = achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !filterCategory || achievement.category === filterCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'value') return b.dollarValue - a.dollarValue
      if (sortBy === 'date') {
        if (!a.unlockedAt && !b.unlockedAt) return 0
        if (!a.unlockedAt) return 1
        if (!b.unlockedAt) return -1
        return new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime()
      }
      return a.category.localeCompare(b.category)
    })

  const unlockedCount = gamificationState.achievements.filter(a => a.unlocked).length
  const totalValue = gamificationState.achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.dollarValue, 0)

  const handleShare = (achievementId: string) => {
    const achievement = gamificationState.achievements.find(a => a.id === achievementId)
    if (achievement && achievement.unlocked) {
      const text = `I just unlocked "${achievement.title}" on CreatorHub! ${achievement.reward}`
      if (navigator.share) {
        navigator.share({ text, url: window.location.href })
      } else {
        navigator.clipboard.writeText(text)
      }
    }
  }

  const handleExport = () => {
    const unlocked = gamificationState.achievements.filter(a => a.unlocked)
    const data = unlocked.map(a => ({
      title: a.title,
      description: a.description,
      reward: a.reward,
      dollarValue: a.dollarValue,
      unlockedAt: a.unlockedAt,
    }))
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'creatorhub-achievements.json'
    a.click()
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-sm text-fg-dim hover:text-fg-high mb-4 transition-colors"
          >
            ← Back to Dashboard
          </button>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-fg-high mb-2 flex items-center gap-3">
                <Trophy className="w-10 h-10 text-accent-yellow" />
                Achievement Gallery
              </h1>
              <p className="text-fg-dim">Track your progress and unlock rewards</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-bg-soft border border-edge-subtle rounded-lg hover:bg-bg-sunken transition-colors flex items-center gap-2 text-sm text-fg-high"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-accent-yellow" />
                <div>
                  <div className="text-2xl font-bold text-fg-high">
                    {unlockedCount} / {gamificationState.achievements.length}
                  </div>
                  <div className="text-sm text-fg-dim">Achievements Unlocked</div>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-accent-green" />
                <div>
                  <div className="text-2xl font-bold text-fg-high">
                    ${totalValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-fg-dim">Total Value Unlocked</div>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-accent-purple" />
                <div>
                  <div className="text-2xl font-bold text-fg-high">
                    {Math.round((unlockedCount / gamificationState.achievements.length) * 100)}%
                  </div>
                  <div className="text-sm text-fg-dim">Completion Rate</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-fg-dim" />
                <input
                  type="text"
                  placeholder="Search achievements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-bg border border-edge-subtle rounded-lg text-fg-high placeholder-fg-dim focus:outline-none focus:ring-2 focus:ring-accent-blue"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-fg-dim" />
                <select
                  value={filterCategory || ''}
                  onChange={(e) => setFilterCategory(e.target.value || null)}
                  className="px-4 py-2 bg-bg border border-edge-subtle rounded-lg text-fg-high focus:outline-none focus:ring-2 focus:ring-accent-blue"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-bg border border-edge-subtle rounded-lg text-fg-high focus:outline-none focus:ring-2 focus:ring-accent-blue"
                >
                  <option value="value">Sort by Value</option>
                  <option value="date">Sort by Date</option>
                  <option value="category">Sort by Category</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border transition-all ${
                achievement.unlocked
                  ? 'bg-bg-soft border-edge-subtle hover:border-accent-blue'
                  : 'bg-bg-sunken border-edge-subtle opacity-60'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <AchievementBadge achievement={achievement} size="lg" />
                
                <div className="w-full">
                  <div className="text-sm font-semibold text-fg-high mb-1">
                    {achievement.title}
                  </div>
                  <div className="text-xs text-fg-dim mb-2 line-clamp-2">
                    {achievement.description}
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 text-xs text-accent-green font-semibold mb-2">
                    <DollarSign className="w-3 h-3" />
                    <span>${achievement.dollarValue.toLocaleString()}</span>
                  </div>
                  
                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="text-xs text-fg-dim mb-2">
                      Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                  
                  {!achievement.unlocked && achievement.progress !== undefined && achievement.target && (
                    <div className="text-xs text-fg-dim mb-2">
                      {achievement.progress} / {achievement.target}
                    </div>
                  )}
                  
                  {achievement.unlocked && (
                    <button
                      onClick={() => handleShare(achievement.id)}
                      className="w-full px-2 py-1 text-xs bg-accent-blue/10 text-accent-blue rounded hover:bg-accent-blue/20 transition-colors flex items-center justify-center gap-1"
                    >
                      <Share2 className="w-3 h-3" />
                      Share
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-fg-dim mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-fg-high mb-2">No achievements found</h3>
              <p className="text-fg-dim">Try adjusting your search or filters</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

