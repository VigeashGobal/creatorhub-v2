'use client'

import { useState, useEffect } from 'react'
import { Card, KpiCard } from '@creatorhub/ui'
import { DollarSign, TrendingUp, Calendar, Target, Zap, Trophy, Star, Award, Crown, Flame, Sparkles, ArrowRight } from 'lucide-react'
import { loadGamificationState, claimDailyLoginReward, updateDailyChallengeProgress, generateNearMissAlerts, generateNextBestActions, calculateEarningsVelocity, saveGamificationState } from '../lib/gamification'
import { PointsDisplay } from './gamification/PointsDisplay'
import { VirtualCurrency } from './gamification/VirtualCurrency'
import { StreakCounter } from './gamification/StreakCounter'
import { MoneyIndicator } from './gamification/MoneyIndicator'
import { AchievementBadge } from './gamification/AchievementBadge'
import { DailyLoginCalendar } from './gamification/DailyLoginCalendar'
import { DailyLoginCalendarMobile } from './gamification/DailyLoginCalendar.mobile'
import { NextBestAction } from './gamification/NextBestAction'
import { EarningsVelocity } from './gamification/EarningsVelocity'
import { NearMissIndicator } from './gamification/NearMissIndicator'
import { Leaderboard } from './gamification/Leaderboard'
import { CelebrationModal } from './gamification/CelebrationModal'
import { loadAccessibilityPreferences } from '../lib/accessibility'
import { useMobilePreview } from './MobilePreview'
import { PlatformStatsCard } from './widgets/PlatformStatsCard'
import { MultiPlatformOverview } from './widgets/MultiPlatformOverview'
import { PlatformContentPerformance } from './widgets/PlatformContentPerformance'
import { LiveActivityFeed } from './widgets/LiveActivityFeed'
import { SmartRecommendations } from './widgets/SmartRecommendations'
import { ContentPerformancePredictor } from './widgets/ContentPerformancePredictor'
import { AudienceInsights } from './widgets/AudienceInsights'
import { RevenueBreakdown } from './widgets/RevenueBreakdown'
import { EngagementHeatmap } from './widgets/EngagementHeatmap'
import { GrowthTrajectory } from './widgets/GrowthTrajectory'
import { PlatformConnectionStatus } from './widgets/PlatformConnectionStatus'
import { FilterSortPanel } from './widgets/FilterSortPanel'
import { SearchDiscovery } from './widgets/SearchDiscovery'

interface DailyPulseDashboardProps {
  userData: any
  onReset: () => void
}

const revenueData = [
  { month: 'Jan', earned: 18500, target: 20000 },
  { month: 'Feb', earned: 22100, target: 22000 },
  { month: 'Mar', earned: 19800, target: 25000 },
  { month: 'Apr', earned: 25600, target: 25000 },
  { month: 'May', earned: 31200, target: 30000 },
  { month: 'Jun', earned: 28900, target: 30000 },
  { month: 'Jul', earned: 35400, target: 35000 },
]

const upcomingRevenue = [
  { source: 'TechCorp Campaign', amount: 8500, dueDate: 'Aug 15', status: 'confirmed', type: 'partnership' },
  { source: 'Fashion Brand Deal', amount: 3200, dueDate: 'Aug 22', status: 'pending', type: 'sponsored' },
  { source: 'Product Launch Video', amount: 12000, dueDate: 'Sep 1', status: 'negotiating', type: 'partnership' },
  { source: 'Affiliate Commissions', amount: 1800, dueDate: 'Aug 30', status: 'confirmed', type: 'affiliate' },
]

// Platform-specific data (demo data showing integration with social platforms)
const platformData = [
  {
    platform: 'youtube' as const,
    handle: '@vigeash',
    followers: 75000,
    engagement: 8.2,
    views: 125000,
    likes: 12500,
    comments: 3200,
    growthRate: 12.5,
    earnings: 250
  },
  {
    platform: 'instagram' as const,
    handle: '@vigeash',
    followers: 52000,
    engagement: 6.8,
    views: 85000,
    likes: 18000,
    comments: 2100,
    growthRate: 8.3,
    earnings: 225
  },
  {
    platform: 'tiktok' as const,
    handle: '@vigeash',
    followers: 120000,
    engagement: 12.5,
    views: 450000,
    likes: 56000,
    comments: 8900,
    growthRate: 18.7,
    earnings: 300
  }
]

// Multi-platform summary data
const platformSummary = [
  { platform: 'youtube' as const, followers: 75000, engagement: 8.2, revenue: 250, connected: true },
  { platform: 'instagram' as const, followers: 52000, engagement: 6.8, revenue: 225, connected: true },
  { platform: 'tiktok' as const, followers: 120000, engagement: 12.5, revenue: 300, connected: true }
]

// Top performing content across platforms
const topContent = [
  {
    id: '1',
    platform: 'tiktok' as const,
    title: '10 Secrets to Growing Your Creator Business 🚀',
    views: 450000,
    likes: 56000,
    shares: 8900,
    engagement: 14.2,
    earnings: 125,
    postedAt: '2 days ago'
  },
  {
    id: '2',
    platform: 'youtube' as const,
    title: 'How I Made $10K in One Month as a Creator',
    views: 125000,
    likes: 12500,
    shares: 3200,
    engagement: 12.6,
    earnings: 95,
    postedAt: '5 days ago'
  },
  {
    id: '3',
    platform: 'instagram' as const,
    title: 'Behind the Scenes: My Content Creation Setup',
    views: 85000,
    likes: 18000,
    shares: 2100,
    engagement: 23.6,
    earnings: 80,
    postedAt: '3 days ago'
  },
  {
    id: '4',
    platform: 'youtube' as const,
    title: 'Creator Economy Trends You NEED to Know',
    views: 98000,
    likes: 9500,
    shares: 2500,
    engagement: 12.2,
    earnings: 75,
    postedAt: '1 week ago'
  },
  {
    id: '5',
    platform: 'tiktok' as const,
    title: 'Day in the Life of a Full-Time Creator',
    views: 380000,
    likes: 42000,
    shares: 6700,
    engagement: 12.8,
    earnings: 110,
    postedAt: '4 days ago'
  }
]

export default function DailyPulseDashboard({ userData, onReset }: DailyPulseDashboardProps) {
  const { isMobileView } = useMobilePreview()
  const [gamificationState, setGamificationState] = useState(loadGamificationState())
  const [accessibilityPrefs] = useState(loadAccessibilityPreferences())
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationData, setCelebrationData] = useState<any>(null)

  const totalRevenue = 35400
  const monthlyTarget = 35000
  const upcomingTotal = upcomingRevenue.reduce((sum, item) => sum + item.amount, 0)
  const progressPercentage = (totalRevenue / monthlyTarget) * 100
  const dailyEarnings = totalRevenue / 30

  // Calculate earnings velocity
  const earningsVelocity = calculateEarningsVelocity([dailyEarnings / 24])

  // Generate near-miss alerts
  const nearMissAlerts = generateNearMissAlerts(gamificationState)

  // Generate next best actions
  const nextBestActions = generateNextBestActions(gamificationState)

  // Check if daily login reward can be claimed
  const canClaimDailyReward = () => {
    const now = new Date()
    const lastLogin = gamificationState.dailyLogin.lastLoginDate
    if (!lastLogin) return true
    
    const lastLoginDate = new Date(lastLogin)
    const isSameDay = 
      lastLoginDate.getDate() === now.getDate() &&
      lastLoginDate.getMonth() === now.getMonth() &&
      lastLoginDate.getFullYear() === now.getFullYear()
    
    return !isSameDay
  }

  const handleClaimDailyReward = () => {
    const newState = claimDailyLoginReward(gamificationState)
    if (newState) {
      setGamificationState(newState)
      setCelebrationData({
        title: 'Daily Reward Claimed!',
        description: `You've earned $${gamificationState.dailyLogin.rewards[gamificationState.dailyLogin.currentStreak - 1]?.dollarAmount || 50}`,
        dollarValue: gamificationState.dailyLogin.rewards[gamificationState.dailyLogin.currentStreak - 1]?.dollarAmount || 50,
        xpValue: 100,
      })
      setShowCelebration(true)
    }
  }

  const loginStreak = gamificationState.streaks.find(s => s.type === 'login') || gamificationState.streaks[0]

  useEffect(() => {
    // Update state periodically
    const interval = setInterval(() => {
      setGamificationState(loadGamificationState())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 py-6 md:py-8 grid grid-cols-12 gap-4 md:gap-6">
        {/* Gamification Header */}
        <div className="col-span-12 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="h1">SocialPulse</h1>
              <p className="muted">Creator Performance Analytics</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <PointsDisplay userLevel={gamificationState.userLevel} />
              <VirtualCurrency creatorCoins={gamificationState.creatorCoins} />
              <StreakCounter streak={loginStreak} />
              <EarningsVelocity velocity={earningsVelocity} size="sm" showProjections={false} />
            </div>
          </div>
        </div>

        {/* Next Best Action */}
        {nextBestActions.length > 0 && (
          <div className="col-span-12 mb-6">
            <NextBestAction actions={nextBestActions} />
          </div>
        )}

        {/* Near-Miss Alerts */}
        {nearMissAlerts.length > 0 && (
          <div className="col-span-12 mb-6">
            <NearMissIndicator alerts={nearMissAlerts} />
          </div>
        )}

        {/* Main Revenue Metrics */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card>
            <MoneyIndicator 
              amount={totalRevenue} 
              label="This Month's Revenue"
              trend="up"
              trendPercent={22.5}
              size="lg"
            />
            <div className="mt-2 text-xs text-fg-dim">+22.5% vs last month</div>
          </Card>
          
          <Card>
            <MoneyIndicator 
              amount={upcomingTotal} 
              label="Upcoming Revenue"
              size="lg"
            />
            <div className="mt-2 text-xs text-fg-dim">4 payments pending</div>
          </Card>
          
          <Card>
            <div className="text-4xl font-bold text-fg-high mb-2">{progressPercentage.toFixed(0)}%</div>
            <div className="text-sm text-fg-dim mb-3">Monthly Goal Progress</div>
            <div className="w-full bg-bg-sunken rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-accent-green to-accent-blue transition-all duration-500"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-fg-dim">Target exceeded!</div>
          </Card>
        </div>

        {/* Multi-Platform Overview */}
        <div className="col-span-12 mb-8">
          <MultiPlatformOverview platforms={platformSummary} />
        </div>

        {/* Platform Stats Grid */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {platformData.map((platform) => (
            <PlatformStatsCard key={platform.platform} data={platform} />
          ))}
        </div>

        {/* Top Performing Content */}
        <div className="col-span-12 mb-8">
          <PlatformContentPerformance posts={topContent} />
        </div>

        {/* Live Activity Feed & Smart Recommendations */}
        <div className="col-span-12 lg:col-span-6 mb-8">
          <LiveActivityFeed />
        </div>
        <div className="col-span-12 lg:col-span-6 mb-8">
          <SmartRecommendations />
        </div>

        {/* Content Performance Predictor & Audience Insights */}
        <div className="col-span-12 lg:col-span-6 mb-8">
          <ContentPerformancePredictor />
        </div>
        <div className="col-span-12 lg:col-span-6 mb-8">
          <AudienceInsights />
        </div>

        {/* Revenue Breakdown & Engagement Heatmap */}
        <div className="col-span-12 lg:col-span-6 mb-8">
          <RevenueBreakdown />
        </div>
        <div className="col-span-12 lg:col-span-6 mb-8">
          <EngagementHeatmap />
        </div>

            {/* Growth Trajectory & Platform Connection Status */}
            <div className="col-span-12 lg:col-span-8 mb-8">
              <GrowthTrajectory />
            </div>
            <div className="col-span-12 lg:col-span-4 mb-8">
              <PlatformConnectionStatus />
            </div>

        {/* Filter & Sort & Search Discovery */}
        <div className="col-span-12 lg:col-span-6 mb-8">
          <FilterSortPanel />
        </div>
        <div className="col-span-12 lg:col-span-6 mb-8">
          <SearchDiscovery />
        </div>

        {/* Revenue Overview & Daily Login Calendar */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="h2">Revenue Overview</h2>
                <p className="muted">Monthly earnings and growth trends</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs px-3 py-1 rounded-full bg-accent-green/10 text-accent-green ring-1 ring-accent-green/20">
                  <Flame className="w-3 h-3 inline mr-1" />
                  Hot Streak
                </div>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="h-48 flex items-end justify-between gap-2 mb-6">
              {revenueData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center gap-1 mb-2">
                    <div 
                      className="w-full bg-gradient-to-t from-accent-blue to-accent-purple rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${(data.earned / 40000) * 120}px` }}
                    />
                    <div 
                      className="w-full bg-gradient-to-t from-accent-green to-accent-blue rounded-t-lg opacity-60"
                      style={{ height: `${(data.target / 40000) * 120}px` }}
                    />
                  </div>
                  <div className="text-xs text-fg-dim">{data.month}</div>
                  <div className="text-xs font-semibold text-fg-high">${(data.earned / 1000).toFixed(0)}k</div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-bg-sunken rounded-lg">
                <div className="text-2xl font-bold text-fg-high">$35.4K</div>
                <div className="text-xs text-fg-dim">Current Month</div>
              </div>
              <div className="text-center p-4 bg-bg-sunken rounded-lg">
                <div className="text-2xl font-bold text-fg-high">+22.5%</div>
                <div className="text-xs text-fg-dim">Growth Rate</div>
              </div>
              <div className="text-center p-4 bg-bg-sunken rounded-lg">
                <div className="text-2xl font-bold text-fg-high">${dailyEarnings.toFixed(0)}</div>
                <div className="text-xs text-fg-dim">Per Day</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Daily Login Calendar */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            {isMobileView ? (
              <DailyLoginCalendarMobile 
                dailyLogin={gamificationState.dailyLogin}
                onClaimReward={handleClaimDailyReward}
                canClaim={canClaimDailyReward()}
              />
            ) : (
              <DailyLoginCalendar 
                dailyLogin={gamificationState.dailyLogin}
                onClaimReward={handleClaimDailyReward}
                canClaim={canClaimDailyReward()}
              />
            )}
          </Card>
        </div>

        {/* Achievements */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Achievements</h2>
              <Trophy className="w-5 h-5 text-accent-yellow" />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {gamificationState.achievements.slice(0, 8).map((achievement) => (
                <AchievementBadge 
                  key={achievement.id} 
                  achievement={achievement}
                  size="md"
                />
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-edge-subtle">
              <div className="flex items-center justify-between">
                <span className="text-sm text-fg-dim">
                  {gamificationState.achievements.filter(a => a.unlocked).length} of {gamificationState.achievements.length} unlocked
                </span>
                <button className="text-sm text-accent-blue hover:text-accent-purple transition-colors flex items-center gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Daily Challenges */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Daily Challenges</h2>
              <Zap className="w-5 h-5 text-accent-blue" />
            </div>
            
            <div className="space-y-3">
              {gamificationState.dailyChallenges.map((challenge) => {
                const progressPercent = (challenge.progress / challenge.target) * 100
                
                return (
                  <div 
                    key={challenge.id}
                    className={`p-4 rounded-lg border transition-all ${
                      challenge.completed 
                        ? 'bg-accent-green/10 border-accent-green/30' 
                        : 'bg-bg-sunken border-edge-subtle'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-semibold text-fg-high mb-1">{challenge.title}</div>
                        <div className="text-xs text-fg-dim">{challenge.description}</div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="flex items-center gap-1 text-accent-green font-bold">
                          <DollarSign className="w-4 h-4" />
                          <span>{challenge.dollarReward}</span>
                        </div>
                        <div className="text-xs text-fg-dim">+{challenge.xpReward} XP</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-bg rounded-full h-2 mt-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          challenge.completed 
                            ? 'bg-accent-green' 
                            : 'bg-gradient-to-r from-accent-blue to-accent-purple'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 text-xs text-fg-dim">
                      <span>{challenge.progress} / {challenge.target}</span>
                      {challenge.completed && (
                        <span className="text-accent-green font-semibold">Completed!</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Upcoming Revenue */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Upcoming Revenue</h2>
              <Calendar className="w-5 h-5 text-accent-blue" />
            </div>
            
            <div className="space-y-3">
              {upcomingRevenue.map((revenue, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-bg-sunken rounded-lg">
                  <div>
                    <div className="body font-semibold text-fg-high">{revenue.source}</div>
                    <div className="text-sm text-fg-dim">Due: {revenue.dueDate}</div>
                  </div>
                  <div className="text-right">
                    <MoneyIndicator amount={revenue.amount} size="sm" />
                    <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                      revenue.status === 'confirmed' ? 'bg-accent-green/10 text-accent-green' :
                      revenue.status === 'pending' ? 'bg-accent-yellow/10 text-accent-yellow' :
                      'bg-accent-blue/10 text-accent-blue'
                    }`}>
                      {revenue.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Leaderboard */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Top Creators</h2>
              <Trophy className="w-5 h-5 text-accent-yellow" />
            </div>
            
            <Leaderboard 
              entries={gamificationState.leaderboard}
              currentUserId="user-5"
            />
          </Card>
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebration && celebrationData && (
        <CelebrationModal
          isOpen={showCelebration}
          onClose={() => {
            setShowCelebration(false)
            setCelebrationData(null)
          }}
          title={celebrationData.title}
          description={celebrationData.description}
          dollarValue={celebrationData.dollarValue}
          xpValue={celebrationData.xpValue}
          accessibilityPrefs={accessibilityPrefs}
        />
      )}
    </div>
  )
}

