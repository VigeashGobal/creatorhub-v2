'use client'

import { useState } from 'react'
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

export default function ContentEngine({ userData, onReset }: ContentEngineProps) {
  const [activeTab, setActiveTab] = useState('trending')

  // Dummy data for trending topics
  const trendingTopics = [
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
    },
    {
      id: 3,
      title: 'Remote Work Tips',
      category: 'Business',
      hashtag: '#RemoteWork',
      engagement: 92,
      posts: 15600,
      growth: '+28%',
      trend: 'up',
      platforms: ['LinkedIn', 'YouTube', 'Instagram'],
      description: 'Productivity hacks and work-from-home strategies for remote professionals',
      relatedCreators: ['@remoteworker', '@productivityguru', '@workfromhome']
    },
    {
      id: 4,
      title: 'Mental Health Awareness',
      category: 'Health',
      hashtag: '#MentalHealth',
      engagement: 96,
      posts: 22000,
      growth: '+67%',
      trend: 'up',
      platforms: ['TikTok', 'Instagram', 'YouTube'],
      description: 'Mental wellness content and self-care practices resonating with audiences',
      relatedCreators: ['@mentalhealthadvocate', '@wellnesscoach', '@selfcare']
    }
  ]

  // Dummy data for competitors
  const competitors = [
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
    },
    {
      id: 2,
      name: '@ecowarrior',
      platform: 'Instagram',
      followers: 1.8,
      engagement: 12.3,
      avgViews: 45000,
      contentTypes: ['Reels', 'Stories', 'Posts'],
      recentPosts: [
        { title: 'Zero Waste Kitchen Tips', views: 67000, likes: 9200, comments: 1500 },
        { title: 'DIY Natural Cleaning Products', views: 54000, likes: 7800, comments: 1200 },
        { title: 'Sustainable Fashion Haul', views: 89000, likes: 11000, comments: 1800 }
      ],
      strengths: ['Authentic content', 'High engagement', 'Visual storytelling'],
      opportunities: ['YouTube expansion', 'Product collaborations', 'Educational content']
    },
    {
      id: 3,
      name: '@productivityguru',
      platform: 'LinkedIn',
      followers: 0.9,
      engagement: 15.7,
      avgViews: 25000,
      contentTypes: ['Articles', 'Posts', 'Videos'],
      recentPosts: [
        { title: '10 Productivity Hacks for Remote Workers', views: 35000, likes: 1200, comments: 300 },
        { title: 'Time Management Techniques', views: 28000, likes: 950, comments: 250 },
        { title: 'Building Better Work Habits', views: 42000, likes: 1500, comments: 400 }
      ],
      strengths: ['Professional expertise', 'Thought leadership', 'B2B audience'],
      opportunities: ['Video content', 'Course creation', 'Speaking engagements']
    }
  ]

  // Dummy data for content suggestions
  const contentSuggestions = [
    {
      id: 1,
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
    },
    {
      id: 2,
      title: 'Sustainable Living Challenge',
      type: 'Social Media Campaign',
      platform: 'Instagram',
      estimatedViews: 75000,
      difficulty: 'Easy',
      timeToCreate: '1 week',
      description: '30-day sustainable living challenge with daily tips and progress updates',
      topics: ['Zero waste tips', 'Eco-friendly products', 'Lifestyle changes'],
      tags: ['#SustainableLiving', '#Challenge', '#EcoFriendly'],
      inspiration: 'Based on trending topic: Sustainable Living'
    },
    {
      id: 3,
      title: 'Remote Work Productivity Guide',
      type: 'Blog Post Series',
      platform: 'Website',
      estimatedViews: 25000,
      difficulty: 'Easy',
      timeToCreate: '3-5 days',
      description: 'Comprehensive guide to remote work productivity with actionable tips',
      topics: ['Home office setup', 'Time management', 'Communication tools'],
      tags: ['#RemoteWork', '#Productivity', '#WorkFromHome'],
      inspiration: 'Based on competitor analysis: @productivityguru'
    }
  ]

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
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
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200">
                <Search className="h-4 w-4 mr-2" />
                Search Trends
              </button>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Trending Topics</p>
                <p className="text-2xl font-bold text-slate-900">24</p>
              </div>
              <TrendingUp className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Competitors Tracked</p>
                <p className="text-2xl font-bold text-slate-900">12</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Content Ideas</p>
                <p className="text-2xl font-bold text-slate-900">47</p>
              </div>
              <Lightbulb className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg. Engagement</p>
                <p className="text-2xl font-bold text-slate-900">8.5%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
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

        {/* Trending Topics Tab */}
        {activeTab === 'trending' && (
          <div className="space-y-6">
            {trendingTopics.map((topic) => (
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
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all duration-200">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Content
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Competitors Tab */}
        {activeTab === 'competitors' && (
          <div className="space-y-6">
            {competitors.map((competitor) => (
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
              </div>
            ))}
          </div>
        )}

        {/* Content Suggestions Tab */}
        {activeTab === 'suggestions' && (
          <div className="space-y-6">
            {contentSuggestions.map((suggestion) => (
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
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Start Creating
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
