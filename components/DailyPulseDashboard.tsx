'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Calendar,
  Clock,
  Zap,
  ArrowUp,
  ArrowDown,
  BarChart3,
  Target,
  Sparkles
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

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

// Mock data for revenue chart
const revenueData = [
  { month: 'Jan', value: 18000 },
  { month: 'Feb', value: 21000 },
  { month: 'Mar', value: 19500 },
  { month: 'Apr', value: 24680 },
  { month: 'May', value: 22000 },
  { month: 'Jun', value: 28000 }
]

// Mock data for platform performance
const platformData = [
  { platform: 'Instagram', percentage: 62, change: '+2.3%', trend: 'up' },
  { platform: 'TikTok', percentage: 78, change: '+5.1%', trend: 'up' },
  { platform: 'YouTube', percentage: 55, change: '-1.4%', trend: 'down' },
  { platform: 'Snapchat', percentage: 43, change: '-3.2%', trend: 'down' },
  { platform: 'Twitch', percentage: 69, change: '+4.8%', trend: 'up' }
]

export default function DailyPulseDashboard({ userData, onReset }: DailyPulseDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1M' | '3M' | 'All'>('1M')

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--dark-bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Daily Pulse
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Your creator performance at a glance
          </p>
        </div>

        {/* Pulse Score Section */}
        <div className="card-dark p-8 mb-8">
          <div className="text-center mb-6">
            <Activity className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--accent-blue)' }} />
            <div className="text-6xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              83
            </div>
            <div className="text-xl font-semibold mb-4" style={{ color: 'var(--accent-blue)' }}>
              STRONG
            </div>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Consider reviewing outstanding & overdue payments, optimized posting times and your remaining action items for today.
            </p>
          </div>
          
          {/* Pulse Graph */}
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={pulseData}>
                <defs>
                  <linearGradient id="pulseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--accent-blue)" 
                  strokeWidth={3}
                  dot={false}
                  filter="drop-shadow(0 0 8px rgba(74, 158, 255, 0.6))"
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  fill="url(#pulseGradient)" 
                  stroke="none"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Value Section */}
        <div className="card-dark p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                $24,680
              </div>
              <div className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                Total Value
              </div>
            </div>
            <div className="flex space-x-2">
              {['1M', '3M', 'All'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTimeframe === timeframe
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: selectedTimeframe === timeframe 
                      ? 'var(--accent-blue)' 
                      : 'var(--dark-bg-tertiary)'
                  }}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
          
          {/* Revenue Chart */}
          <div className="mb-4">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--accent-purple)" 
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-end">
            <div className="badge-dark badge-info">
              <TrendingUp className="w-4 h-4 mr-1" />
              +3.1%
            </div>
          </div>
        </div>

        {/* Revenue Summary Section */}
        <div className="card-dark p-8 mb-8">
          <div className="flex items-center mb-6">
            <BarChart3 className="w-6 h-6 mr-3" style={{ color: 'var(--accent-blue)' }} />
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Rev Summary
            </h3>
          </div>
          
          <div className="space-y-4">
            {platformData.map((platform, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {platform.percentage}% {platform.platform}
                    </span>
                    <div className="flex items-center">
                      {platform.trend === 'up' ? (
                        <ArrowUp className="w-4 h-4 mr-1" style={{ color: 'var(--status-success)' }} />
                      ) : (
                        <ArrowDown className="w-4 h-4 mr-1" style={{ color: 'var(--status-error)' }} />
                      )}
                      <span 
                        className="text-sm font-medium"
                        style={{ 
                          color: platform.trend === 'up' ? 'var(--status-success)' : 'var(--status-error)' 
                        }}
                      >
                        {platform.change}
                      </span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill progress-blue"
                      style={{ width: `${platform.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pulse Trends Section */}
        <div className="card-dark p-8">
          <div className="flex items-center mb-4">
            <Activity className="w-6 h-6 mr-3" style={{ color: 'var(--accent-blue)' }} />
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Pulse
            </h3>
          </div>
          
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            This week&apos;s trends highlight modern transitions, looping soundscapes, and clean motion edits. 
            Based on your recent engagement, consider creating a 15-second vertical story feature that 
            showcases your daily routine with trending audio.
          </p>
        </div>
      </div>
    </div>
  )
}
