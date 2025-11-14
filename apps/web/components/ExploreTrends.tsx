'use client'

import { useState } from 'react'
import { Card, KpiCard } from '@creatorhub/ui'
import { Search, TrendingUp, Users, Star, DollarSign, Target, Zap, ArrowRight, Clock, Award } from 'lucide-react'
import { loadGamificationState, generateNextBestActions } from '../lib/gamification'
import { MoneyIndicator } from './gamification/MoneyIndicator'
import { NextBestAction } from './gamification/NextBestAction'
import { Leaderboard } from './gamification/Leaderboard'
import { AchievementBadge } from './gamification/AchievementBadge'

interface ExploreTrendsProps {
  userData: any
  onReset: () => void
}

const trendingCreators = [
  { name: 'AI Artistry Hub', niche: 'Digital Art, AI', followers: '1.2M', revenue: 45000, growth: '+15%', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AH' },
  { name: 'EcoLiving Daily', niche: 'Sustainable Lifestyle', followers: '850K', revenue: 32000, growth: '+10%', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ED' },
  { name: 'Tech Gadget Reviews', niche: 'Consumer Tech', followers: '2.1M', revenue: 78000, growth: '+8%', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TR' },
  { name: 'Mindful Moments', niche: 'Meditation, Wellness', followers: '500K', revenue: 28000, growth: '+12%', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MM' },
]

const revenueOpportunities = [
  { id: 1, title: 'AI Content Creation Tools', potential: 20000, difficulty: 'Medium', timeframe: '2-3 months', trend: 'Rising', expiresIn: '2 days' },
  { id: 2, title: 'Sustainable Fashion Partnerships', potential: 11500, difficulty: 'Low', timeframe: '1-2 months', trend: 'Hot', expiresIn: '5 days' },
  { id: 3, title: 'Tech Product Reviews', potential: 27500, difficulty: 'High', timeframe: '3-4 months', trend: 'Stable', expiresIn: '7 days' },
  { id: 4, title: 'Wellness & Mindfulness Content', potential: 16000, difficulty: 'Medium', timeframe: '2-3 months', trend: 'Growing', expiresIn: '3 days' },
]

const trendingHashtags = [
  { tag: '#GlowGoals', posts: '2.3M', revenue: 'High', trend: 'Rising', potential: 15000 },
  { tag: '#JuneVibes', posts: '1.8M', revenue: 'Medium', trend: 'Stable', potential: 8000 },
  { tag: '#MidYearReset', posts: '1.2M', revenue: 'High', trend: 'Rising', potential: 12000 },
  { tag: '#SummerVibes', posts: '3.1M', revenue: 'Medium', trend: 'Peak', potential: 10000 },
  { tag: '#CreatorLife', posts: '890K', revenue: 'High', trend: 'Growing', potential: 18000 },
  { tag: '#TrendingNow', posts: '4.2M', revenue: 'Low', trend: 'Declining', potential: 5000 },
]

export default function ExploreTrends({ userData, onReset }: ExploreTrendsProps) {
  const [gamificationState] = useState(loadGamificationState())
  const [claimedOpportunities, setClaimedOpportunities] = useState<number[]>([])
  
  const nextBestActions = generateNextBestActions(gamificationState)
  const topOpportunity = revenueOpportunities.sort((a, b) => b.potential - a.potential)[0]
  
  const trendHunterAchievement = gamificationState.achievements.find(a => a.id === 'trend-hunter')

  const handleClaimOpportunity = (id: number) => {
    setClaimedOpportunities([...claimedOpportunities, id])
  }

  const totalOpportunityValue = revenueOpportunities
    .filter(o => !claimedOpportunities.includes(o.id))
    .reduce((sum, o) => sum + o.potential, 0)

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 py-6 md:py-8 grid grid-cols-12 gap-4 md:gap-6">
        {/* Header */}
        <div className="col-span-12 mb-6">
          <h1 className="h1">Explore Trends</h1>
          <p className="muted">Discover what&apos;s trending and predict future opportunities</p>
        </div>

        {/* Next Best Opportunity */}
        {topOpportunity && (
          <div className="col-span-12 mb-6">
            <Card>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-accent-yellow" />
                    <span className="text-sm font-semibold text-accent-yellow">NEXT BEST OPPORTUNITY</span>
                  </div>
                  <h3 className="text-2xl font-bold text-fg-high mb-2">{topOpportunity.title}</h3>
                  <p className="text-fg-dim mb-4">{topOpportunity.timeframe} • {topOpportunity.difficulty} difficulty</p>
                  <div className="flex items-center gap-4">
                    <MoneyIndicator amount={topOpportunity.potential} size="lg" />
                    <button
                      onClick={() => handleClaimOpportunity(topOpportunity.id)}
                      disabled={claimedOpportunities.includes(topOpportunity.id)}
                      className="px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {claimedOpportunities.includes(topOpportunity.id) ? 'Claimed' : 'Claim Opportunity'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Trend Metrics */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card>
            <div className="text-3xl font-bold text-fg-high mb-1">12</div>
            <div className="text-sm text-fg-dim mb-2">Trending Niches</div>
            <div className="text-xs text-accent-green">+3 this week</div>
          </Card>
          
          <Card>
            <MoneyIndicator amount={totalOpportunityValue} size="md" />
            <div className="text-sm text-fg-dim mb-2 mt-2">Total Opportunity Value</div>
            <div className="text-xs text-accent-green">{revenueOpportunities.length - claimedOpportunities.length} available</div>
          </Card>
          
          <Card>
            <div className="text-3xl font-bold text-fg-high mb-1">47</div>
            <div className="text-sm text-fg-dim mb-2">Hot Hashtags</div>
            <div className="text-xs text-accent-green">+8 trending</div>
          </Card>
        </div>

        {/* Revenue Opportunities */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="h2">Revenue Opportunities</h2>
                <p className="muted">High-potential trends for monetization</p>
              </div>
              <DollarSign className="w-6 h-6 text-accent-green" />
            </div>
            
            <div className="space-y-4">
              {revenueOpportunities.map((opportunity) => {
                const isClaimed = claimedOpportunities.includes(opportunity.id)
                const isExpiringSoon = parseInt(opportunity.expiresIn) <= 3
                
                return (
                  <div 
                    key={opportunity.id} 
                    className={`p-4 rounded-lg border transition-all ${
                      isClaimed 
                        ? 'bg-accent-green/10 border-accent-green/30' 
                        : isExpiringSoon
                        ? 'bg-accent-orange/10 border-accent-orange/30'
                        : 'bg-bg-sunken border-edge-subtle hover:bg-bg-soft'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="body font-semibold text-fg-high">{opportunity.title}</h3>
                          {isExpiringSoon && !isClaimed && (
                            <div className="flex items-center gap-1 text-xs text-accent-orange">
                              <Clock className="w-3 h-3" />
                              <span>Expires in {opportunity.expiresIn}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-fg-dim mb-3">
                          <span>Potential: <MoneyIndicator amount={opportunity.potential} size="sm" /></span>
                          <span>•</span>
                          <span>Timeframe: {opportunity.timeframe}</span>
                          <span>•</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            opportunity.trend === 'Hot' ? 'bg-accent-pink/10 text-accent-pink' :
                            opportunity.trend === 'Rising' ? 'bg-accent-green/10 text-accent-green' :
                            opportunity.trend === 'Growing' ? 'bg-accent-blue/10 text-accent-blue' :
                            'bg-fg-dim/10 text-fg-dim'
                          }`}>
                            {opportunity.trend}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <MoneyIndicator amount={opportunity.potential} size="lg" />
                        <div className={`text-xs px-2 py-1 rounded-full mt-2 ${
                          opportunity.difficulty === 'Low' ? 'bg-accent-green/10 text-accent-green' :
                          opportunity.difficulty === 'Medium' ? 'bg-accent-yellow/10 text-accent-yellow' :
                          'bg-accent-pink/10 text-accent-pink'
                        }`}>
                          {opportunity.difficulty}
                        </div>
                        {!isClaimed && (
                          <button
                            onClick={() => handleClaimOpportunity(opportunity.id)}
                            className="mt-2 px-4 py-2 bg-accent-blue hover:bg-accent-blue/80 text-white text-sm font-semibold rounded-lg transition-colors"
                          >
                            Claim
                          </button>
                        )}
                        {isClaimed && (
                          <div className="mt-2 text-xs text-accent-green font-semibold">Claimed!</div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Trending Creators & Trend Hunter Achievement */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Top Earners</h2>
              <Star className="w-5 h-5 text-accent-yellow" />
            </div>
            
            <div className="space-y-4 mb-6">
              {trendingCreators.map((creator, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-bg-sunken rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-accent-blue flex items-center justify-center text-white font-semibold overflow-hidden">
                    {creator.avatar ? (
                      <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
                    ) : (
                      creator.name.charAt(0)
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="body font-semibold text-fg-high">{creator.name}</div>
                    <div className="text-sm text-fg-dim">{creator.niche}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <MoneyIndicator amount={creator.revenue} size="sm" />
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent-green/10 text-accent-green">
                        {creator.growth}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trend Hunter Achievement */}
            {trendHunterAchievement && (
              <div className="pt-6 border-t border-edge-subtle">
                <div className="text-sm font-semibold text-fg-high mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent-yellow" />
                  Trend Hunter Achievement
                </div>
                <div className="flex justify-center">
                  <AchievementBadge achievement={trendHunterAchievement} size="lg" />
                </div>
                {!trendHunterAchievement.unlocked && (
                  <div className="text-center mt-3">
                    <div className="text-xs text-fg-dim">
                      Claim {trendHunterAchievement.target! - (trendHunterAchievement.progress || 0)} more opportunities
                    </div>
                    <div className="text-xs text-accent-green font-semibold mt-1">
                      Unlock ${trendHunterAchievement.dollarValue.toLocaleString()} reward
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Trending Hashtags */}
        <div className="col-span-12">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Trending Hashtags</h2>
              <TrendingUp className="w-6 h-6 text-accent-blue" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {trendingHashtags.map((hashtag, index) => (
                <div key={index} className="text-center p-4 bg-bg-sunken rounded-lg hover:bg-bg-soft transition-colors cursor-pointer group">
                  <div className="text-lg font-bold text-fg-high mb-1 group-hover:text-accent-blue transition-colors">{hashtag.tag}</div>
                  <div className="text-sm text-fg-dim mb-2">{hashtag.posts} posts</div>
                  <MoneyIndicator amount={hashtag.potential} size="sm" />
                  <div className={`text-xs px-2 py-1 rounded-full mt-2 ${
                    hashtag.revenue === 'High' ? 'bg-accent-green/10 text-accent-green' :
                    hashtag.revenue === 'Medium' ? 'bg-accent-yellow/10 text-accent-yellow' :
                    'bg-fg-dim/10 text-fg-dim'
                  }`}>
                    {hashtag.revenue} Revenue
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Leaderboard */}
        <div className="col-span-12">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Top Opportunity Claimers</h2>
              <Trophy className="w-5 h-5 text-accent-yellow" />
            </div>
            
            <Leaderboard 
              entries={gamificationState.leaderboard.slice(0, 5)}
              currentUserId="user-5"
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
