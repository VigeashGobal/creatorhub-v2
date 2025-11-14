'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, DollarSign, Trophy, Youtube, Instagram, Music, ArrowRight, TrendingUp } from 'lucide-react'
import { StoryNarrative } from '../StoryNarrative'
import { calculateTotalProjection } from '../../../lib/revenueProjections'

interface CompletionStepProps {
  formData: {
    name: string
    email: string
    youtube: string
    instagram: string
    tiktok: string
  }
  totalCoins: number
  onComplete: () => void
}

export function CompletionStep({ formData, totalCoins, onComplete }: CompletionStepProps) {
  const [isCalculating, setIsCalculating] = useState(true)
  const [showResults, setShowResults] = useState(false)

  // Build platforms array with demo follower counts for projection
  const connectedPlatforms = []
  if (formData.youtube) {
    connectedPlatforms.push({ platform: 'youtube' as const, followers: 50000 })
  }
  if (formData.instagram) {
    connectedPlatforms.push({ platform: 'instagram' as const, followers: 75000 })
  }
  if (formData.tiktok) {
    connectedPlatforms.push({ platform: 'tiktok' as const, followers: 150000 })
  }

  const projection = connectedPlatforms.length > 0 
    ? calculateTotalProjection(connectedPlatforms)
    : { totalMonthly: 0, totalYearly: 0, breakdown: [], averageConfidence: 'low' as const }

  useEffect(() => {
    // Simulate calculation time
    const timer = setTimeout(() => {
      setIsCalculating(false)
      setTimeout(() => setShowResults(true), 500)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Map platforms for display
  const platformDisplay = [
    { 
      name: 'YouTube', 
      icon: Youtube, 
      color: 'text-red-500', 
      active: !!formData.youtube,
      earnings: projection.breakdown.find(p => p.platform === 'youtube')?.estimatedMonthly || 0
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      color: 'text-pink-500', 
      active: !!formData.instagram,
      earnings: projection.breakdown.find(p => p.platform === 'instagram')?.estimatedMonthly || 0
    },
    { 
      name: 'TikTok', 
      icon: Music, 
      color: 'text-cyan-400', 
      active: !!formData.tiktok,
      earnings: projection.breakdown.find(p => p.platform === 'tiktok')?.estimatedMonthly || 0
    },
  ]

  return (
    <div className="w-full max-w-lg mx-auto space-y-8">
      {/* Celebration Animation */}
      <div className="relative inline-block mx-auto">
        <div className="absolute inset-0 bg-accent-yellow/30 rounded-full blur-3xl animate-pulse" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-accent-yellow to-accent-orange flex items-center justify-center animate-bounce">
          {isCalculating ? (
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Trophy className="w-12 h-12 text-white" />
          )}
        </div>
        {!isCalculating && (
          <div className="absolute -top-2 -right-2 bg-accent-green rounded-full px-3 py-1.5 flex items-center gap-1 text-sm text-white font-semibold shadow-lg animate-bounce">
            <Sparkles className="w-4 h-4" />
            {totalCoins}
          </div>
        )}
      </div>

      {/* Story */}
      <div className="text-center space-y-4">
        {isCalculating ? (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-fg-high">
              Analyzing your potential...
            </h2>
            <StoryNarrative
              text="We're crunching the numbers across your platforms."
              delay={0}
              className="text-fg-dim text-center"
            />
          </>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-fg-high">
              Amazing, {formData.name}!
            </h2>
            <StoryNarrative
              text="You've unlocked your full earning potential. Here's what we found..."
              delay={0}
              className="text-fg-dim text-center"
            />
          </>
        )}
      </div>

      {/* Results */}
      {showResults && (
        <div className="space-y-6 animate-fadeIn">
          {/* Total Projected Earnings */}
          <div className="p-6 bg-gradient-to-br from-accent-green/20 to-accent-blue/20 border-2 border-accent-green/30 rounded-2xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-accent-green" />
              <span className="text-sm font-semibold text-fg-high">Your Potential Monthly Earnings</span>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent-green mb-1">
                ${projection.totalMonthly.toLocaleString()}
              </div>
              <div className="text-sm text-fg-dim">
                Based on {connectedPlatforms.length} platform{connectedPlatforms.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-fg-high text-center">Platform Breakdown</h3>
            <div className="grid gap-3">
              {platformDisplay.map((platform) => {
                const Icon = platform.icon
                return (
                  <div
                    key={platform.name}
                    className={`p-4 rounded-xl flex items-center justify-between transition-all ${
                      platform.active
                        ? 'bg-bg-soft border-2 border-accent-green/30'
                        : 'bg-bg-sunken border border-edge-subtle opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-6 h-6 ${platform.color}`} />
                      <span className="font-semibold text-fg-high">{platform.name}</span>
                    </div>
                    {platform.active ? (
                      <div className="text-accent-green font-semibold">
                        ${platform.earnings.toLocaleString()}
                      </div>
                    ) : (
                      <div className="text-xs text-fg-dim">Not added</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Coins Earned */}
          <div className="flex items-center justify-center gap-2 p-4 bg-accent-yellow/10 border border-accent-yellow/30 rounded-xl">
            <Sparkles className="w-5 h-5 text-accent-yellow" />
            <span className="text-fg-high font-semibold">You earned {totalCoins} coins!</span>
          </div>

          {/* CTA Button */}
          <button
            onClick={onComplete}
            className="w-full px-8 py-4 bg-gradient-to-r from-accent-green to-accent-blue text-white font-semibold rounded-full hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg"
          >
            View My Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Helper Text */}
      {!showResults && (
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}
    </div>
  )
}

