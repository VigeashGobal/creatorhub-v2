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
import ContentEngine from '@/components/ContentEngine'
import Navigation from '@/components/Navigation'
import CompetitorCarousel from '@/components/CompetitorCarousel'
import FinancialSnapshot from '@/components/FinancialSnapshot'
import ProjectManagement from '@/components/ProjectManagement'
import LegalSupport from '@/components/LegalSupport'
import Invoicing from '@/components/Invoicing'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface UserData {
  name: string
  youtube?: string
  instagram?: string
  tiktok?: string
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState('analytics')
  const [selectedMetric, setSelectedMetric] = useState<'views' | 'engagement' | 'subscribers'>('views')
  const [selectedTimeframe, setSelectedTimeframe] = useState<'30d' | '60d' | '90d'>('30d')
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'youtube' | 'instagram' | 'tiktok'>('all')

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

  // Add concept to project management
  const handleAddToConcepts = (topic: string) => {
    setCurrentPage('crm')
    // Store concept in localStorage for project management to pick up
    const concepts = JSON.parse(localStorage.getItem('pending-concepts') || '[]')
    concepts.push({
      id: Date.now().toString(),
      title: topic,
      platform: 'Multi-platform',
      status: 'concept',
      createdAt: new Date().toISOString()
    })
    localStorage.setItem('pending-concepts', JSON.stringify(concepts))
  }

  // Dummy metrics data
  const metricsData = {
    views: {
      '30d': { all: 2500000, youtube: 1200000, instagram: 800000, tiktok: 500000 },
      '60d': { all: 4800000, youtube: 2300000, instagram: 1500000, tiktok: 1000000 },
      '90d': { all: 7200000, youtube: 3500000, instagram: 2200000, tiktok: 1500000 }
    },
    engagement: {
      '30d': { all: 125000, youtube: 60000, instagram: 40000, tiktok: 25000 },
      '60d': { all: 240000, youtube: 115000, instagram: 75000, tiktok: 50000 },
      '90d': { all: 360000, youtube: 175000, instagram: 110000, tiktok: 75000 }
    },
    subscribers: {
      '30d': { all: 15000, youtube: 8000, instagram: 4000, tiktok: 3000 },
      '60d': { all: 28000, youtube: 15000, instagram: 7500, tiktok: 5500 },
      '90d': { all: 42000, youtube: 22000, instagram: 11000, tiktok: 9000 }
    }
  }

  // Generate chart data based on selected metric and timeframe
  const generateChartData = () => {
    const days = selectedTimeframe === '30d' ? 30 : selectedTimeframe === '60d' ? 60 : 90
    const data = []
    const baseValue = metricsData[selectedMetric][selectedTimeframe][selectedPlatform]
    
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - 1 - i))
      const variance = (Math.random() - 0.5) * 0.2
      const value = Math.floor(baseValue / days + (baseValue / days) * variance + (i * baseValue / (days * 2)))
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: value
      })
    }
    return data
  }

  // Trending topics data
  const trendingTopics = [
    { id: 1, topic: 'Labubu Collectibles', growth: '+125%', relevance: 'High' },
    { id: 2, topic: 'AI Content Creation Tools', growth: '+89%', relevance: 'High' },
    { id: 3, topic: 'Short-form Video Trends', growth: '+67%', relevance: 'Medium' },
    { id: 4, topic: 'Creator Economy 2025', growth: '+54%', relevance: 'High' },
    { id: 5, topic: 'Instagram Reels Strategy', growth: '+43%', relevance: 'Medium' }
  ]

  // Get current metric value
  const getCurrentMetricValue = () => {
    return metricsData[selectedMetric][selectedTimeframe][selectedPlatform]
  }

  // Format number display
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

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
        return null // Handled separately below
      case 'financial':
        return <FinancialSnapshot userData={userData} onReset={handleReset} />
      case 'content':
        return <ContentEngine userData={userData} onReset={handleReset} />
      case 'projects':
        return <ProjectManagement userData={userData} onReset={handleReset} />
      case 'legal':
        return <LegalSupport userData={userData} onReset={handleReset} />
      case 'invoicing':
        return <Invoicing userData={userData} onReset={handleReset} />
      default:
        return null
    }
  }

  // Simplified Robinhood-inspired landing page
  if (currentPage === 'analytics') {
    const currentValue = getCurrentMetricValue()
    const chartData = generateChartData()
    
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <Navigation 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
          onReset={handleReset} 
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Personal Platform Data - Toggleable Metrics */}
          <div className="mb-8">
            {/* Main Metric Display */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <button 
                  onClick={() => {
                    const metrics: Array<'views' | 'engagement' | 'subscribers'> = ['views', 'engagement', 'subscribers']
                    const currentIndex = metrics.indexOf(selectedMetric)
                    const nextIndex = (currentIndex + 1) % metrics.length
                    setSelectedMetric(metrics[nextIndex])
                  }}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <span className="text-sm font-medium uppercase tracking-wide">
                    {selectedMetric === 'views' ? 'Total Views' : 
                     selectedMetric === 'engagement' ? 'Total Engagement' : 
                     'Total Subscribers'}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-baseline space-x-4">
                <h2 className="text-5xl font-bold text-gray-900">
                  {formatNumber(currentValue)}
                </h2>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-5 w-5 mr-1" />
                  <span className="text-lg font-semibold">+{selectedTimeframe === '30d' ? '12.5' : selectedTimeframe === '60d' ? '18.2' : '24.7'}%</span>
                </div>
              </div>
            </div>

            {/* Platform and Timeframe Selectors */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex space-x-2">
                {(['all', 'youtube', 'instagram', 'tiktok'] as const).map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedPlatform === platform
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {platform === 'all' ? 'All Platforms' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <div className="flex space-x-2">
                {(['30d', '60d', '90d'] as const).map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedTimeframe === timeframe
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>

            {/* Mini Chart */}
            <div className="h-48 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Trending Topics (Where "Options" would be in Robinhood) */}
          <div className="mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics for You</h3>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-gray-900">{topic.topic}</h4>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          topic.relevance === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {topic.relevance}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span className="text-sm text-green-600 font-medium">{topic.growth}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAddToConcepts(topic.topic)}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add to Concepts
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Competitor Content Carousel */}
          <div className="mb-8">
            <CompetitorCarousel />
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