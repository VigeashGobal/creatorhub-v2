'use client'

import { Card } from '@creatorhub/ui'
import { Calendar, TrendingUp, Flame } from 'lucide-react'

interface EngagementHeatmapProps {
  className?: string
}

// Generate last 30 days of engagement data
const generateEngagementData = () => {
  const data: { date: Date; engagement: number; posts: number }[] = []
  const today = new Date()
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Simulate realistic engagement patterns
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    
    // Higher engagement on weekends and some random variation
    const baseEngagement = isWeekend ? 8 + Math.random() * 4 : 5 + Math.random() * 3
    const posts = Math.floor(Math.random() * 3) + (isWeekend ? 1 : 0)
    
    data.push({
      date,
      engagement: Math.round(baseEngagement * 10) / 10,
      posts
    })
  }
  
  return data
}

const engagementData = generateEngagementData()
const maxEngagement = Math.max(...engagementData.map(d => d.engagement))
const minEngagement = Math.min(...engagementData.map(d => d.engagement))

const getEngagementColor = (engagement: number): string => {
  const normalized = (engagement - minEngagement) / (maxEngagement - minEngagement)
  
  if (normalized < 0.2) return 'bg-bg-sunken'
  if (normalized < 0.4) return 'bg-accent-blue/20'
  if (normalized < 0.6) return 'bg-accent-blue/40'
  if (normalized < 0.8) return 'bg-accent-green/60'
  return 'bg-accent-green'
}

const getEngagementIntensity = (engagement: number): string => {
  const normalized = (engagement - minEngagement) / (maxEngagement - minEngagement)
  
  if (normalized < 0.2) return 'Low'
  if (normalized < 0.4) return 'Medium'
  if (normalized < 0.6) return 'High'
  if (normalized < 0.8) return 'Very High'
  return 'Excellent'
}

export function EngagementHeatmap({ className = '' }: EngagementHeatmapProps) {
  const bestDay = engagementData.reduce((best, current) => 
    current.engagement > best.engagement ? current : best
  )
  
  const averageEngagement = engagementData.reduce((sum, d) => sum + d.engagement, 0) / engagementData.length
  const totalPosts = engagementData.reduce((sum, d) => sum + d.posts, 0)

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent-orange" />
          <h2 className="text-xl font-bold text-fg-high">Engagement Heatmap</h2>
        </div>
        <div className="text-xs px-3 py-1 rounded-full bg-accent-green/10 text-accent-green">
          Last 30 days
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3 bg-bg-soft rounded-lg">
          <div className="text-xs text-fg-dim mb-1">Avg Engagement</div>
          <div className="text-lg font-bold text-fg-high">{averageEngagement.toFixed(1)}%</div>
        </div>
        <div className="p-3 bg-bg-soft rounded-lg">
          <div className="text-xs text-fg-dim mb-1">Total Posts</div>
          <div className="text-lg font-bold text-fg-high">{totalPosts}</div>
        </div>
        <div className="p-3 bg-bg-soft rounded-lg">
          <div className="text-xs text-fg-dim mb-1">Best Day</div>
          <div className="text-lg font-bold text-accent-green">{bestDay.engagement.toFixed(1)}%</div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="mb-4">
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-xs text-fg-dim text-center py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {engagementData.map((day, index) => {
            const dayOfWeek = day.date.getDay()
            const week = Math.floor(index / 7)
            const dayInWeek = index % 7
            const isToday = day.date.toDateString() === new Date().toDateString()
            
            return (
              <div
                key={index}
                className={`aspect-square rounded transition-all hover:scale-110 hover:z-10 relative group cursor-pointer ${
                  getEngagementColor(day.engagement)
                } ${isToday ? 'ring-2 ring-accent-yellow' : ''}`}
                title={`${day.date.toLocaleDateString()}: ${day.engagement}% engagement, ${day.posts} posts`}
              >
                {day.posts > 0 && (
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-accent-yellow rounded-full" />
                )}
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-bg-dark border border-edge-subtle rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                  <div className="font-semibold text-fg-high">{day.date.toLocaleDateString()}</div>
                  <div className="text-fg-dim">Engagement: {day.engagement}%</div>
                  <div className="text-fg-dim">Posts: {day.posts}</div>
                  <div className="text-accent-green">Intensity: {getEngagementIntensity(day.engagement)}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs text-fg-dim mb-4">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded bg-bg-sunken" />
          <div className="w-3 h-3 rounded bg-accent-blue/20" />
          <div className="w-3 h-3 rounded bg-accent-blue/40" />
          <div className="w-3 h-3 rounded bg-accent-green/60" />
          <div className="w-3 h-3 rounded bg-accent-green" />
        </div>
        <span>More</span>
      </div>

      {/* Insights */}
      <div className="p-4 bg-gradient-to-br from-accent-orange/10 to-accent-yellow/10 rounded-lg border border-accent-orange/20">
        <div className="flex items-start gap-3">
          <Flame className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-fg-high mb-1">Best Performing Day</h4>
            <p className="text-xs text-fg-dim">
              Your best day was <strong>{bestDay.date.toLocaleDateString('en-US', { weekday: 'long' })}</strong> with{' '}
              <strong className="text-accent-green">{bestDay.engagement}% engagement</strong>. 
              Consider posting more on weekends for higher engagement.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

