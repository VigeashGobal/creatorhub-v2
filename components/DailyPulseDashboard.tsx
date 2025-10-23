'use client'

import { Card } from '@/components/ui/Card'
import { KpiCard } from '@/components/ui/KpiCard'
import { DollarSign, TrendingUp, Calendar, CreditCard, ArrowUpRight, ArrowDownLeft, Target, Zap, Trophy, Star, Award, Crown, Flame, Sparkles } from 'lucide-react'

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

const achievements = [
  { id: 1, title: 'Revenue Master', description: 'Earned $30K+ this month', icon: Crown, unlocked: true, reward: '+$2K bonus' },
  { id: 2, title: 'Consistency King', description: '7-day posting streak', icon: Flame, unlocked: true, reward: '+15% engagement' },
  { id: 3, title: 'Brand Magnet', description: '5 brand partnerships', icon: Star, unlocked: false, reward: '+$5K potential' },
  { id: 4, title: 'Viral Creator', description: '1M+ views on single post', icon: Trophy, unlocked: false, reward: '+$10K potential' },
]

const upcomingRevenue = [
  { source: 'TechCorp Campaign', amount: 8500, dueDate: 'Aug 15', status: 'confirmed', type: 'partnership' },
  { source: 'Fashion Brand Deal', amount: 3200, dueDate: 'Aug 22', status: 'pending', type: 'sponsored' },
  { source: 'Product Launch Video', amount: 12000, dueDate: 'Sep 1', status: 'negotiating', type: 'partnership' },
  { source: 'Affiliate Commissions', amount: 1800, dueDate: 'Aug 30', status: 'confirmed', type: 'affiliate' },
]

const revenueStreaks = [
  { type: 'Monthly Growth', streak: 4, maxStreak: 6, reward: '+$2K bonus' },
  { type: 'Brand Partnerships', streak: 3, maxStreak: 5, reward: '+$5K potential' },
  { type: 'Content Consistency', streak: 7, maxStreak: 30, reward: '+15% engagement' },
]

export default function DailyPulseDashboard({ userData, onReset }: DailyPulseDashboardProps) {
  const totalRevenue = 35400
  const monthlyTarget = 35000
  const upcomingTotal = upcomingRevenue.reduce((sum, item) => sum + item.amount, 0)
  const progressPercentage = (totalRevenue / monthlyTarget) * 100

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 py-6 md:py-8 grid grid-cols-12 gap-4 md:gap-6">
        {/* Hero Revenue Section */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="h1">Your Revenue Dashboard</h1>
                <p className="muted">Track your earnings and unlock new opportunities</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs px-3 py-1 rounded-full bg-accent-green/10 text-accent-green ring-1 ring-accent-green/20">
                  <Flame className="w-3 h-3 inline mr-1" />
                  Hot Streak
                </div>
              </div>
            </div>

            {/* Main Revenue Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-fg-high mb-2">${totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-fg-dim mb-2">This Month&apos;s Revenue</div>
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent-green" />
                  <span className="text-sm text-accent-green font-semibold">+22.5% vs last month</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-fg-high mb-2">${upcomingTotal.toLocaleString()}</div>
                <div className="text-sm text-fg-dim mb-2">Upcoming Revenue</div>
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4 text-accent-blue" />
                  <span className="text-sm text-accent-blue font-semibold">4 payments pending</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-fg-high mb-2">{Math.round(progressPercentage)}%</div>
                <div className="text-sm text-fg-dim mb-2">Monthly Goal Progress</div>
                <div className="w-full bg-bg-sunken rounded-full h-2 mt-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-accent-green to-accent-blue"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="h-48 flex items-end justify-between gap-2">
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
          </Card>
        </div>

        {/* Achievements & Streaks */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Achievements</h2>
              <Trophy className="w-6 h-6 text-accent-yellow" />
            </div>
            
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`p-3 rounded-lg transition-all ${
                  achievement.unlocked 
                    ? 'bg-accent-green/10 border border-accent-green/20' 
                    : 'bg-bg-sunken'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.unlocked 
                        ? 'bg-accent-green text-white' 
                        : 'bg-fg-dim/20 text-fg-dim'
                    }`}>
                      <achievement.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="body font-semibold text-fg-high">{achievement.title}</div>
                      <div className="text-sm text-fg-dim">{achievement.description}</div>
                      {achievement.unlocked && (
                        <div className="text-xs text-accent-green font-semibold mt-1">{achievement.reward}</div>
                      )}
                    </div>
                    {achievement.unlocked && (
                      <Sparkles className="w-4 h-4 text-accent-yellow" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Revenue Streaks */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Revenue Streaks</h2>
              <Flame className="w-6 h-6 text-accent-orange" />
            </div>
            
            <div className="space-y-4">
              {revenueStreaks.map((streak, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="body font-semibold text-fg-high">{streak.type}</span>
                    <span className="text-sm text-fg-high">{streak.streak}/{streak.maxStreak}</span>
                  </div>
                  <div className="w-full bg-bg-sunken rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-accent-orange to-accent-yellow"
                      style={{ width: `${(streak.streak / streak.maxStreak) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-fg-dim">{streak.reward}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Upcoming Revenue */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Upcoming Revenue</h2>
              <Calendar className="w-6 h-6 text-accent-blue" />
            </div>
            
            <div className="space-y-3">
              {upcomingRevenue.map((revenue, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-bg-sunken rounded-lg">
                  <div>
                    <div className="body font-semibold text-fg-high">{revenue.source}</div>
                    <div className="text-sm text-fg-dim">Due: {revenue.dueDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-fg-high">${revenue.amount.toLocaleString()}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
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

        {/* Quick Revenue Actions */}
        <div className="col-span-12">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Boost Your Revenue</h2>
              <Zap className="w-6 h-6 text-accent-blue" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="flex items-center justify-center gap-2 p-4 bg-accent-blue/10 hover:bg-accent-blue/20 rounded-lg transition-colors">
                <DollarSign className="w-5 h-5 text-accent-blue" />
                <span className="text-sm font-semibold">Request Payment</span>
              </button>
              
              <button className="flex items-center justify-center gap-2 p-4 bg-accent-green/10 hover:bg-accent-green/20 rounded-lg transition-colors">
                <Target className="w-5 h-5 text-accent-green" />
                <span className="text-sm font-semibold">Set Revenue Goals</span>
              </button>
              
              <button className="flex items-center justify-center gap-2 p-4 bg-accent-purple/10 hover:bg-accent-purple/20 rounded-lg transition-colors">
                <TrendingUp className="w-5 h-5 text-accent-purple" />
                <span className="text-sm font-semibold">Find Opportunities</span>
              </button>
              
              <button className="flex items-center justify-center gap-2 p-4 bg-accent-yellow/10 hover:bg-accent-yellow/20 rounded-lg transition-colors">
                <Award className="w-5 h-5 text-accent-yellow" />
                <span className="text-sm font-semibold">View Achievements</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}