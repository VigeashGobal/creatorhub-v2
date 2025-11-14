'use client'

import { Card } from '@creatorhub/ui'
import { DollarSign, PieChart, TrendingUp, Youtube, Instagram, Music } from 'lucide-react'

interface RevenueBreakdownProps {
  className?: string
}

const platformRevenue = [
  { platform: 'youtube', name: 'YouTube', amount: 250, percentage: 32.3, color: 'bg-red-500', icon: Youtube },
  { platform: 'tiktok', name: 'TikTok', amount: 300, percentage: 38.7, color: 'bg-cyan-400', icon: Music },
  { platform: 'instagram', name: 'Instagram', amount: 225, percentage: 29.0, color: 'bg-pink-500', icon: Instagram }
]

const revenueByType = [
  { type: 'Brand Partnerships', amount: 450, percentage: 58.1, color: 'bg-accent-blue' },
  { type: 'Affiliate Marketing', amount: 180, percentage: 23.2, color: 'bg-accent-green' },
  { type: 'Ad Revenue', amount: 145, percentage: 18.7, color: 'bg-accent-purple' }
]

const monthlyTrend = [
  { month: 'Jan', total: 185, youtube: 60, instagram: 55, tiktok: 70 },
  { month: 'Feb', total: 221, youtube: 75, instagram: 65, tiktok: 81 },
  { month: 'Mar', total: 198, youtube: 68, instagram: 58, tiktok: 72 },
  { month: 'Apr', total: 256, youtube: 85, instagram: 75, tiktok: 96 },
  { month: 'May', total: 312, youtube: 100, instagram: 95, tiktok: 117 },
  { month: 'Jun', total: 289, youtube: 95, instagram: 88, tiktok: 106 },
  { month: 'Jul', total: 354, youtube: 115, instagram: 102, tiktok: 137 }
]

const maxRevenue = Math.max(...monthlyTrend.map(m => m.total))

export function RevenueBreakdown({ className = '' }: RevenueBreakdownProps) {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-accent-green" />
          <h2 className="text-xl font-bold text-fg-high">Revenue Breakdown</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-fg-dim">
          <DollarSign className="w-3 h-3" />
          <span>Total: $775/mo</span>
        </div>
      </div>

      {/* Platform Breakdown - Pie Chart Visual */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-fg-high mb-4">By Platform</h3>
        <div className="flex items-center gap-6">
          {/* Pie Chart Visual */}
          <div className="relative w-32 h-32 flex-shrink-0">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              {(() => {
                let currentAngle = 0
                return platformRevenue.map((item, index) => {
                  const angle = (item.percentage / 100) * 360
                  const startAngle = currentAngle
                  currentAngle += angle
                  
                  const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180)
                  const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180)
                  const x2 = 50 + 50 * Math.cos((currentAngle * Math.PI) / 180)
                  const y2 = 50 + 50 * Math.sin((currentAngle * Math.PI) / 180)
                  
                  const largeArc = angle > 180 ? 1 : 0
                  
                  return (
                    <path
                      key={item.platform}
                      d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={item.color.replace('bg-', '')}
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    />
                  )
                })
              })()}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-fg-high">$775</div>
                <div className="text-xs text-fg-dim">Total</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-2">
            {platformRevenue.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.platform} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <Icon className="w-4 h-4 text-fg-dim" />
                    <span className="text-sm text-fg-high">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-bg-sunken rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-fg-high w-16 text-right">
                      ${item.amount}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Revenue by Type */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-fg-high mb-4">By Revenue Type</h3>
        <div className="space-y-3">
          {revenueByType.map((item) => (
            <div key={item.type}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-fg-high">{item.type}</span>
                <span className="text-sm font-semibold text-fg-high">${item.amount}</span>
              </div>
              <div className="w-full bg-bg-sunken rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend - Stacked Area */}
      <div>
        <h3 className="text-sm font-semibold text-fg-high mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Monthly Trend
        </h3>
        <div className="h-48 flex items-end justify-between gap-1">
          {monthlyTrend.map((month, index) => (
            <div key={month.month} className="flex-1 flex flex-col items-center group">
              <div className="w-full flex flex-col items-center gap-0.5 mb-2 relative">
                {/* Stacked bars */}
                <div
                  className="w-full bg-red-500/80 rounded-t transition-all hover:opacity-100"
                  style={{ height: `${(month.youtube / maxRevenue) * 120}px` }}
                  title={`YouTube: $${month.youtube}`}
                />
                <div
                  className="w-full bg-pink-500/80 transition-all hover:opacity-100"
                  style={{ height: `${(month.instagram / maxRevenue) * 120}px` }}
                  title={`Instagram: $${month.instagram}`}
                />
                <div
                  className="w-full bg-cyan-400/80 rounded-b transition-all hover:opacity-100"
                  style={{ height: `${(month.tiktok / maxRevenue) * 120}px` }}
                  title={`TikTok: $${month.tiktok}`}
                />
              </div>
              <div className="text-xs text-fg-dim">{month.month}</div>
              <div className="text-xs font-semibold text-fg-high opacity-0 group-hover:opacity-100 transition-opacity">
                ${month.total}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

