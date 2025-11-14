'use client'

import { Card } from '@creatorhub/ui'
import { TrendingUp, TrendingDown, Users, Heart, Eye, MessageCircle, Youtube, Instagram, Music } from 'lucide-react'

interface PlatformData {
  platform: 'youtube' | 'instagram' | 'tiktok'
  handle: string
  followers: number
  engagement: number
  views: number
  likes: number
  comments: number
  growthRate: number
  earnings: number
}

interface PlatformStatsCardProps {
  data: PlatformData
  className?: string
}

export function PlatformStatsCard({ data, className = '' }: PlatformStatsCardProps) {
  const platformConfig = {
    youtube: {
      icon: Youtube,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      label: 'YouTube'
    },
    instagram: {
      icon: Instagram,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      label: 'Instagram'
    },
    tiktok: {
      icon: Music,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10',
      borderColor: 'border-cyan-400/30',
      label: 'TikTok'
    }
  }

  const config = platformConfig[data.platform]
  const Icon = config.icon
  const isGrowing = data.growthRate > 0

  return (
    <Card className={`${className} hover:shadow-lg transition-shadow`}>
      {/* Platform Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-fg-high">{config.label}</h3>
            <p className="text-xs text-fg-dim">{data.handle}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${isGrowing ? 'text-accent-green' : 'text-accent-pink'}`}>
          {isGrowing ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(data.growthRate)}%
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-bg-soft rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-fg-dim" />
            <span className="text-xs text-fg-dim">Followers</span>
          </div>
          <div className="text-lg font-bold text-fg-high">
            {data.followers >= 1000 ? `${(data.followers / 1000).toFixed(1)}K` : data.followers}
          </div>
        </div>

        <div className="p-3 bg-bg-soft rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-4 h-4 text-fg-dim" />
            <span className="text-xs text-fg-dim">Engagement</span>
          </div>
          <div className="text-lg font-bold text-fg-high">{data.engagement}%</div>
        </div>

        <div className="p-3 bg-bg-soft rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Eye className="w-4 h-4 text-fg-dim" />
            <span className="text-xs text-fg-dim">Views</span>
          </div>
          <div className="text-lg font-bold text-fg-high">
            {data.views >= 1000 ? `${(data.views / 1000).toFixed(1)}K` : data.views}
          </div>
        </div>

        <div className="p-3 bg-bg-soft rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <MessageCircle className="w-4 h-4 text-fg-dim" />
            <span className="text-xs text-fg-dim">Comments</span>
          </div>
          <div className="text-lg font-bold text-fg-high">
            {data.comments >= 1000 ? `${(data.comments / 1000).toFixed(1)}K` : data.comments}
          </div>
        </div>
      </div>

      {/* Earnings Footer */}
      <div className={`p-3 rounded-lg border ${config.borderColor} ${config.bgColor}`}>
        <div className="flex items-center justify-between">
          <span className="text-xs text-fg-dim">Est. Monthly Earnings</span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-accent-green">${data.earnings.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Live Data Indicator */}
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-fg-dim">
        <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
        <span>Live data from {config.label}</span>
      </div>
    </Card>
  )
}

