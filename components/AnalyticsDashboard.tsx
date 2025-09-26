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
  Activity
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
      <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {icon}
            <h3 className="ml-2 text-lg font-semibold text-gray-700 capitalize">{platform}</h3>
          </div>
          {data.verified && (
            <span className="text-blue-500 text-sm font-medium">✓ Verified</span>
          )}
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CreatorHub</h1>
                <p className="text-sm text-gray-500">Welcome back, {userData.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsEditingHandles(true)}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Handles
              </button>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh Data
              </button>
              <button
                onClick={onReset}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
          <p className="text-gray-600">Track your performance across all social media platforms</p>
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
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Content Distribution</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getContentDistributionData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
      </div>
    </div>
  )
}
