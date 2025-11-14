'use client'

import { Card } from '@creatorhub/ui'
import { Users, MapPin, Clock, Heart, TrendingUp, BarChart3 } from 'lucide-react'

interface AudienceInsightsProps {
  className?: string
}

const ageGroups = [
  { age: '18-24', percentage: 35, color: 'bg-accent-blue' },
  { age: '25-34', percentage: 42, color: 'bg-accent-purple' },
  { age: '35-44', percentage: 18, color: 'bg-accent-green' },
  { age: '45+', percentage: 5, color: 'bg-accent-yellow' }
]

const topLocations = [
  { country: 'United States', percentage: 45 },
  { country: 'United Kingdom', percentage: 18 },
  { country: 'Canada', percentage: 12 },
  { country: 'Australia', percentage: 10 },
  { country: 'Other', percentage: 15 }
]

const peakTimes = [
  { hour: '6 AM', activity: 20 },
  { hour: '9 AM', activity: 45 },
  { hour: '12 PM', activity: 65 },
  { hour: '3 PM', activity: 55 },
  { hour: '6 PM', activity: 85 },
  { hour: '9 PM', activity: 70 },
  { hour: '12 AM', activity: 30 }
]

const interests = [
  { interest: 'Technology', percentage: 68 },
  { interest: 'Business', percentage: 52 },
  { interest: 'Education', percentage: 45 },
  { interest: 'Entertainment', percentage: 38 }
]

export function AudienceInsights({ className = '' }: AudienceInsightsProps) {
  const maxActivity = Math.max(...peakTimes.map(t => t.activity))

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-accent-blue" />
          <h2 className="text-xl font-bold text-fg-high">Audience Insights</h2>
        </div>
        <div className="text-xs px-3 py-1 rounded-full bg-accent-green/10 text-accent-green">
          Updated 2h ago
        </div>
      </div>

      {/* Demographics */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-fg-high mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Age Distribution
        </h3>
        <div className="space-y-2">
          {ageGroups.map((group) => (
            <div key={group.age} className="flex items-center gap-3">
              <div className="w-16 text-xs text-fg-dim">{group.age}</div>
              <div className="flex-1 bg-bg-sunken rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full ${group.color} rounded-full transition-all duration-500`}
                  style={{ width: `${group.percentage}%` }}
                />
              </div>
              <div className="w-12 text-xs font-semibold text-fg-high text-right">
                {group.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Locations */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-fg-high mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Top Locations
        </h3>
        <div className="space-y-2">
          {topLocations.map((location) => (
            <div key={location.country} className="flex items-center justify-between">
              <span className="text-sm text-fg-dim">{location.country}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-bg-sunken rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-accent-blue rounded-full transition-all duration-500"
                    style={{ width: `${location.percentage}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-fg-high w-10 text-right">
                  {location.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Peak Activity Times */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-fg-high mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Peak Activity Times
        </h3>
        <div className="flex items-end justify-between gap-1 h-32">
          {peakTimes.map((time) => (
            <div key={time.hour} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-accent-blue to-accent-purple rounded-t transition-all duration-500 hover:opacity-80"
                style={{ height: `${(time.activity / maxActivity) * 100}%` }}
              />
              <div className="text-xs text-fg-dim mt-1 transform -rotate-45 origin-top-left whitespace-nowrap">
                {time.hour}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-fg-high mb-3 flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Top Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((item) => (
            <div
              key={item.interest}
              className="px-3 py-1.5 bg-accent-blue/10 border border-accent-blue/20 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-fg-high">{item.interest}</span>
                <span className="text-xs text-fg-dim">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Indicator */}
      <div className="p-4 bg-gradient-to-br from-accent-green/10 to-accent-blue/10 rounded-lg border border-accent-green/20">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-accent-green" />
          <span className="text-sm font-semibold text-fg-high">Audience Growth</span>
        </div>
        <p className="text-xs text-fg-dim">
          Your audience is growing 12.5% faster than last month. 
          Focus on content that resonates with your 25-34 age group for maximum engagement.
        </p>
      </div>
    </Card>
  )
}

