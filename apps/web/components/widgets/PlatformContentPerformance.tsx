'use client'

import { Card } from '@creatorhub/ui'
import { TrendingUp, Eye, Heart, Share2, Youtube, Instagram, Music } from 'lucide-react'

interface ContentPost {
  id: string
  platform: 'youtube' | 'instagram' | 'tiktok'
  title: string
  views: number
  likes: number
  shares: number
  engagement: number
  earnings: number
  postedAt: string
}

interface PlatformContentPerformanceProps {
  posts: ContentPost[]
  className?: string
}

export function PlatformContentPerformance({ posts, className = '' }: PlatformContentPerformanceProps) {
  const platformConfig = {
    youtube: { icon: Youtube, color: 'text-red-500', bgColor: 'bg-red-500/10' },
    instagram: { icon: Instagram, color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
    tiktok: { icon: Music, color: 'text-cyan-400', bgColor: 'bg-cyan-400/10' }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const sortedPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5)

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-fg-high flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent-blue" />
            Top Performing Content
          </h2>
          <p className="text-sm text-fg-dim mt-1">Your best posts across all platforms</p>
        </div>
      </div>

      <div className="space-y-3">
        {sortedPosts.map((post, index) => {
          const config = platformConfig[post.platform]
          const Icon = config.icon

          return (
            <div
              key={post.id}
              className="p-4 bg-bg-soft rounded-lg border border-edge-subtle hover:border-accent-blue/30 transition-all group cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-fg-high group-hover:text-accent-blue transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-fg-dim mt-1">{post.postedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-accent-green ml-2">
                  #{index + 1}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-fg-dim mb-1">
                    <Eye className="w-3 h-3" />
                  </div>
                  <div className="text-sm font-bold text-fg-high">{formatNumber(post.views)}</div>
                  <div className="text-xs text-fg-dim">views</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-fg-dim mb-1">
                    <Heart className="w-3 h-3" />
                  </div>
                  <div className="text-sm font-bold text-fg-high">{formatNumber(post.likes)}</div>
                  <div className="text-xs text-fg-dim">likes</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-fg-dim mb-1">
                    <Share2 className="w-3 h-3" />
                  </div>
                  <div className="text-sm font-bold text-fg-high">{formatNumber(post.shares)}</div>
                  <div className="text-xs text-fg-dim">shares</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-fg-dim mb-1">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                  <div className="text-sm font-bold text-accent-green">{post.engagement}%</div>
                  <div className="text-xs text-fg-dim">engage</div>
                </div>
              </div>

              {/* Earnings */}
              <div className="mt-3 pt-3 border-t border-edge-subtle">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-fg-dim">Estimated Earnings</span>
                  <span className="text-sm font-bold text-accent-green">${post.earnings}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* View All Link */}
      <button className="w-full mt-4 py-2 text-sm font-medium text-accent-blue hover:bg-accent-blue/10 rounded-lg transition-colors">
        View All Content →
      </button>
    </Card>
  )
}

