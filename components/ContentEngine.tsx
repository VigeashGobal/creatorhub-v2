'use client'

import React, { useState, useCallback } from 'react'
import { 
  TrendingUp, 
  Search, 
  Target, 
  Lightbulb, 
  Users,
  Calendar,
  BarChart3,
  Zap,
  Star,
  ArrowRight,
  ExternalLink,
  Play,
  Image,
  FileText,
  Music,
  Hash,
  Eye,
  Heart,
  MessageSquare,
  Share,
  Clock,
  Filter,
  Plus,
  Bookmark,
  ThumbsUp
} from 'lucide-react'

interface ContentEngineProps {
  userData: any
  onReset: () => void
}

interface TrendingTopic {
  id: number
  title: string
  category: string
  hashtag: string
  engagement: number
  posts: number
  growth: string
  trend: string
  platforms: string[]
  description: string
  relatedCreators: string[]
}

interface Competitor {
  id: number
  name: string
  platform: string
  followers: number
  engagement: number
  avgViews: number
  contentTypes: string[]
  strengths: string[]
  opportunities: string[]
  recentPosts: {
    title: string
    views: number
    likes: number
    comments: number
  }[]
}

interface ContentSuggestion {
  id: string
  title: string
  type: string
  platform: string
  estimatedViews: number
  difficulty: string
  timeToCreate: string
  description: string
  topics: string[]
  tags: string[]
  inspiration: string
  priority?: string
}

export default function ContentEngine({ userData, onReset }: ContentEngineProps) {
  const [activeTab, setActiveTab] = useState('trending')
  const [isLoading, setIsLoading] = useState(true) // Start with loading true
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  
  // Initialize with empty arrays to prevent undefined errors
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([])
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [contentSuggestions, setContentSuggestions] = useState<ContentSuggestion[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Create project in project management
  const handleCreateProject = (title: string, description: string, platform: string, type: string = 'content-idea') => {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]')
    const newProject = {
      id: Date.now().toString(),
      title,
      description,
      platform,
      status: 'concept',
      tags: [type, 'from-content-engine'],
      createdAt: new Date().toISOString()
    }
    projects.push(newProject)
    localStorage.setItem('projects', JSON.stringify(projects))
    
    // Navigate to project management
    window.location.href = '/?page=projects'
  }

  // Fetch real competitor analysis data
  const fetchAnalysisData = useCallback(async () => {
    if (!userData?.youtube && !userData?.instagram && !userData?.tiktok) {
      console.log('No social media handles provided')
      return
    }

    setIsLoading(true)
    try {
      // Analyze each platform the user has
      const platforms = []
      if (userData.youtube) platforms.push({ platform: 'youtube', handle: userData.youtube })
      if (userData.instagram) platforms.push({ platform: 'instagram', handle: userData.instagram })
      if (userData.tiktok) platforms.push({ platform: 'tiktok', handle: userData.tiktok })

      const analysisPromises = platforms.map(async (platformData) => {
        const response = await fetch('/api/competitor-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(platformData)
        })
        return response.json()
      })

      const results = await Promise.all(analysisPromises)
      
      // Combine results from all platforms
      const combinedData = {
        userProfile: results[0]?.userProfile || null,
        industryTrends: results.flatMap(r => r.industryTrends || []),
        competitors: results.flatMap(r => r.competitors || []),
        contentSuggestions: results.flatMap(r => r.contentSuggestions || [])
      }
      
      setAnalysisData(combinedData)
      setUserProfile(combinedData.userProfile)
      setTrendingTopics(combinedData.industryTrends || [])
      setCompetitors(combinedData.competitors || [])
      setContentSuggestions(combinedData.contentSuggestions || [])
      setIsInitialized(true)
      setIsReady(true)
    } catch (error) {
      console.error('Error fetching analysis data:', error)
      setIsInitialized(true)
      setIsReady(true)
    } finally {
      setIsLoading(false)
    }
  }, [userData])

  // Fetch data when component mounts
  React.useEffect(() => {
    fetchAnalysisData()
  }, [fetchAnalysisData])

  // Initialize with dummy data immediately
  React.useEffect(() => {
    const dummyTrendingTopics = [
      {
        id: 1,
        title: 'AI Content Creation',
        category: 'Technology',
        hashtag: '#AIContent',
        engagement: 95,
        posts: 12500,
        growth: '+45%',
        trend: 'up',
        platforms: ['TikTok', 'Instagram', 'YouTube'],
        description: 'AI-powered content creation tools and techniques are dominating social media',
        relatedCreators: ['@techguru', '@aiinnovator', '@contentcreator']
      },
      {
        id: 2,
        title: 'Sustainable Living',
        category: 'Lifestyle',
        hashtag: '#SustainableLiving',
        engagement: 88,
        posts: 8900,
        growth: '+32%',
        trend: 'up',
        platforms: ['Instagram', 'TikTok', 'YouTube'],
        description: 'Eco-friendly lifestyle tips and sustainable practices gaining massive traction',
        relatedCreators: ['@ecowarrior', '@greenliving', '@sustainablelife']
      }
    ]
    
    const dummyCompetitors = [
      {
        id: 1,
        name: '@techguru',
        platform: 'YouTube',
        followers: 2.5,
        engagement: 8.5,
        avgViews: 125000,
        contentTypes: ['Tutorials', 'Reviews', 'News'],
        recentPosts: [
          { title: 'AI Tools for Content Creators', views: 150000, likes: 8500, comments: 1200 },
          { title: 'Best Laptops for Creators 2024', views: 98000, likes: 4200, comments: 890 },
          { title: 'How to Edit Videos Like a Pro', views: 200000, likes: 12000, comments: 2100 }
        ],
        strengths: ['High-quality tutorials', 'Consistent posting', 'Strong community'],
        opportunities: ['More short-form content', 'Live streaming', 'Collaborations']
      }
    ]
    
    const dummyContentSuggestions = [
      {
        id: '1',
        title: 'AI Content Creation Tutorial Series',
        type: 'Video Series',
        platform: 'YouTube',
        estimatedViews: 150000,
        difficulty: 'Medium',
        timeToCreate: '2-3 weeks',
        description: 'Create a comprehensive tutorial series on AI tools for content creation',
        topics: ['ChatGPT for content ideas', 'AI video editing', 'Automated social media'],
        tags: ['#AIContent', '#Tutorial', '#TechTips'],
        inspiration: 'Based on trending topic: AI Content Creation'
      }
    ]

    setTrendingTopics(dummyTrendingTopics)
    setCompetitors(dummyCompetitors)
    setContentSuggestions(dummyContentSuggestions)
    setIsInitialized(true)
    setIsReady(true)
  }, [])

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 'text-green-500' : 'text-red-500'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Don't render until component is completely ready
  if (!isReady || !isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-2 mr-4">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Content Engine</h1>
                  <p className="text-sm text-slate-600">Discover trends, analyze competitors, and get content ideas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Initializing Content Engine</h3>
            <p className="text-slate-600">Setting up your personalized content insights...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="bg-green-600 rounded-xl p-2 mr-4">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Content Engine</h1>
                <p className="text-sm text-gray-600">Discover trends, analyze competitors, and get content ideas</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={fetchAnalysisData}
                disabled={isLoading}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50"
              >
                <Search className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Analyzing...' : 'Refresh Analysis'}
              </button>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Section */}
        {userProfile && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Profile Analysis</h3>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {userProfile.industry?.charAt(0).toUpperCase() + userProfile.industry?.slice(1)} Creator
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Detected Industry</h4>
                <p className="text-lg font-semibold text-gray-900">{userProfile.industry?.charAt(0).toUpperCase() + userProfile.industry?.slice(1)}</p>
                <p className="text-sm text-gray-600">Based on your content and handles</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Primary Niche</h4>
                <p className="text-lg font-semibold text-gray-900">{userProfile.niche?.charAt(0).toUpperCase() + userProfile.niche?.slice(1)}</p>
                <p className="text-sm text-gray-600">Your main content focus</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Content Style</h4>
                <p className="text-lg font-semibold text-gray-900">{userProfile.contentStyle?.charAt(0).toUpperCase() + userProfile.contentStyle?.slice(1)}</p>
                <p className="text-sm text-gray-600">Your content approach</p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-600 text-sm font-semibold">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5%
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Trending Topics</p>
              <p className="text-3xl font-bold text-gray-900">{trendingTopics?.length || 0}</p>
              <p className="text-xs text-gray-500 mt-1">AI-powered insights</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-blue-600 text-sm font-semibold">
                  <Users className="h-3 w-3 mr-1" />
                  +8.2%
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Competitors Tracked</p>
              <p className="text-3xl font-bold text-gray-900">{competitors?.length || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Active monitoring</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-orange-600 text-sm font-semibold">
                  <Lightbulb className="h-3 w-3 mr-1" />
                  +15.3%
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Content Ideas</p>
              <p className="text-3xl font-bold text-gray-900">{contentSuggestions?.length || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Generated today</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-purple-600 text-sm font-semibold">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  +5.7%
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Industry Focus</p>
              <p className="text-2xl font-bold text-gray-900">{userProfile?.industry?.charAt(0).toUpperCase() + userProfile?.industry?.slice(1) || 'General'}</p>
              <p className="text-xs text-gray-500 mt-1">Primary niche</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'trending', name: 'Trending Topics', icon: TrendingUp },
                { id: 'competitors', name: 'Competitors', icon: Users },
                { id: 'suggestions', name: 'Content Ideas', icon: Lightbulb }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Analyzing Your Content</h3>
            <p className="text-slate-600">We&apos;re analyzing your social media profiles and finding relevant trends and competitors...</p>
          </div>
        )}

        {/* Trending Topics Tab */}
        {activeTab === 'trending' && !isLoading && (
          <div className="space-y-6">
            {trendingTopics && trendingTopics.length > 0 ? trendingTopics.map((topic) => (
              <div key={topic.id} className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{topic.title}</h3>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                        {topic.category}
                      </span>
                      <span className="px-2 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-medium">
                        {topic.hashtag}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{topic.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{topic.engagement}%</div>
                        <div className="text-sm text-slate-600">Engagement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{topic.posts.toLocaleString()}</div>
                        <div className="text-sm text-slate-600">Posts</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getTrendIcon(topic.trend)}`}>{topic.growth}</div>
                        <div className="text-sm text-slate-600">Growth</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{topic.platforms.length}</div>
                        <div className="text-sm text-slate-600">Platforms</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="text-sm font-medium text-slate-700 mb-1">Active Platforms</div>
                        <div className="flex space-x-2">
                          {topic.platforms.map((platform) => (
                            <span key={platform} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    <button 
                      onClick={() => handleCreateProject(topic.title, topic.description, topic.platforms[0] || 'Multi-platform', 'trending-topic')}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Now
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-12 text-center">
                <div className="text-slate-400 mb-4">
                  <TrendingUp className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Trending Topics Found</h3>
                <p className="text-slate-600">We couldn&apos;t find any trending topics in your industry. Try refreshing the analysis.</p>
              </div>
            )}
          </div>
        )}

        {/* Competitors Tab */}
        {activeTab === 'competitors' && !isLoading && (
          <div className="space-y-6">
            {competitors && competitors.length > 0 ? competitors.map((competitor) => (
              <div key={competitor.id} className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {competitor.name[1].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{competitor.name}</h3>
                      <p className="text-sm text-slate-600">{competitor.platform} • {competitor.followers}M followers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">{competitor.engagement}%</div>
                    <div className="text-sm text-slate-600">Engagement Rate</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Recent Posts</h4>
                    <div className="space-y-2">
                      {competitor.recentPosts.map((post, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-slate-900 truncate">{post.title}</span>
                          <div className="flex items-center space-x-2 text-slate-600">
                            <Eye className="h-3 w-3" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Strengths</h4>
                    <div className="space-y-1">
                      {competitor.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center text-sm text-slate-600">
                          <Star className="h-3 w-3 mr-2 text-yellow-500" />
                          {strength}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Opportunities</h4>
                    <div className="space-y-1">
                      {competitor.opportunities.map((opportunity, index) => (
                        <div key={index} className="flex items-center text-sm text-slate-600">
                          <Target className="h-3 w-3 mr-2 text-green-500" />
                          {opportunity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => handleCreateProject(
                      `Content inspired by ${competitor.name}`,
                      `Create ${competitor.contentTypes[0] || 'content'} inspired by ${competitor.name}'s successful strategy on ${competitor.platform}`,
                      competitor.platform,
                      'competitor-analysis'
                    )}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Now
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-200">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Profile
                  </button>
                </div>
              </div>
            )) : (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-12 text-center">
                <div className="text-slate-400 mb-4">
                  <Users className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Competitors Found</h3>
                <p className="text-slate-600">We couldn&apos;t find any competitors in your industry. Try refreshing the analysis.</p>
              </div>
            )}
          </div>
        )}

        {/* Content Suggestions Tab */}
        {activeTab === 'suggestions' && !isLoading && (
          <div className="space-y-6">
            {contentSuggestions && contentSuggestions.length > 0 ? contentSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{suggestion.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(suggestion.difficulty)}`}>
                        {suggestion.difficulty}
                      </span>
                      <span className="px-2 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-medium">
                        {suggestion.platform}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{suggestion.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{suggestion.estimatedViews.toLocaleString()}</div>
                        <div className="text-sm text-slate-600">Est. Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{suggestion.timeToCreate}</div>
                        <div className="text-sm text-slate-600">Time to Create</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{suggestion.topics.length}</div>
                        <div className="text-sm text-slate-600">Topics</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{suggestion.tags.length}</div>
                        <div className="text-sm text-slate-600">Tags</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-2">Topics to Cover</h4>
                        <div className="flex flex-wrap gap-2">
                          {suggestion.topics.map((topic, index) => (
                            <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-2">Suggested Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {suggestion.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-slate-100 text-slate-800 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">Inspiration:</span> {suggestion.inspiration}
                      </p>
                    </div>
                  </div>
                  
                  <div className="ml-6 space-y-2">
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all duration-200">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save Idea
                    </button>
                    <button 
                      onClick={() => handleCreateProject(suggestion.title, suggestion.description, suggestion.platform, 'content-suggestion')}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Now
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-12 text-center">
                <div className="text-slate-400 mb-4">
                  <Lightbulb className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Content Suggestions Found</h3>
                <p className="text-slate-600">We couldn&apos;t generate any content suggestions. Try refreshing the analysis.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
