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
  BarChart3
} from 'lucide-react'

interface AnalyticsDashboardProps {
  userData: any
  onReset: () => void
}

export default function AnalyticsDashboard({ userData, onReset }: AnalyticsDashboardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

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
        // Update localStorage and trigger re-render
        localStorage.setItem('creatorhub-user', JSON.stringify({
          ...userData,
          analytics: newData
        }))
        window.location.reload()
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
    return userData.analytics?.platforms?.[platform] || null
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
              <div className="text-center col-span-2">
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(data.views || 0)}
                </div>
                <div className="text-sm text-gray-500">Total Views</div>
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
                  {formatNumber(data.following || 0)}
                </div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
              <div className="text-center col-span-2">
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(data.posts || 0)}
                </div>
                <div className="text-sm text-gray-500">Posts</div>
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
                  {formatNumber(data.following || 0)}
                </div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(data.likes || 0)}
                </div>
                <div className="text-sm text-gray-500">Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(data.videos || 0)}
                </div>
                <div className="text-sm text-gray-500">Videos</div>
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

        {/* Summary Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Reach</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {formatNumber(
                  (getPlatformData('youtube')?.subscribers || 0) +
                  (getPlatformData('instagram')?.followers || 0) +
                  (getPlatformData('tiktok')?.followers || 0)
                )}
              </div>
              <div className="text-sm text-gray-500">Total Followers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {formatNumber(
                  (getPlatformData('youtube')?.videos || 0) +
                  (getPlatformData('instagram')?.posts || 0) +
                  (getPlatformData('tiktok')?.videos || 0)
                )}
              </div>
              <div className="text-sm text-gray-500">Total Content</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {formatNumber(
                  (getPlatformData('youtube')?.views || 0) +
                  (getPlatformData('tiktok')?.likes || 0)
                )}
              </div>
              <div className="text-sm text-gray-500">Total Engagement</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
