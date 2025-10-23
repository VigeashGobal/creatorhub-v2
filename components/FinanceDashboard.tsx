'use client'

import { Card } from '@/components/ui/Card'
import { KpiCard } from '@/components/ui/KpiCard'
import { DollarSign, TrendingUp, Calendar, CreditCard, ArrowUpRight, ArrowDownLeft, Target, Zap } from 'lucide-react'

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
  { name: 'Brand Partnerships', amount: 18500, percentage: 52, trend: 'up', change: '+15.2%' },
  { name: 'Ad Revenue', amount: 8900, percentage: 25, trend: 'up', change: '+8.7%' },
  { name: 'Affiliate Sales', amount: 4200, percentage: 12, trend: 'down', change: '-3.1%' },
  { name: 'Sponsored Content', amount: 3800, percentage: 11, trend: 'up', change: '+22.4%' },
]

const upcomingPayments = [
  { client: 'TechCorp Campaign', amount: 8500, dueDate: '2024-08-15', status: 'confirmed' },
  { client: 'Fashion Brand Deal', amount: 3200, dueDate: '2024-08-22', status: 'pending' },
  { client: 'Product Launch Video', amount: 12000, dueDate: '2024-09-01', status: 'negotiating' },
]

export default function FinanceDashboard({ userData, onReset }: FinanceDashboardProps) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 py-6 md:py-8 grid grid-cols-12 gap-4 md:gap-6">
        {/* Header */}
        <div className="col-span-12 mb-6">
          <h1 className="h1">Finance</h1>
          <p className="muted">Revenue & Payment Management</p>
        </div>

        {/* Financial Summary Cards */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <KpiCard 
            label="Available Balance" 
            value="$24,680" 
            delta="+12.5% this month" 
            icon="users" 
          />
          <KpiCard 
            label="Pending Payments" 
            value="$15,200" 
            delta="3 upcoming" 
            icon="heart" 
          />
          <KpiCard 
            label="This Month's Revenue" 
            value="$35,400" 
            delta="+22.5% vs last month" 
            icon="eye" 
          />
        </div>

        {/* Monthly Earnings Chart */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="h2">Monthly Earnings</h2>
                <p className="muted">Revenue growth over the last 7 months</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs px-2 py-1 rounded-full bg-accent-green/10 text-accent-green">
                  +22.5% Growth
                </div>
              </div>
            </div>
            
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

        {/* Revenue Streams */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Revenue Streams</h2>
              <Target className="w-5 h-5 text-accent-blue" />
            </div>
            
            <div className="space-y-4">
              {revenueStreams.map((stream, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="body font-semibold text-fg-high">{stream.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-fg-high">${stream.amount.toLocaleString()}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        stream.trend === 'up' 
                          ? 'bg-accent-green/10 text-accent-green' 
                          : 'bg-accent-pink/10 text-accent-pink'
                      }`}>
                        {stream.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-bg-sunken rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                      style={{ width: `${stream.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
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
                    <div className="text-lg font-bold text-fg-high">${payment.amount.toLocaleString()}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
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

        {/* Quick Actions */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Quick Actions</h2>
              <Zap className="w-5 h-5 text-accent-blue" />
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center justify-between p-4 bg-accent-blue/10 hover:bg-accent-blue/20 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-accent-blue" />
                  <span className="body font-semibold">Request Payment</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-fg-dim" />
              </button>
              
              <button className="flex items-center justify-between p-4 bg-accent-green/10 hover:bg-accent-green/20 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-accent-green" />
                  <span className="body font-semibold">View Analytics</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-fg-dim" />
              </button>
              
              <button className="flex items-center justify-between p-4 bg-accent-purple/10 hover:bg-accent-purple/20 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-accent-purple" />
                  <span className="body font-semibold">Set Revenue Goals</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-fg-dim" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}