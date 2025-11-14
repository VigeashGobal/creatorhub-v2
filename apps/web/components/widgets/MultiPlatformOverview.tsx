'use client'

import { Card } from '@creatorhub/ui'
import { TrendingUp, Users, DollarSign, Zap, Youtube, Instagram, Music, CheckCircle2 } from 'lucide-react'

interface PlatformSummary {
  platform: 'youtube' | 'instagram' | 'tiktok'
  followers: number
  engagement: number
  revenue: number
  connected: boolean
}

interface MultiPlatformOverviewProps {
  platforms: PlatformSummary[]
  className?: string
}

export function MultiPlatformOverview({ platforms, className = '' }: MultiPlatformOverviewProps) {
  const totalFollowers = platforms.reduce((sum, p) => sum + (p.connected ? p.followers : 0), 0)
  const avgEngagement = platforms.filter(p => p.connected).reduce((sum, p) => sum + p.engagement, 0) / platforms.filter(p => p.connected).length || 0
  const totalRevenue = platforms.reduce((sum, p) => sum + (p.connected ? p.revenue : 0), 0)
  const connectedCount = platforms.filter(p => p.connected).length

  const platformConfig = {
    youtube: { icon: Youtube, color: 'text-red-500', label: 'YouTube' },
    instagram: { icon: Instagram, color: 'text-pink-500', label: 'Instagram' },
    tiktok: { icon: Music, color: 'text-cyan-400', label: 'TikTok' }
  }

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-fg-high flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent-yellow" />
            Multi-Platform Overview
          </h2>
          <p className="text-sm text-fg-dim mt-1">
            Data synced from {connectedCount} platform{connectedCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-accent-green">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          Live
        </div>
      </div>

      {/* Aggregated Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 rounded-xl border border-accent-blue/20">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-accent-blue" />
            <span className="text-xs font-medium text-fg-dim">Total Reach</span>
          </div>
          <div className="text-2xl font-bold text-fg-high">
            {totalFollowers >= 1000000 
              ? `${(totalFollowers / 1000000).toFixed(1)}M`
              : totalFollowers >= 1000 
              ? `${(totalFollowers / 1000).toFixed(1)}K`
              : totalFollowers}
          </div>
          <div className="text-xs text-accent-blue mt-1">Across all platforms</div>
        </div>

        <div className="p-4 bg-gradient-to-br from-accent-green/10 to-accent-blue/10 rounded-xl border border-accent-green/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-accent-green" />
            <span className="text-xs font-medium text-fg-dim">Avg Engagement</span>
          </div>
          <div className="text-2xl font-bold text-fg-high">{avgEngagement.toFixed(1)}%</div>
          <div className="text-xs text-accent-green mt-1">+2.3% this week</div>
        </div>

        <div className="p-4 bg-gradient-to-br from-accent-green/10 to-accent-yellow/10 rounded-xl border border-accent-green/20">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-accent-green" />
            <span className="text-xs font-medium text-fg-dim">Total Revenue</span>
          </div>
          <div className="text-2xl font-bold text-fg-high">${totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-accent-green mt-1">This month</div>
        </div>
      </div>

      {/* Platform Status */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-fg-high mb-3">Connected Platforms</h3>
        {platforms.map((platform) => {
          const config = platformConfig[platform.platform]
          const Icon = config.icon

          return (
            <div
              key={platform.platform}
              className={`p-3 rounded-lg border transition-all ${
                platform.connected
                  ? 'bg-bg-soft border-accent-green/30'
                  : 'bg-bg-sunken border-edge-subtle opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${config.color}`} />
                  <div>
                    <div className="text-sm font-semibold text-fg-high">{config.label}</div>
                    {platform.connected && (
                      <div className="text-xs text-fg-dim">
                        {platform.followers >= 1000 
                          ? `${(platform.followers / 1000).toFixed(1)}K followers` 
                          : `${platform.followers} followers`}
                      </div>
                    )}
                  </div>
                </div>
                
                {platform.connected ? (
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-bold text-accent-green">${platform.revenue}</div>
                      <div className="text-xs text-fg-dim">{platform.engagement}% engagement</div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-accent-green" />
                  </div>
                ) : (
                  <button className="px-3 py-1.5 text-xs font-medium bg-accent-blue text-white rounded-lg hover:opacity-90 transition-opacity">
                    Connect
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Data Sync Info */}
      <div className="mt-4 p-3 bg-bg-soft rounded-lg border border-edge-subtle">
        <div className="flex items-center justify-between text-xs">
          <span className="text-fg-dim">Last synced: 2 minutes ago</span>
          <button className="text-accent-blue font-medium hover:underline">
            Sync Now
          </button>
        </div>
      </div>
    </Card>
  )
}

