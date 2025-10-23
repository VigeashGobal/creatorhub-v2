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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ExploreTrendsProps {
  userData: any
  onReset: () => void
}

// Mock data for performance comparison
const performanceData = [
  { month: 'Feb', macroTrend: 75, yourPerformance: 65 },
  { month: 'Mar', macroTrend: 78, yourPerformance: 70 },
  { month: 'Apr', macroTrend: 82, yourPerformance: 75 },
  { month: 'May', macroTrend: 85, yourPerformance: 80 },
  { month: 'Jun', macroTrend: 88, yourPerformance: 85 },
  { month: 'Jul', macroTrend: 90, yourPerformance: 88 },
  { month: 'Aug', macroTrend: 92, yourPerformance: 90 },
  { month: 'Sep', macroTrend: 95, yourPerformance: 92 },
  { month: 'Oct', macroTrend: 98, yourPerformance: 95 },
  { month: 'Nov', macroTrend: 100, yourPerformance: 98 },
  { month: 'Dec', macroTrend: 102, yourPerformance: 100 }
]

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
  const [selectedFilter, setSelectedFilter] = useState('all')

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--dark-bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Explore Trends
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Discover what&apos;s trending and predict future opportunities
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search creators, niches or keywords"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-dark w-full pl-12 pr-4 py-4 text-lg"
            />
          </div>
        </div>

        {/* Upcoming Themes & Predictive Insights */}
        <div className="card-dark p-8 mb-8">
          <div className="flex items-center mb-6">
            <Lightbulb className="w-6 h-6 mr-3" style={{ color: 'var(--accent-blue)' }} />
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Upcoming Themes & Predictive Insights
            </h3>
          </div>
          
          <div className="space-y-4">
            {predictiveInsights.map((insight, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: 'var(--accent-blue)' }} />
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Performance */}
        <div className="card-dark p-8 mb-8">
          <div className="flex items-center mb-6">
            <BarChart3 className="w-6 h-6 mr-3" style={{ color: 'var(--accent-blue)' }} />
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Overall Performance
            </h3>
          </div>
          
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--dark-bg-tertiary)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--text-muted)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--text-muted)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--dark-bg-card)',
                    border: '1px solid var(--dark-bg-tertiary)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="macroTrend" 
                  stroke="var(--accent-purple)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--accent-purple)', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="yourPerformance" 
                  stroke="var(--accent-blue)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: 'var(--accent-blue)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: 'var(--accent-purple)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Macro Trend</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: 'var(--accent-blue)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Your Performance</span>
            </div>
          </div>
        </div>

        {/* Performance Contributors */}
        <div className="card-dark p-8 mb-8">
          <div className="flex items-center mb-6">
            <BarChart3 className="w-6 h-6 mr-3" style={{ color: 'var(--accent-blue)' }} />
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Performance Contributors
            </h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                  Consistency
                </span>
                <span className="text-lg font-semibold" style={{ color: 'var(--accent-blue)' }}>
                  92%
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: '92%',
                    background: 'linear-gradient(90deg, var(--accent-purple) 0%, var(--accent-blue) 100%)'
                  }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                  Engagement Quality
                </span>
                <span className="text-lg font-semibold" style={{ color: 'var(--accent-green)' }}>
                  87%
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: '87%',
                    background: 'linear-gradient(90deg, var(--accent-green) 0%, var(--accent-blue) 100%)'
                  }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                  Content Innovation
                </span>
                <span className="text-lg font-semibold" style={{ color: 'var(--accent-pink)' }}>
                  78%
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: '78%',
                    background: 'linear-gradient(90deg, var(--accent-pink) 0%, var(--accent-purple) 100%)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Trending Hashtags */}
        <div className="card-dark p-8">
          <div className="flex items-center mb-6">
            <Hash className="w-6 h-6 mr-3" style={{ color: 'var(--accent-blue)' }} />
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Trending Hashtags
            </h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {['#GlowGoals', '#JuneVibes', '#MidYearReset', '#SummerVibes', '#CreatorLife', '#TrendingNow', '#ViralContent', '#EngagementBoost'].map((hashtag, index) => (
              <div key={index} className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--dark-bg-tertiary)' }}>
                <div className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {hashtag}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  +{Math.floor(Math.random() * 50 + 10)}% growth
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
