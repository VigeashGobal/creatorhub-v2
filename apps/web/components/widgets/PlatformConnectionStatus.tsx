'use client'

import { Card } from '@creatorhub/ui'
import { CheckCircle2, XCircle, RefreshCw, Wifi, WifiOff, Youtube, Instagram, Music, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface PlatformStatus {
  platform: 'youtube' | 'instagram' | 'tiktok'
  connected: boolean
  lastSynced: Date | null
  status: 'connected' | 'syncing' | 'error' | 'disconnected'
  error?: string
}

interface PlatformConnectionStatusProps {
  className?: string
}

const platformConfig = {
  youtube: { icon: Youtube, color: 'text-red-500', bgColor: 'bg-red-500/10', label: 'YouTube' },
  instagram: { icon: Instagram, color: 'text-pink-500', bgColor: 'bg-pink-500/10', label: 'Instagram' },
  tiktok: { icon: Music, color: 'text-cyan-400', bgColor: 'bg-cyan-400/10', label: 'TikTok' }
}

const initialStatus: PlatformStatus[] = [
  {
    platform: 'youtube',
    connected: true,
    lastSynced: new Date(Date.now() - 2 * 60000), // 2 minutes ago
    status: 'connected'
  },
  {
    platform: 'instagram',
    connected: true,
    lastSynced: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    status: 'connected'
  },
  {
    platform: 'tiktok',
    connected: true,
    lastSynced: new Date(Date.now() - 1 * 60000), // 1 minute ago
    status: 'syncing'
  }
]

const formatTimeAgo = (date: Date | null): string => {
  if (!date) return 'Never'
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  return `${Math.floor(seconds / 3600)}h ago`
}

export function PlatformConnectionStatus({ className = '' }: PlatformConnectionStatusProps) {
  const [platforms, setPlatforms] = useState<PlatformStatus[]>(initialStatus)
  const [syncingPlatform, setSyncingPlatform] = useState<string | null>(null)

  // Simulate periodic syncing
  useEffect(() => {
    const interval = setInterval(() => {
      setPlatforms(prev => prev.map(p => {
        if (p.status === 'syncing') {
          return {
            ...p,
            status: 'connected' as const,
            lastSynced: new Date()
          }
        }
        // Randomly update last synced time
        if (Math.random() > 0.7 && p.connected) {
          return {
            ...p,
            lastSynced: new Date()
          }
        }
        return p
      }))
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleSync = async (platform: string) => {
    setSyncingPlatform(platform)
    setPlatforms(prev => prev.map(p => 
      p.platform === platform 
        ? { ...p, status: 'syncing' as const }
        : p
    ))

    // Simulate sync
    setTimeout(() => {
      setPlatforms(prev => prev.map(p => 
        p.platform === platform 
          ? { ...p, status: 'connected' as const, lastSynced: new Date() }
          : p
      ))
      setSyncingPlatform(null)
    }, 2000)
  }

  const allConnected = platforms.every(p => p.connected)
  const allSynced = platforms.every(p => p.status === 'connected')

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Wifi className="w-5 h-5 text-accent-green" />
          <h2 className="text-xl font-bold text-fg-high">Platform Connections</h2>
        </div>
        <div className={`flex items-center gap-2 text-xs px-3 py-1 rounded-full ${
          allConnected && allSynced
            ? 'bg-accent-green/10 text-accent-green'
            : 'bg-accent-yellow/10 text-accent-yellow'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            allConnected && allSynced ? 'bg-accent-green animate-pulse' : 'bg-accent-yellow'
          }`} />
          <span>{allConnected && allSynced ? 'All Connected' : 'Syncing...'}</span>
        </div>
      </div>

      <div className="space-y-3">
        {platforms.map((platform) => {
          const config = platformConfig[platform.platform]
          const Icon = config.icon
          const isSyncing = platform.status === 'syncing' || syncingPlatform === platform.platform

          return (
            <div
              key={platform.platform}
              className={`p-4 rounded-lg border transition-all ${
                platform.connected && platform.status === 'connected'
                  ? 'bg-bg-soft border-accent-green/30'
                  : platform.status === 'syncing'
                  ? 'bg-accent-blue/10 border-accent-blue/30'
                  : 'bg-bg-sunken border-edge-subtle opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-fg-high">{config.label}</h3>
                      {platform.connected && platform.status === 'connected' && (
                        <CheckCircle2 className="w-4 h-4 text-accent-green" />
                      )}
                      {platform.status === 'syncing' && (
                        <RefreshCw className="w-4 h-4 text-accent-blue animate-spin" />
                      )}
                      {!platform.connected && (
                        <XCircle className="w-4 h-4 text-fg-dim" />
                      )}
                    </div>
                    
                    {platform.connected ? (
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${
                          platform.status === 'syncing' ? 'bg-accent-blue animate-pulse' : 'bg-accent-green'
                        }`} />
                        <span className="text-xs text-fg-dim">
                          {platform.status === 'syncing' 
                            ? 'Syncing...' 
                            : `Last synced ${formatTimeAgo(platform.lastSynced)}`}
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-fg-dim mt-1">Not connected</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {platform.connected ? (
                    <button
                      onClick={() => handleSync(platform.platform)}
                      disabled={isSyncing}
                      className="px-3 py-1.5 text-xs font-medium bg-accent-blue text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      {isSyncing ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Syncing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-3 h-3" />
                          Sync Now
                        </>
                      )}
                    </button>
                  ) : (
                    <button className="px-3 py-1.5 text-xs font-medium bg-accent-green text-white rounded-lg hover:opacity-90 transition-opacity">
                      Connect
                    </button>
                  )}
                </div>
              </div>

              {platform.error && (
                <div className="mt-3 p-2 bg-accent-pink/10 border border-accent-pink/30 rounded flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-accent-pink" />
                  <span className="text-xs text-accent-pink">{platform.error}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Connection Health */}
      <div className="mt-6 p-4 bg-bg-soft rounded-lg border border-edge-subtle">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-accent-green" />
            <span className="text-fg-dim">Connection Health:</span>
            <span className="font-semibold text-accent-green">Excellent</span>
          </div>
          <div className="text-fg-dim">
            Auto-sync: Every 5 minutes
          </div>
        </div>
      </div>
    </Card>
  )
}

