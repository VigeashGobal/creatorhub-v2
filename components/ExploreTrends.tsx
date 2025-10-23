'use client'

import { useState } from 'react'
import { 
  Search, 
  TrendingUp, 
  BarChart3, 
  Lightbulb,
  Calendar,
  Hash,
  Clock,
  Target,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Filter
} from 'lucide-react'

interface ExploreTrendsProps {
  userData: any
  onReset: () => void
}

// Mock predictive insights
const predictiveInsights = [
  "Spring refresh content expected to surge in Q2 – focus on lifestyle and renewal narratives.",
  "Buyer intent for self-improvement products up 15%; short tips or progress reels recommended.",
  "Trending hashtags predicted: #GlowGoals, #JuneVibes, #MidYearReset.",
  "Optimal posting times trending earlier (7-9 AM) due to global engagement shifts.",
  "Expect an uptick in outdoor, travel, and event-based content consumption during warmer months.",
  "Predictive data shows sustainability-related hashtags are gaining 12% week-over-week engagement growth.",
  "Upcoming holidays: build early campaigns around Memorial Day, Pride Month, and Summer Kickoff.",
  "Beauty, fitness, and travel verticals are projected to outperform tech and gaming through early Q3.",
  "Short-form content with trending audio under 15 seconds continues to outperform longer clips by 23%.",
  "Recommended test formats: carousel micro-recaps, creator collab snippets, and vertical story features."
]

export default function ExploreTrends({ userData, onReset }: ExploreTrendsProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#1A1A2E' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Explore Trends</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search creators, niches or keywords"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none"
            style={{ backgroundColor: '#2A2A3A' }}
          />
        </div>
      </div>

      {/* Upcoming Themes & Predictive Insights */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-6" style={{ backgroundColor: '#2A2A3A' }}>
        <div className="flex items-center mb-4">
          <Lightbulb className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Upcoming Themes & Predictive Insights</h3>
        </div>
        
        <div className="space-y-3">
          {predictiveInsights.map((insight, index) => (
            <div key={index} className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-3 flex-shrink-0" />
              <p className="text-sm text-gray-300 leading-relaxed">
                {insight}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Overall Performance */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-6" style={{ backgroundColor: '#2A2A3A' }}>
        <div className="flex items-center mb-4">
          <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Overall Performance</h3>
        </div>
        
        {/* Performance Chart */}
        <div className="h-32 mb-4">
          <div className="h-full flex items-end justify-between">
            {[20, 35, 25, 45, 30, 55, 40, 65, 50, 75, 60, 85, 70, 90, 80, 95, 85, 100, 90, 95, 85, 100, 90, 95, 85, 100, 90, 95, 85, 100].map((height, index) => (
              <div
                key={index}
                className={`rounded-sm ${
                  index % 2 === 0 ? 'bg-purple-500' : 'bg-blue-500'
                }`}
                style={{
                  width: '2px',
                  height: `${height}%`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-center space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2" />
            <span className="text-xs text-gray-400">Macro Trend</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
            <span className="text-xs text-gray-400">Your Performance</span>
          </div>
        </div>
      </div>

      {/* Performance Contributors */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-6" style={{ backgroundColor: '#2A2A3A' }}>
        <div className="flex items-center mb-4">
          <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Performance Contributors</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white">Consistency</span>
              <span className="text-sm font-semibold text-blue-400">92%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                style={{ width: '92%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trending Hashtags */}
      <div className="bg-gray-800 rounded-2xl p-6" style={{ backgroundColor: '#2A2A3A' }}>
        <div className="flex items-center mb-4">
          <Hash className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Trending Hashtags</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {['#GlowGoals', '#JuneVibes', '#MidYearReset', '#SummerVibes', '#CreatorLife', '#TrendingNow', '#ViralContent', '#EngagementBoost'].map((hashtag, index) => (
            <div key={index} className="text-center p-3 rounded-lg" style={{ backgroundColor: '#3A3A4A' }}>
              <div className="text-sm font-semibold text-white mb-1">
                {hashtag}
              </div>
              <div className="text-xs text-gray-400">
                +{Math.floor(Math.random() * 50 + 10)}% growth
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}