'use client'

import { useState, useEffect } from 'react'
import { Card, KpiCard } from '@creatorhub/ui'
import { DollarSign, TrendingUp, Calendar, CreditCard, ArrowUpRight, Target, Zap, Trophy } from 'lucide-react'
import { loadGamificationState, generateNearMissAlerts, calculateEarningsVelocity } from '../lib/gamification'
import { MoneyIndicator } from './gamification/MoneyIndicator'
import { EarningsVelocity } from './gamification/EarningsVelocity'
import { ProgressBar } from './gamification/ProgressBar'
import { NearMissIndicator } from './gamification/NearMissIndicator'
import { DailyLoginCalendar } from './gamification/DailyLoginCalendar'

interface FinanceDashboardProps {
  userData: any
  onReset: () => void
}

const monthlyEarnings = [
  { month: 'Jan', amount: 18500, growth: '+12.5%' },
  { month: 'Feb', amount: 22100, growth: '+19.5%' },
  { month: 'Mar', amount: 19800, growth: '-10.4%' },
  { month: 'Apr', amount: 25600, growth: '+29.3%' },
  { month: 'May', amount: 31200, growth: '+21.9%' },
  { month: 'Jun', amount: 28900, growth: '-7.4%' },
  { month: 'Jul', amount: 35400, growth: '+22.5%' },
]

const revenueStreams = [
  { name: 'Brand Partnerships', amount: 18500, percentage: 52, trend: 'up', change: '+15.2%', potential: 25000 },
  { name: 'Ad Revenue', amount: 8900, percentage: 25, trend: 'up', change: '+8.7%', potential: 12000 },
  { name: 'Affiliate Sales', amount: 4200, percentage: 12, trend: 'down', change: '-3.1%', potential: 6000 },
  { name: 'Sponsored Content', amount: 3800, percentage: 11, trend: 'up', change: '+22.4%', potential: 5500 },
]

const upcomingPayments = [
  { client: 'TechCorp Campaign', amount: 8500, dueDate: '2024-08-15', status: 'confirmed' },
  { client: 'Fashion Brand Deal', amount: 3200, dueDate: '2024-08-22', status: 'pending' },
  { client: 'Product Launch Video', amount: 12000, dueDate: '2024-09-01', status: 'negotiating' },
]

const revenueMilestones = [
  { threshold: 10000, title: 'Bronze Creator', reward: 'Unlock Premium Analytics', dollarValue: 500, progress: 35400 },
  { threshold: 25000, title: 'Silver Creator', reward: 'Priority Support Access', dollarValue: 1000, progress: 35400 },
  { threshold: 50000, title: 'Gold Creator', reward: 'Exclusive Brand Deals', dollarValue: 2500, progress: 35400 },
  { threshold: 100000, title: 'Platinum Creator', reward: 'VIP Event Access', dollarValue: 5000, progress: 35400 },
]

export default function FinanceDashboard({ userData, onReset }: FinanceDashboardProps) {
  const [gamificationState, setGamificationState] = useState(loadGamificationState())
  
  const currentEarnings = 35400
  const availableBalance = 24680
  const pendingPayments = 15200
  const totalPotential = currentEarnings + pendingPayments
  const projectedMonthly = totalPotential * 1.2

  const earningsVelocity = calculateEarningsVelocity([currentEarnings / 30 / 24])
  const nearMissAlerts = generateNearMissAlerts(gamificationState)

  // Find next milestone
  const nextMilestone = revenueMilestones.find(m => m.progress < m.threshold) || revenueMilestones[revenueMilestones.length - 1]
  const milestoneProgress = nextMilestone ? (currentEarnings / nextMilestone.threshold) * 100 : 100

  useEffect(() => {
    const interval = setInterval(() => {
      setGamificationState(loadGamificationState())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 py-6 md:py-8 grid grid-cols-12 gap-4 md:gap-6">
        {/* Header */}
        <div className="col-span-12 mb-6">
          <h1 className="h1">Finance</h1>
          <p className="muted">Revenue & Payment Management</p>
        </div>

        {/* Near-Miss Alerts */}
        {nearMissAlerts.length > 0 && (
          <div className="col-span-12 mb-6">
            <NearMissIndicator alerts={nearMissAlerts} />
          </div>
        )}

        {/* Financial Summary Cards */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card>
            <MoneyIndicator 
              amount={availableBalance} 
              label="Available Balance"
              trend="up"
              trendPercent={12.5}
              size="lg"
            />
            <div className="mt-2 text-xs text-fg-dim">+12.5% this month</div>
          </Card>
          
          <Card>
            <MoneyIndicator 
              amount={pendingPayments} 
              label="Pending Payments"
              size="lg"
            />
            <div className="mt-2 text-xs text-fg-dim">3 upcoming</div>
          </Card>
          
          <Card>
            <MoneyIndicator 
              amount={currentEarnings} 
              label="This Month's Revenue"
              trend="up"
              trendPercent={22.5}
              size="lg"
            />
            <div className="mt-2 text-xs text-fg-dim">+22.5% vs last month</div>
          </Card>
        </div>

        {/* Earnings Potential Calculator */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="h2">Earnings Potential</h2>
                <p className="muted">Calculate your total earning potential</p>
              </div>
              <EarningsVelocity velocity={earningsVelocity} size="sm" showProjections={false} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-bg-sunken rounded-lg">
                <div className="text-xs text-fg-dim mb-1">Current Earnings</div>
                <MoneyIndicator amount={currentEarnings} size="md" />
              </div>
              
              <div className="p-4 bg-bg-sunken rounded-lg">
                <div className="text-xs text-fg-dim mb-1">Pending Payments</div>
                <MoneyIndicator amount={pendingPayments} size="md" />
              </div>
              
              <div className="p-4 bg-gradient-to-br from-accent-green/10 to-accent-blue/10 border border-accent-green/30 rounded-lg">
                <div className="text-xs text-fg-dim mb-1">Projected Monthly</div>
                <MoneyIndicator amount={projectedMonthly} size="md" />
                <div className="text-xs text-accent-green mt-1">+20% potential</div>
              </div>
            </div>

            {/* Monthly Earnings Chart */}
            <div className="h-64 flex items-end justify-between gap-2">
              {monthlyEarnings.map((earning, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-accent-blue to-accent-purple rounded-t-lg mb-2 transition-all hover:opacity-80"
                    style={{ height: `${(earning.amount / 40000) * 200}px` }}
                  />
                  <div className="text-xs text-fg-dim">{earning.month}</div>
                  <div className="text-xs font-semibold text-fg-high">${(earning.amount / 1000).toFixed(0)}k</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Revenue Milestones */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Revenue Milestones</h2>
              <Trophy className="w-5 h-5 text-accent-yellow" />
            </div>
            
            <div className="space-y-4">
              {revenueMilestones.map((milestone, index) => {
                const isUnlocked = currentEarnings >= milestone.threshold
                const progress = Math.min((currentEarnings / milestone.threshold) * 100, 100)
                
                return (
                  <div key={index} className={`p-4 rounded-lg border ${
                    isUnlocked 
                      ? 'bg-accent-green/10 border-accent-green/30' 
                      : 'bg-bg-sunken border-edge-subtle'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-semibold text-fg-high">{milestone.title}</div>
                        <div className="text-xs text-fg-dim">{milestone.reward}</div>
                      </div>
                      {isUnlocked && (
                        <Trophy className="w-5 h-5 text-accent-yellow" />
                      )}
                    </div>
                    
                    <ProgressBar
                      current={currentEarnings}
                      target={milestone.threshold}
                      dollarValue={milestone.dollarValue}
                      showMoney={true}
                      size="sm"
                      color={isUnlocked ? 'green' : 'blue'}
                    />
                    
                    {!isUnlocked && currentEarnings < milestone.threshold && (
                      <div className="text-xs text-accent-yellow mt-2">
                        Only ${(milestone.threshold - currentEarnings).toLocaleString()} away!
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Revenue Streams */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Revenue Streams</h2>
              <Target className="w-5 h-5 text-accent-blue" />
            </div>
            
            <div className="space-y-4">
              {revenueStreams.map((stream, index) => {
                const potentialUnlock = stream.potential - stream.amount
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="body font-semibold text-fg-high">{stream.name}</span>
                      <div className="flex items-center gap-2">
                        <MoneyIndicator amount={stream.amount} size="sm" />
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          stream.trend === 'up' 
                            ? 'bg-accent-green/10 text-accent-green' 
                            : 'bg-accent-pink/10 text-accent-pink'
                        }`}>
                          {stream.change}
                        </span>
                      </div>
                    </div>
                    
                    <ProgressBar
                      current={stream.amount}
                      target={stream.potential}
                      dollarValue={potentialUnlock}
                      showMoney={true}
                      size="sm"
                      color="blue"
                    />
                    
                    {potentialUnlock > 0 && (
                      <div className="text-xs text-fg-dim">
                        Complete actions to unlock ${potentialUnlock.toLocaleString()} more
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Money Multiplier */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Money Multiplier</h2>
              <Zap className="w-5 h-5 text-accent-blue" />
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-accent-purple/10 to-accent-pink/10 border border-accent-purple/30 rounded-lg">
                <div className="text-sm font-semibold text-fg-high mb-2">Current Multiplier</div>
                <div className="text-4xl font-bold text-accent-purple mb-2">2.5x</div>
                <div className="text-xs text-fg-dim">Complete tasks in streaks to increase multiplier</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-fg-dim">Task Streak</span>
                  <span className="font-semibold text-fg-high">7 days</span>
                </div>
                <div className="w-full bg-bg-sunken rounded-full h-2">
                  <div className="h-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple" style={{ width: '70%' }} />
                </div>
                <div className="text-xs text-fg-dim">+0.5x for each 7-day streak</div>
              </div>
              
              <div className="p-3 bg-bg-sunken rounded-lg">
                <div className="text-xs text-fg-dim mb-1">Base Earnings</div>
                <MoneyIndicator amount={currentEarnings} size="sm" />
                <div className="text-xs text-fg-dim mt-2">× 2.5 Multiplier</div>
                <div className="text-lg font-bold text-accent-green mt-1">
                  = ${(currentEarnings * 2.5).toLocaleString()} potential
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Upcoming Payments */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Upcoming Payments</h2>
              <Calendar className="w-5 h-5 text-accent-blue" />
            </div>
            
            <div className="space-y-4">
              {upcomingPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-bg-sunken rounded-lg">
                  <div>
                    <div className="body font-semibold text-fg-high">{payment.client}</div>
                    <div className="text-sm text-fg-dim">Due: {new Date(payment.dueDate).toLocaleDateString()}</div>
                  </div>
                  <div className="text-right">
                    <MoneyIndicator amount={payment.amount} size="sm" />
                    <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                      payment.status === 'confirmed' ? 'bg-accent-green/10 text-accent-green' :
                      payment.status === 'pending' ? 'bg-accent-yellow/10 text-accent-yellow' :
                      'bg-accent-blue/10 text-accent-blue'
                    }`}>
                      {payment.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Daily Login Rewards */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <DailyLoginCalendar 
              dailyLogin={gamificationState.dailyLogin}
              onClaimReward={() => {}}
              canClaim={false}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
