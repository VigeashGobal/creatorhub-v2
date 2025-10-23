'use client'

import { useState } from 'react'
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  ArrowUp,
  ArrowDown,
  BarChart3,
  Target,
  Sparkles
} from 'lucide-react'

interface DailyPulseDashboardProps {
  userData: any
  onReset: () => void
}

// Mock data for the pulse graph
const pulseData = [
  { time: '00:00', value: 65 },
  { time: '04:00', value: 70 },
  { time: '08:00', value: 85 },
  { time: '12:00', value: 90 },
  { time: '16:00', value: 88 },
  { time: '20:00', value: 75 },
  { time: '24:00', value: 68 }
]

// Mock data for platform performance
const platformData = [
  { platform: 'Instagram', percentage: 62, change: '+2.3%', trend: 'up' },
  { platform: 'TikTok', percentage: 78, change: '+5.1%', trend: 'up' },
  { platform: 'YouTube', percentage: 55, change: '-1.4%', trend: 'down' },
  { platform: 'Snap', percentage: 43, change: '-3.2%', trend: 'down' },
  { platform: 'Twitch', percentage: 69, change: '+4.8%', trend: 'up' }
]

export default function DailyPulseDashboard({ userData, onReset }: DailyPulseDashboardProps) {
  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#1A1A2E' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Daily Pulse</h1>
      </div>

      {/* Pulse Score Section */}
      <div className="card-dark p-6 mb-6 animate-float">
        {/* Pulse Graph */}
        <div className="mb-4">
          <div className="h-16 flex items-end justify-between">
            {pulseData.map((point, index) => (
              <div
                key={index}
                className="bg-blue-500 rounded-full"
                style={{
                  width: '4px',
                  height: `${(point.value / 100) * 64}px`,
                  backgroundColor: '#4A9EFF'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Score */}
        <div className="text-center mb-4">
          <div className="text-5xl font-bold text-white mb-1">83</div>
          <div className="text-lg font-semibold text-blue-400">STRONG</div>
        </div>
        
        {/* Recommendation */}
        <p className="text-gray-300 text-center text-sm leading-relaxed">
          Consider reviewing outstanding & overdue payments, optimized posting times and your remaining action items for today.
        </p>
      </div>

      {/* Total Value Section */}
      <div className="card-dark p-6 mb-6 glow-blue">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-3xl font-bold text-white">$24,680</div>
            <div className="text-gray-400 text-sm">Total Value</div>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm">1M</button>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm">3M</button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">All</button>
          </div>
        </div>
        
        {/* Revenue Chart */}
        <div className="h-32 mb-4">
          <div className="h-full flex items-end justify-between">
            {[20, 35, 25, 45, 30, 55, 40, 65, 50, 75, 60, 85, 70, 90, 80, 95, 85, 100, 90, 95, 85, 100, 90, 95, 85, 100, 90, 95, 85, 100].map((height, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-sm"
                style={{
                  width: '2px',
                  height: `${height}%`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className="bg-purple-500 text-white px-2 py-1 rounded text-sm flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            +3.1%
          </div>
        </div>
      </div>

      {/* Rev Summary Section */}
      <div className="card-dark p-6 mb-6 glow-purple">
        <div className="flex items-center mb-4">
          <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Rev Summary</h3>
        </div>
        
        <div className="space-y-4">
          {platformData.map((platform, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-white">
                    {platform.percentage}% {platform.platform}
                  </span>
                  <div className="flex items-center">
                    {platform.trend === 'up' ? (
                      <ArrowUp className="w-3 h-3 text-green-400 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-red-400 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      platform.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {platform.change}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      platform.percentage > 60 ? 'bg-blue-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${platform.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pulse Trends Section */}
      <div className="card-dark p-6 glow-green">
        <div className="flex items-center mb-4">
          <Activity className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Pulse</h3>
        </div>
        
        <p className="text-gray-300 text-sm leading-relaxed">
          This week&apos;s trends highlight modern transitions, looping soundscapes, and clean motion edits. 
          Based on your recent engagement, consider creating a 15-second vertical story feature that 
          showcases your daily routine with trending audio.
        </p>
      </div>
    </div>
  )
}