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
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  Heart
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

  // Dummy data for metrics
  const metricsData = {
    views: {
      '30d': { all: 125000, youtube: 45000, instagram: 35000, tiktok: 45000 },
      '60d': { all: 280000, youtube: 95000, instagram: 75000, tiktok: 110000 },
      '90d': { all: 420000, youtube: 140000, instagram: 120000, tiktok: 160000 }
    },
    engagement: {
      '30d': { all: 8.5, youtube: 7.2, instagram: 9.8, tiktok: 8.5 },
      '60d': { all: 8.8, youtube: 7.5, instagram: 10.2, tiktok: 8.7 },
      '90d': { all: 9.1, youtube: 7.8, instagram: 10.5, tiktok: 9.0 }
    },
    subscribers: {
      '30d': { all: 12500, youtube: 4500, instagram: 3500, tiktok: 4500 },
      '60d': { all: 28000, youtube: 9500, instagram: 7500, tiktok: 11000 },
      '90d': { all: 42000, youtube: 14000, instagram: 12000, tiktok: 16000 }
    }
  }

  // Dummy trending topics
  const trendingTopics = [
    { id: 1, topic: 'Labubu', relevance: 'High', growth: '+45%' },
    { id: 2, topic: 'AI Content Creation', relevance: 'High', growth: '+32%' },
    { id: 3, topic: 'Short-form Video Trends', relevance: 'Medium', growth: '+28%' },
    { id: 4, topic: 'Sustainable Fashion', relevance: 'Medium', growth: '+22%' },
    { id: 5, topic: 'Mental Health Awareness', relevance: 'High', growth: '+38%' }
  ]

  useEffect(() => {
    const savedUserData = localStorage.getItem('creatorhub-user')
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData))
    }
  }, [])

  const handleSaveUserData = (data: UserData) => {
    setUserData(data)
    localStorage.setItem('creatorhub-user', JSON.stringify(data))
  }

  const handleReset = () => {
    setUserData(null)
    localStorage.removeItem('creatorhub-user')
    localStorage.removeItem('pending-concepts')
  }

  const getCurrentMetricValue = () => {
    const metric = metricsData[selectedMetric]
    const timeframe = metric[selectedTimeframe]
    return selectedPlatform === 'all' ? timeframe.all : timeframe[selectedPlatform]
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const generateChartData = () => {
    const days = selectedTimeframe === '30d' ? 30 : selectedTimeframe === '60d' ? 60 : 90
    const data = []
    
    for (let i = days; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: Math.floor(Math.random() * 10000) + 10000
      })
    }
    return data
  }

  const handleAddToConcepts = (topic: string) => {
    const existingConcepts = JSON.parse(localStorage.getItem('pending-concepts') || '[]')
    const newConcept = {
      id: Date.now(),
      title: topic,
      description: `Content idea based on trending topic: ${topic}`,
      platform: 'Multi-platform',
      status: 'concept' as const,
      createdAt: new Date().toISOString()
    }
    existingConcepts.push(newConcept)
    localStorage.setItem('pending-concepts', JSON.stringify(existingConcepts))
    setCurrentPage('projects')
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'analytics':
        const currentValue = getCurrentMetricValue()
        const chartData = generateChartData()
        
        return (
          <div className="min-h-screen bg-white">
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
                      className="flex items-center space-x-2 text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors"
                    >
                      <span>{selectedMetric === 'views' ? 'Views' : selectedMetric === 'engagement' ? 'Engagement' : 'Subscribers'}</span>
                      <ChevronDown className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {selectedMetric === 'engagement' ? `${currentValue}%` : formatNumber(currentValue)}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      +12.5% from last period
                    </span>
                    <span>{selectedTimeframe} • {selectedPlatform === 'all' ? 'All Platforms' : selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}</span>
                  </div>
                </div>

                {/* Platform and Timeframe Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex space-x-2">
                    {(['all', 'youtube', 'instagram', 'tiktok'] as const).map((platform) => (
                      <button
                        key={platform}
                        onClick={() => setSelectedPlatform(platform)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedPlatform === platform
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {platform === 'all' ? 'All' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    {(['30d', '60d', '90d'] as const).map((timeframe) => (
                      <button
                        key={timeframe}
                        onClick={() => setSelectedTimeframe(timeframe)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
              </div>

              {/* Chart and Trending Topics Side by Side */}
              <div className="grid grid-cols-5 gap-6 mb-8">
                {/* Chart - 4/5 width */}
                <div className="col-span-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Live Data</span>
                      </div>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis 
                            dataKey="date" 
                            stroke="#6b7280"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis 
                            stroke="#6b7280"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => formatNumber(value)}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '12px',
                              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                            }}
                            labelStyle={{ color: '#374151', fontWeight: '600' }}
                            formatter={(value: any) => [formatNumber(value), selectedMetric === 'views' ? 'Views' : selectedMetric === 'engagement' ? 'Engagement' : 'Subscribers']}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#22c55e" 
                            strokeWidth={3}
                            dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                      <span>Last updated: {new Date().toLocaleTimeString()}</span>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {selectedMetric === 'views' ? 'Views' : selectedMetric === 'engagement' ? 'Engagement' : 'Subscribers'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trending Topics - 1/5 width */}
                <div className="col-span-1">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Trending Topics</h3>
                        <p className="text-xs text-gray-600 mt-1">AI-powered insights</p>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span>Live</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {trendingTopics.map((topic) => (
                        <div key={topic.id} className="group bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-all duration-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-gray-900 text-sm">{topic.topic}</h4>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                  topic.relevance === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {topic.relevance}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <TrendingUp className="h-3 w-3 text-green-600" />
                                  <span className="font-semibold text-green-600">{topic.growth}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleAddToConcepts(topic.topic)}
                            className="w-full px-3 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white text-xs font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Add to Concepts
                          </button>
                        </div>
                      ))}
                    </div>
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

  if (!userData) {
    return <OnboardingForm onComplete={handleSaveUserData} />
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
