'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Youtube,
  Instagram,
  Music,
  Search,
  Bell,
  User,
  Filter,
  Calendar,
  Smartphone,
  Video,
  Image,
  MessageSquare
} from 'lucide-react'
import OnboardingForm from '@/components/OnboardingForm'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import CRMDashboard from '@/components/CRMDashboard'
import ContentEngine from '@/components/ContentEngine'
import Navigation from '@/components/Navigation'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

export default function Home() {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState('analytics')
  const [chartFilter, setChartFilter] = useState({
    timeRange: '1M',
    platform: 'all',
    contentType: 'all'
  })

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedData = localStorage.getItem('creatorhub-user')
    if (storedData) {
      setUserData(JSON.parse(storedData))
    }
  }, [])

  const handleOnboardingComplete = (data: any) => {
    setUserData(data)
    localStorage.setItem('creatorhub-user', JSON.stringify(data))
  }

  const handleReset = () => {
    setUserData(null)
    localStorage.removeItem('creatorhub-user')
  }

  // Generate sample chart data
  const generateChartData = () => {
    const data = []
    const days = chartFilter.timeRange === '1D' ? 1 : 
                 chartFilter.timeRange === '1W' ? 7 :
                 chartFilter.timeRange === '1M' ? 30 :
                 chartFilter.timeRange === '3M' ? 90 : 365
    
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - 1 - i))
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        followers: Math.floor(Math.random() * 1000) + 1000 + i * 50,
        engagement: Math.floor(Math.random() * 20) + 5,
        views: Math.floor(Math.random() * 10000) + 5000 + i * 200
      })
    }
    return data
  }

  // Sample performance insights data
  const performanceInsights = [
    { 
      platform: 'YouTube', 
      handle: userData?.youtube || 'youtube.com/@user',
      followers: '125.4K',
      change: '+12.5%',
      trend: 'up',
      color: '#FF0000'
    },
    { 
      platform: 'Instagram', 
      handle: userData?.instagram || 'instagram.com/user',
      followers: '89.2K',
      change: '+8.3%',
      trend: 'up',
      color: '#E4405F'
    },
    { 
      platform: 'TikTok', 
      handle: userData?.tiktok || 'tiktok.com/@user',
      followers: '156.8K',
      change: '+15.2%',
      trend: 'up',
      color: '#000000'
    },
    { 
      platform: 'Twitter', 
      handle: '@user',
      followers: '45.1K',
      change: '+3.1%',
      trend: 'up',
      color: '#1DA1F2'
    },
    { 
      platform: 'LinkedIn', 
      handle: 'linkedin.com/in/user',
      followers: '23.7K',
      change: '+5.8%',
      trend: 'up',
      color: '#0077B5'
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-2xl p-4 shadow-xl">
                  <BarChart3 className="h-12 w-12 text-indigo-600" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-slate-900 mb-6">
                CreatorHub
                <span className="block text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Analytics
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Track your performance across all social media platforms with comprehensive analytics, 
                beautiful visualizations, and actionable insights.
              </p>
              
              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <TrendingUp className="h-8 w-8 text-green-500 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Real-time Analytics</h3>
                  <p className="text-slate-600">Track your growth across YouTube, Instagram, and TikTok with live data updates.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <Users className="h-8 w-8 text-blue-500 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Audience Insights</h3>
                  <p className="text-slate-600">Understand your audience with detailed engagement metrics and content performance.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <Zap className="h-8 w-8 text-purple-500 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Smart Insights</h3>
                  <p className="text-slate-600">Get AI-powered recommendations to optimize your content strategy.</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">3</div>
                  <div className="text-sm text-slate-600">Platforms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">24/7</div>
                  <div className="text-sm text-slate-600">Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">∞</div>
                  <div className="text-sm text-slate-600">Insights</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">100%</div>
                  <div className="text-sm text-slate-600">Free</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Onboarding Form */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Get Started</h2>
              <p className="text-slate-600">Connect your social media accounts to begin tracking your performance</p>
            </div>
            <OnboardingForm onComplete={handleOnboardingComplete} />
          </div>
        </div>
      </div>
    )
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'analytics':
        return <AnalyticsDashboard userData={userData} onReset={handleReset} />
      case 'crm':
        return <CRMDashboard userData={userData} onReset={handleReset} />
      case 'content':
        return <ContentEngine userData={userData} onReset={handleReset} />
      default:
        return <AnalyticsDashboard userData={userData} onReset={handleReset} />
    }
  }

  // Robinhood-inspired main dashboard
  if (currentPage === 'analytics') {
    return (
      <div className="min-h-screen bg-white">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <div className="bg-black rounded-lg p-2 mr-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">CreatorHub</h1>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <Bell className="h-5 w-5" />
                  <span className="text-sm">Notifications</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <User className="h-5 w-5" />
                  <span className="text-sm">Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Chart Area */}
            <div className="lg:col-span-3">
              {/* Portfolio Value */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900">$439.8K</h2>
                    <p className="text-gray-600">Total Followers</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-5 w-5 mr-1" />
                      <span className="font-semibold">+12.5%</span>
                    </div>
                    <p className="text-sm text-gray-600">vs last month</p>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Filters</span>
                  </div>
                </div>

                {/* Time Range Filters */}
                <div className="flex space-x-1 mb-6">
                  {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setChartFilter(prev => ({ ...prev, timeRange: range }))}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        chartFilter.timeRange === range
                          ? 'bg-green-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                {/* Platform Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-sm text-gray-600">Platform:</span>
                  <div className="flex space-x-2">
                    {[
                      { id: 'all', label: 'All', icon: BarChart3 },
                      { id: 'youtube', label: 'YouTube', icon: Youtube },
                      { id: 'instagram', label: 'Instagram', icon: Instagram },
                      { id: 'tiktok', label: 'TikTok', icon: Music }
                    ].map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => setChartFilter(prev => ({ ...prev, platform: platform.id }))}
                        className={`flex items-center px-3 py-1 text-sm rounded-md transition-colors ${
                          chartFilter.platform === platform.id
                            ? 'bg-green-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <platform.icon className="h-4 w-4 mr-1" />
                        {platform.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Type Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-sm text-gray-600">Content:</span>
                  <div className="flex space-x-2">
                    {[
                      { id: 'all', label: 'All', icon: BarChart3 },
                      { id: 'video', label: 'Videos', icon: Video },
                      { id: 'image', label: 'Images', icon: Image },
                      { id: 'text', label: 'Posts', icon: MessageSquare }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setChartFilter(prev => ({ ...prev, contentType: type.id }))}
                        className={`flex items-center px-3 py-1 text-sm rounded-md transition-colors ${
                          chartFilter.contentType === type.id
                            ? 'bg-green-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <type.icon className="h-4 w-4 mr-1" />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={generateChartData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="followers" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* News/Insights Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Latest Insights</h3>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Your TikTok content is outperforming Instagram by 40%</h4>
                      <p className="text-gray-600 text-sm">Consider focusing more on short-form video content to maximize engagement and growth.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Audience growth rate increased by 25% this month</h4>
                      <p className="text-gray-600 text-sm">Your recent content strategy changes are resonating well with your target audience.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Insights Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Performance</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  {performanceInsights.map((insight, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: insight.color }}
                          >
                            {insight.platform[0]}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{insight.platform}</p>
                            <p className="text-xs text-gray-500">{insight.handle}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{insight.followers}</p>
                          <div className={`flex items-center text-xs ${
                            insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {insight.trend === 'up' ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                            )}
                            {insight.change}
                          </div>
                        </div>
                        <div className="w-16 h-8">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                              { value: Math.random() * 100 },
                              { value: Math.random() * 100 },
                              { value: Math.random() * 100 },
                              { value: Math.random() * 100 }
                            ]}>
                              <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke={insight.trend === 'up' ? '#22c55e' : '#ef4444'} 
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        onReset={handleReset} 
      />
      {renderCurrentPage()}
    </div>
  )
}