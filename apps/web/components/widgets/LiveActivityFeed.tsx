'use client'

import { Card } from '@creatorhub/ui'
import { Bell, Users, Eye, DollarSign, TrendingUp, Youtube, Instagram, Music, Sparkles, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ActivityItem {
  id: string
  type: 'follower' | 'view' | 'revenue' | 'milestone' | 'engagement'
  platform: 'youtube' | 'instagram' | 'tiktok' | 'all'
  message: string
  value?: number
  timestamp: Date
  icon: any
}

interface LiveActivityFeedProps {
  className?: string
}

const generateActivity = (): ActivityItem[] => {
  const activities: ActivityItem[] = []
  const now = new Date()
  
  // Generate recent activities
  activities.push({
    id: '1',
    type: 'follower',
    platform: 'tiktok',
    message: 'New follower milestone reached',
    value: 120000,
    timestamp: new Date(now.getTime() - 2 * 60000),
    icon: Users
  })
  
  activities.push({
    id: '2',
    type: 'view',
    platform: 'youtube',
    message: 'Video hit 125K views',
    value: 125000,
    timestamp: new Date(now.getTime() - 5 * 60000),
    icon: Eye
  })
  
  activities.push({
    id: '3',
    type: 'revenue',
    platform: 'all',
    message: 'Monthly earnings updated',
    value: 775,
    timestamp: new Date(now.getTime() - 8 * 60000),
    icon: DollarSign
  })
  
  activities.push({
    id: '4',
    type: 'engagement',
    platform: 'instagram',
    message: 'Engagement rate increased by 2.3%',
    value: 6.8,
    timestamp: new Date(now.getTime() - 12 * 60000),
    icon: TrendingUp
  })
  
  activities.push({
    id: '5',
    type: 'milestone',
    platform: 'tiktok',
    message: 'Content reached 450K views',
    value: 450000,
    timestamp: new Date(now.getTime() - 15 * 60000),
    icon: Sparkles
  })
  
  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

const platformConfig = {
  youtube: { icon: Youtube, color: 'text-red-500', bgColor: 'bg-red-500/10' },
  instagram: { icon: Instagram, color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
  tiktok: { icon: Music, color: 'text-cyan-400', bgColor: 'bg-cyan-400/10' },
  all: { icon: Bell, color: 'text-accent-blue', bgColor: 'bg-accent-blue/10' }
}

const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  return `${Math.floor(seconds / 3600)}h ago`
}

export function LiveActivityFeed({ className = '' }: LiveActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>(generateActivity())
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Simulate new activities every 30 seconds
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: ['follower', 'view', 'revenue', 'engagement'][Math.floor(Math.random() * 4)] as any,
        platform: ['youtube', 'instagram', 'tiktok'][Math.floor(Math.random() * 3)] as any,
        message: 'New activity detected',
        timestamp: new Date(),
        icon: Bell
      }
      
      setActivities(prev => [newActivity, ...prev].slice(0, 10))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const visibleActivities = activities.filter(a => !dismissedIds.has(a.id))

  const handleDismiss = (id: string) => {
    setDismissedIds(prev => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-accent-blue" />
          <h2 className="text-xl font-bold text-fg-high">Live Activity Feed</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-fg-dim">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span>Live</span>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {visibleActivities.length === 0 ? (
          <div className="text-center py-8 text-fg-dim">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No recent activity</p>
          </div>
        ) : (
          visibleActivities.map((activity) => {
            const config = platformConfig[activity.platform]
            const PlatformIcon = config.icon
            const ActivityIcon = activity.icon

            return (
              <div
                key={activity.id}
                className="p-3 bg-bg-soft rounded-lg border border-edge-subtle hover:border-accent-blue/30 transition-all group animate-fadeIn"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <PlatformIcon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-fg-high">{activity.message}</p>
                        {activity.value && (
                          <p className="text-xs text-accent-green font-semibold mt-1">
                            {activity.value >= 1000 
                              ? `${(activity.value / 1000).toFixed(1)}K` 
                              : activity.value}
                          </p>
                        )}
                        <p className="text-xs text-fg-dim mt-1">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                      
                      <button
                        onClick={() => handleDismiss(activity.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-bg-sunken rounded"
                      >
                        <X className="w-4 h-4 text-fg-dim" />
                      </button>
                    </div>
                  </div>
                  
                  <ActivityIcon className="w-4 h-4 text-fg-dim flex-shrink-0 mt-1" />
                </div>
              </div>
            )
          })
        )}
      </div>

      {visibleActivities.length > 0 && (
        <button className="w-full mt-4 py-2 text-sm font-medium text-accent-blue hover:bg-accent-blue/10 rounded-lg transition-colors">
          View All Activity →
        </button>
      )}
    </Card>
  )
}

