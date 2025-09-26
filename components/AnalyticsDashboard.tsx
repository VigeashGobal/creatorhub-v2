'use client'

import { useState } from 'react'
import { 
  Youtube, 
  Instagram, 
  Music, 
  Users, 
  Heart, 
  Eye, 
  TrendingUp,
  RefreshCw,
  LogOut,
  BarChart3,
  Edit3,
  Save,
  X,
  DollarSign,
  Calendar,
  Target,
  Zap,
  Award,
  Activity,
  CheckCircle,
  Sparkles
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'

interface AnalyticsDashboardProps {
  userData: any
  onReset: () => void
}

export default function AnalyticsDashboard({ userData, onReset }: AnalyticsDashboardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isEditingHandles, setIsEditingHandles] = useState(false)
  const [editedHandles, setEditedHandles] = useState({
    youtube: userData.youtube || '',
    instagram: userData.instagram || '',
    tiktok: userData.tiktok || ''
  })
  
  console.log('AnalyticsDashboard userData:', userData)
  console.log('AnalyticsDashboard analytics:', userData?.analytics)

  const handleSaveHandles = () => {
    const updatedUserData = {
      ...userData,
      youtube: editedHandles.youtube,
      instagram: editedHandles.instagram,
      tiktok: editedHandles.tiktok
    }
    localStorage.setItem('creatorhub-user', JSON.stringify(updatedUserData))
    setIsEditingHandles(false)
    // Update the userData reference
    Object.assign(userData, updatedUserData)
  }

  const handleCancelEdit = () => {
    setEditedHandles({
      youtube: userData.youtube || '',
      instagram: userData.instagram || '',
      tiktok: userData.tiktok || ''
    })
    setIsEditingHandles(false)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch('/api/fetch-analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          youtube: userData.youtube,
          instagram: userData.instagram,
          tiktok: userData.tiktok
        }),
      })

      if (response.ok) {
        const newData = await response.json()
        console.log('Received analytics data:', newData)
        
        // Update localStorage and trigger re-render
        const updatedUserData = {
          ...userData,
          analytics: newData
        }
        localStorage.setItem('creatorhub-user', JSON.stringify(updatedUserData))
        
        // Force component re-render by updating state
        window.location.reload()
      } else {
        console.error('Failed to fetch analytics:', response.status)
      }
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getPlatformData = (platform: string) => {
    const data = userData.analytics?.platforms?.[platform] || null
    console.log(`Platform data for ${platform}:`, data)
    return data
  }

  // Prepare chart data
  const getFollowersChartData = () => {
    const youtubeData = getPlatformData('youtube')
    const instagramData = getPlatformData('instagram')
    const tiktokData = getPlatformData('tiktok')
    
    return [
      {
        platform: 'YouTube',
        followers: youtubeData?.followers || 0,
        color: '#FF0000'
      },
      {
        platform: 'Instagram', 
        followers: instagramData?.followers || 0,
        color: '#E4405F'
      },
      {
        platform: 'TikTok',
        followers: tiktokData?.followers || 0,
        color: '#000000'
      }
    ]
  }

  const getEngagementChartData = () => {
    const youtubeData = getPlatformData('youtube')
    const instagramData = getPlatformData('instagram')
    const tiktokData = getPlatformData('tiktok')
    
    return [
      {
        platform: 'YouTube',
        engagement: youtubeData?.engagementRate || 0,
        color: '#FF0000'
      },
      {
        platform: 'Instagram',
        engagement: instagramData?.engagementRate || 0,
        color: '#E4405F'
      },
      {
        platform: 'TikTok',
        engagement: tiktokData?.engagementRate || 0,
        color: '#000000'
      }
    ]
  }

  const getContentDistributionData = () => {
    const youtubeData = getPlatformData('youtube')
    const instagramData = getPlatformData('instagram')
    const tiktokData = getPlatformData('tiktok')
    
    return [
      {
        name: 'YouTube Videos',
        value: youtubeData?.videos || 0,
        color: '#FF0000'
      },
      {
        name: 'Instagram Posts',
        value: instagramData?.posts || 0,
        color: '#E4405F'
      },
      {
        name: 'TikTok Videos',
        value: tiktokData?.videos || 0,
        color: '#000000'
      },
      {
        name: 'Instagram Reels',
        value: instagramData?.reelsCount || 0,
        color: '#833AB4'
      },
      {
        name: 'YouTube Shorts',
        value: youtubeData?.shortsCount || 0,
        color: '#FF6B6B'
      }
    ].filter(item => item.value > 0)
  }

  const PlatformCard = ({ 
    platform, 
    icon, 
    color, 
    data 
  }: { 
    platform: string
    icon: React.ReactNode
    color: string
    data: any
  }) => {
    if (!data || data.error) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {icon}
              <h3 className="ml-2 text-lg font-semibold text-gray-700 capitalize">{platform}</h3>
            </div>
            <span className="text-sm text-gray-500">No data</span>
          </div>
          <p className="text-gray-500 text-sm">
            {data?.error || 'No data available for this platform'}
          </p>
        </div>
      )
    }

    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-2 mr-3">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 capitalize">{platform}</h3>
              {data.verified && (
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verified
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">
              {platform === 'youtube' && formatNumber(data.subscribers || 0)}
              {platform === 'instagram' && formatNumber(data.followers || 0)}
              {platform === 'tiktok' && formatNumber(data.followers || 0)}
            </div>
            <div className="text-sm text-slate-600">
              {platform === 'youtube' && 'Subscribers'}
              {platform === 'instagram' && 'Followers'}
              {platform === 'tiktok' && 'Followers'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {platform === 'youtube' && (
            <>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(data.subscribers || 0)}
                </div>
                <div className="text-sm text-gray-500">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(data.videos || 0)}
                </div>
                <div className="text-sm text-gray-500">Videos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(data.views || 0)}
                </div>
                <div className="text-sm text-gray-500">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${formatNumber(data.estimatedRevenue || 0)}
                </div>
                <div className="text-sm text-gray-500">Est. Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatNumber(data.totalLikes || 0)}
                </div>
                <div className="text-sm text-gray-500">Total Likes</div>
              </div>
            </>
          )}

          {platform === 'instagram' && (
            <>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(data.followers || 0)}
                </div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(data.posts || 0)}
                </div>
                <div className="text-sm text-gray-500">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {formatNumber(data.reelsCount || 0)}
                </div>
                <div className="text-sm text-gray-500">Reels</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">
                  {formatNumber(data.storiesCount || 0)}
                </div>
                <div className="text-sm text-gray-500">Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatNumber(data.totalLikes || 0)}
                </div>
                <div className="text-sm text-gray-500">Total Likes</div>
              </div>
            </>
          )}

          {platform === 'tiktok' && (
            <>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(data.followers || 0)}
                </div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(data.videos || 0)}
                </div>
                <div className="text-sm text-gray-500">Videos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {formatNumber(data.totalLikes || 0)}
                </div>
                <div className="text-sm text-gray-500">Total Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatNumber(data.totalViews || 0)}
                </div>
                <div className="text-sm text-gray-500">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatNumber(data.totalComments || 0)}
                </div>
                <div className="text-sm text-gray-500">Total Comments</div>
              </div>
            </>
          )}
        </div>

        {data.bio && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 line-clamp-2">{data.bio}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-2 mr-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">CreatorHub</h1>
                <p className="text-sm text-slate-600">Welcome back, {userData.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsEditingHandles(true)}
                className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Handles
              </button>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh Data
              </button>
              <button
                onClick={onReset}
                className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Handles Modal */}
      {isEditingHandles && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Social Media Handles</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube Handle
                </label>
                <input
                  type="text"
                  value={editedHandles.youtube}
                  onChange={(e) => setEditedHandles({...editedHandles, youtube: e.target.value})}
                  placeholder="@yourchannel or yourchannel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={editedHandles.instagram}
                  onChange={(e) => setEditedHandles({...editedHandles, instagram: e.target.value})}
                  placeholder="@yourusername or yourusername"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TikTok Handle
                </label>
                <input
                  type="text"
                  value={editedHandles.tiktok}
                  onChange={(e) => setEditedHandles({...editedHandles, tiktok: e.target.value})}
                  placeholder="@yourusername or yourusername"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveHandles}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Save className="h-4 w-4 mr-2 inline" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Analytics Dashboard</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive insights into your social media performance with real-time data and actionable recommendations
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Followers</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatNumber(
                      (getPlatformData('youtube')?.subscribers || 0) +
                      (getPlatformData('instagram')?.followers || 0) +
                      (getPlatformData('tiktok')?.followers || 0)
                    )}
                  </p>
                </div>
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Views</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatNumber(
                      (getPlatformData('youtube')?.views || 0) +
                      (getPlatformData('instagram')?.totalViews || 0) +
                      (getPlatformData('tiktok')?.totalViews || 0)
                    )}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Content</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatNumber(
                      (getPlatformData('youtube')?.videos || 0) +
                      (getPlatformData('instagram')?.posts || 0) +
                      (getPlatformData('tiktok')?.videos || 0)
                    )}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Est. Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">
                    ${formatNumber(getPlatformData('youtube')?.estimatedRevenue || 0)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <PlatformCard
            platform="youtube"
            icon={<Youtube className="h-6 w-6 text-red-600" />}
            color="border-red-500"
            data={getPlatformData('youtube')}
          />
          <PlatformCard
            platform="instagram"
            icon={<Instagram className="h-6 w-6 text-pink-600" />}
            color="border-pink-500"
            data={getPlatformData('instagram')}
          />
          <PlatformCard
            platform="tiktok"
            icon={<Music className="h-6 w-6 text-black" />}
            color="border-gray-800"
            data={getPlatformData('tiktok')}
          />
        </div>

        {/* Enhanced BI Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatNumber(
                    (getPlatformData('youtube')?.subscribers || 0) +
                    (getPlatformData('instagram')?.followers || 0) +
                    (getPlatformData('tiktok')?.followers || 0)
                  )}
                </div>
                <div className="text-sm text-gray-500">Total Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatNumber(
                    (getPlatformData('youtube')?.views || 0) +
                    (getPlatformData('instagram')?.totalViews || 0) +
                    (getPlatformData('tiktok')?.totalViews || 0)
                  )}
                </div>
                <div className="text-sm text-gray-500">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {formatNumber(
                    (getPlatformData('youtube')?.totalLikes || 0) +
                    (getPlatformData('instagram')?.totalLikes || 0) +
                    (getPlatformData('tiktok')?.totalLikes || 0)
                  )}
                </div>
                <div className="text-sm text-gray-500">Total Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {formatNumber(
                    (getPlatformData('youtube')?.estimatedRevenue || 0)
                  )}
                </div>
                <div className="text-sm text-gray-500">Est. Revenue</div>
              </div>
            </div>
          </div>

          {/* Content Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Content Summary</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">YouTube Videos</span>
                <span className="text-lg font-semibold text-red-600">
                  {formatNumber(getPlatformData('youtube')?.videos || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Instagram Posts</span>
                <span className="text-lg font-semibold text-pink-600">
                  {formatNumber(getPlatformData('instagram')?.posts || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">TikTok Videos</span>
                <span className="text-lg font-semibold text-black">
                  {formatNumber(getPlatformData('tiktok')?.videos || 0)}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Content</span>
                  <span className="text-lg font-bold text-blue-600">
                    {formatNumber(
                      (getPlatformData('youtube')?.videos || 0) +
                      (getPlatformData('instagram')?.posts || 0) +
                      (getPlatformData('tiktok')?.videos || 0)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Performance */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Content Performance</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatNumber(
                  (getPlatformData('youtube')?.videos || 0) +
                  (getPlatformData('instagram')?.posts || 0) +
                  (getPlatformData('tiktok')?.videos || 0)
                )}
              </div>
              <div className="text-sm text-gray-500">Total Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatNumber(
                  (getPlatformData('instagram')?.reelsCount || 0) +
                  (getPlatformData('youtube')?.shortsCount || 0)
                )}
              </div>
              <div className="text-sm text-gray-500">Short-form Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatNumber(
                  (getPlatformData('youtube')?.liveStreamsCount || 0) +
                  (getPlatformData('instagram')?.storiesCount || 0)
                )}
              </div>
              <div className="text-sm text-gray-500">Live/Stories</div>
            </div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Followers Comparison */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Followers by Platform</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getFollowersChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatNumber(Number(value))} />
                  <Bar dataKey="followers" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Engagement Comparison */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Activity className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Engagement Rates</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getEngagementChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="engagement" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Content Distribution */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex items-center mb-6">
            <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-slate-900">Content Distribution</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getContentDistributionData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getContentDistributionData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatNumber(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Insights */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center mb-6">
              <Sparkles className="h-5 w-5 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-slate-900">Performance Insights</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Top Performing Platform</p>
                  <p className="text-sm text-slate-600">
                    {(() => {
                      const youtube = getPlatformData('youtube')?.subscribers || 0
                      const instagram = getPlatformData('instagram')?.followers || 0
                      const tiktok = getPlatformData('tiktok')?.followers || 0
                      const max = Math.max(youtube, instagram, tiktok)
                      if (max === youtube) return 'YouTube is your strongest platform'
                      if (max === instagram) return 'Instagram is your strongest platform'
                      if (max === tiktok) return 'TikTok is your strongest platform'
                      return 'All platforms are performing equally'
                    })()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-1 mt-1">
                  <Target className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Growth Opportunity</p>
                  <p className="text-sm text-slate-600">
                    Focus on creating more short-form content to boost engagement across all platforms
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 rounded-full p-1 mt-1">
                  <Zap className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Content Strategy</p>
                  <p className="text-sm text-slate-600">
                    Consider cross-posting your best performing content across platforms for maximum reach
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Analysis */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center mb-6">
              <Activity className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-slate-900">Engagement Analysis</h3>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">YouTube Engagement</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {getPlatformData('youtube')?.totalLikes || 0} likes
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full" 
                    style={{ width: `${Math.min((getPlatformData('youtube')?.totalLikes || 0) / 1000 * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Instagram Engagement</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {getPlatformData('instagram')?.totalLikes || 0} likes
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-pink-600 h-2 rounded-full" 
                    style={{ width: `${Math.min((getPlatformData('instagram')?.totalLikes || 0) / 1000 * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">TikTok Engagement</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {getPlatformData('tiktok')?.totalLikes || 0} likes
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-black h-2 rounded-full" 
                    style={{ width: `${Math.min((getPlatformData('tiktok')?.totalLikes || 0) / 1000 * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
