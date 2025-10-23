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
  Sparkles,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Clock,
  DollarSign,
  Zap,
  Star,
  Award,
  Calendar,
  Globe,
  Smartphone,
  Video,
  Image as ImageIcon,
  Music
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
  { platform: 'Instagram', percentage: 62, change: '+2.3%', trend: 'up', followers: '125K', engagement: '8.5%' },
  { platform: 'TikTok', percentage: 78, change: '+5.1%', trend: 'up', followers: '89K', engagement: '12.3%' },
  { platform: 'YouTube', percentage: 55, change: '-1.4%', trend: 'down', followers: '45K', engagement: '6.2%' },
  { platform: 'Snap', percentage: 43, change: '-3.2%', trend: 'down', followers: '23K', engagement: '4.1%' },
  { platform: 'Twitch', percentage: 69, change: '+4.8%', trend: 'up', followers: '12K', engagement: '15.7%' }
]

// Mock data for recent content performance
const recentContent = [
  { title: 'Morning Routine Vlog', platform: 'YouTube', views: '45K', engagement: '8.2%', time: '2h ago' },
  { title: 'Fitness Transformation', platform: 'Instagram', views: '23K', engagement: '12.5%', time: '5h ago' },
  { title: 'Dance Challenge', platform: 'TikTok', views: '156K', engagement: '18.3%', time: '1d ago' },
  { title: 'Cooking Tutorial', platform: 'YouTube', views: '32K', engagement: '7.1%', time: '2d ago' }
]

// Mock data for upcoming opportunities
const opportunities = [
  { title: 'Brand Partnership - Tech Review', value: '$2,500', deadline: '3 days', status: 'hot' },
  { title: 'Sponsored Post - Fashion', value: '$1,200', deadline: '1 week', status: 'warm' },
  { title: 'Product Launch Video', value: '$3,800', deadline: '2 weeks', status: 'cool' }
]

export default function DailyPulseDashboard({ userData, onReset }: DailyPulseDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('All')

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#1A1A2E' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-heading-xl text-white mb-2">Daily Pulse</h1>
        <p className="text-caption text-gray-400">Creator Performance Analytics</p>
      </div>

      {/* Top Row - Performance Score and Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Score Card */}
        <div className="card-dark p-8 animate-float">
        <div className="text-center mb-6">
          <div className="text-display text-white mb-4 text-glow">83</div>
          <div className="flex items-center justify-center mb-4">
            <div className="performance-tier expert mr-3">EXPERT</div>
            <div className="achievement-badge gold">TOP 5%</div>
          </div>
          <div className="text-heading text-accent mb-4">STRONG PERFORMANCE</div>
          <p className="text-body text-gray-300 leading-relaxed">
            Consider reviewing outstanding & overdue payments, optimized posting times and your remaining action items for today.
          </p>
        </div>
        </div>

        {/* Key Metrics */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="card-dark p-6 glow-blue">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-overline text-gray-400 mb-1">TOTAL FOLLOWERS</div>
                <div className="text-impact text-white text-mono">294K</div>
                <div className="text-caption text-green-400">+12.5% this month</div>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="card-dark p-6 glow-purple">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-overline text-gray-400 mb-1">AVG ENGAGEMENT</div>
                <div className="text-impact text-white text-mono">9.2%</div>
                <div className="text-caption text-green-400">+2.1% this week</div>
              </div>
              <Heart className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="card-dark p-6 glow-green">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-overline text-gray-400 mb-1">CONTENT VIEWS</div>
                <div className="text-impact text-white text-mono">2.4M</div>
                <div className="text-caption text-green-400">+18.3% this month</div>
              </div>
              <Eye className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="card-dark p-6 glow-pink">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-overline text-gray-400 mb-1">COMMENTS</div>
                <div className="text-impact text-white text-mono">8.7K</div>
                <div className="text-caption text-green-400">+5.2% this week</div>
              </div>
              <MessageCircle className="w-8 h-8 text-pink-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Value and Revenue Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Portfolio Value */}
        <div className="card-dark p-8 glow-blue">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="wealth-indicator text-4xl font-bold text-white mb-2 text-mono">$24,680</div>
              <div className="text-caption text-gray-400 mb-2">TOTAL PORTFOLIO VALUE</div>
              <div className="revenue-streak">7-DAY GROWTH STREAK</div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedTimeframe('1M')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTimeframe === '1M' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                1M
              </button>
              <button 
                onClick={() => setSelectedTimeframe('3M')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTimeframe === '3M' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                3M
              </button>
              <button 
                onClick={() => setSelectedTimeframe('All')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTimeframe === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                All
              </button>
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
            <div className="growth-sparkle bg-purple-500 text-white px-3 py-2 rounded-lg text-sm flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="font-semibold">+3.1%</span>
            </div>
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="card-dark p-8 glow-purple">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BarChart3 className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-heading text-white">Revenue Summary</h3>
            </div>
            <div className="milestone-indicator">$30K Target</div>
          </div>
          
          <div className="space-y-4">
            {platformData.map((platform, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-body font-semibold text-white mr-2">
                        {platform.percentage}% {platform.platform}
                      </span>
                      <span className="text-caption text-gray-400">
                        {platform.followers} • {platform.engagement}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {platform.trend === 'up' ? (
                        <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-400 mr-1" />
                      )}
                      <span className={`text-caption font-semibold ${
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
      </div>

      {/* Recent Content Performance */}
      <div className="card-dark p-8 mb-8 glow-green">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Video className="w-6 h-6 text-green-400 mr-3" />
            <h3 className="text-heading text-white">Recent Content Performance</h3>
          </div>
          <div className="achievement-badge silver">Trending</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentContent.map((content, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-all">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-body font-semibold text-white">{content.title}</h4>
                <div className="flex items-center text-caption text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  {content.time}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {content.platform === 'YouTube' && <Video className="w-4 h-4 text-red-400 mr-2" />}
                  {content.platform === 'Instagram' && <ImageIcon className="w-4 h-4 text-pink-400 mr-2" />}
                  {content.platform === 'TikTok' && <Music className="w-4 h-4 text-black mr-2" />}
                  <span className="text-caption text-gray-400">{content.platform}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-caption text-white font-semibold">{content.views}</div>
                  <div className="text-caption text-green-400 font-semibold">{content.engagement}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities and Performance Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Opportunities */}
        <div className="card-dark p-8 glow-pink">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Target className="w-6 h-6 text-pink-400 mr-3" />
              <h3 className="text-heading text-white">Revenue Opportunities</h3>
            </div>
            <div className="performance-tier rising">Hot Leads</div>
          </div>
          
          <div className="space-y-4">
            {opportunities.map((opp, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-body font-semibold text-white">{opp.title}</h4>
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${
                    opp.status === 'hot' ? 'bg-red-500 text-white' :
                    opp.status === 'warm' ? 'bg-orange-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {opp.status.toUpperCase()}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-caption text-gray-400">Due: {opp.deadline}</div>
                  <div className="text-heading text-green-400 font-bold">{opp.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Pulse */}
        <div className="card-dark p-8 glow-green">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Activity className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-heading text-white">Performance Pulse</h3>
            </div>
            <div className="achievement-badge silver">Trending</div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body font-semibold text-white">Content Consistency</span>
                <span className="text-caption text-green-400 font-semibold">92%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500" style={{ width: '92%' }} />
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body font-semibold text-white">Engagement Quality</span>
                <span className="text-caption text-green-400 font-semibold">87%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-purple-500" style={{ width: '87%' }} />
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body font-semibold text-white">Growth Rate</span>
                <span className="text-caption text-green-400 font-semibold">+15.3%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-pink-500" style={{ width: '78%' }} />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-800 rounded-xl">
            <p className="text-body text-gray-300 leading-relaxed">
              This week&apos;s trends highlight modern transitions, looping soundscapes, and clean motion edits. 
              Based on your recent engagement, consider creating a 15-second vertical story feature that 
              showcases your daily routine with trending audio.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}