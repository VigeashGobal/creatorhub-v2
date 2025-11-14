'use client'

import { Card } from '@creatorhub/ui'
import { TrendingUp, Target, Zap } from 'lucide-react'

interface GrowthTrajectoryProps {
  className?: string
}

const historicalData = [
  { month: 'Jan', followers: 85000, isProjected: false },
  { month: 'Feb', followers: 92000, isProjected: false },
  { month: 'Mar', followers: 98000, isProjected: false },
  { month: 'Apr', followers: 105000, isProjected: false },
  { month: 'May', followers: 112000, isProjected: false },
  { month: 'Jun', followers: 118000, isProjected: false },
  { month: 'Jul', followers: 120000, isProjected: false }
]

const projectedData = [
  { month: 'Aug', followers: 125000, isProjected: true },
  { month: 'Sep', followers: 130000, isProjected: true },
  { month: 'Oct', followers: 135000, isProjected: true },
  { month: 'Nov', followers: 140000, isProjected: true },
  { month: 'Dec', followers: 145000, isProjected: true }
]

const allData = [...historicalData, ...projectedData]
const maxFollowers = Math.max(...allData.map(d => d.followers))
const minFollowers = Math.min(...allData.map(d => d.followers))

const milestones = [
  { followers: 100000, label: '100K', achieved: true, date: 'Apr 2024' },
  { followers: 150000, label: '150K', achieved: false, date: 'Dec 2024' },
  { followers: 200000, label: '200K', achieved: false, date: 'Mar 2025' }
]

export function GrowthTrajectory({ className = '' }: GrowthTrajectoryProps) {
  const currentFollowers = historicalData[historicalData.length - 1].followers
  const projectedFollowers = projectedData[projectedData.length - 1].followers
  const growthRate = ((projectedFollowers - currentFollowers) / currentFollowers) * 100
  const monthsTo150K = Math.ceil((150000 - currentFollowers) / ((projectedFollowers - currentFollowers) / projectedData.length))

  return (
    <Card className={className || ''}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent-green" />
          <h2 className="text-xl font-bold text-fg-high">Growth Trajectory</h2>
        </div>
        <div className="text-xs px-3 py-1 rounded-full bg-accent-green/10 text-accent-green">
          AI Projected
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3 bg-bg-soft rounded-lg">
          <div className="text-xs text-fg-dim mb-1">Current</div>
          <div className="text-lg font-bold text-fg-high">
            {currentFollowers >= 1000 ? `${(currentFollowers / 1000).toFixed(0)}K` : currentFollowers}
          </div>
        </div>
        <div className="p-3 bg-bg-soft rounded-lg">
          <div className="text-xs text-fg-dim mb-1">Projected</div>
          <div className="text-lg font-bold text-accent-green">
            {projectedFollowers >= 1000 ? `${(projectedFollowers / 1000).toFixed(0)}K` : projectedFollowers}
          </div>
        </div>
        <div className="p-3 bg-bg-soft rounded-lg">
          <div className="text-xs text-fg-dim mb-1">Growth</div>
          <div className="text-lg font-bold text-accent-blue">
            +{growthRate.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="h-64 flex items-end justify-between gap-1 relative">
          {milestones.map((milestone) => {
            const yPosition = ((maxFollowers - milestone.followers) / (maxFollowers - minFollowers)) * 100
            return (
              <div
                key={milestone.label}
                className="absolute left-0 right-0 border-t border-dashed border-fg-dim/20"
                style={{ bottom: `${yPosition}%` }}
              >
                <div className="absolute left-0 -top-2.5 flex items-center gap-1">
                  <Target className={`w-3 h-3 ${milestone.achieved ? 'text-accent-green' : 'text-fg-dim'}`} />
                  <span className={`text-xs font-semibold ${milestone.achieved ? 'text-accent-green' : 'text-fg-dim'}`}>
                    {milestone.label}
                  </span>
                </div>
              </div>
            )
          })}

          {allData.map((data, index) => {
            const height = ((data.followers - minFollowers) / (maxFollowers - minFollowers)) * 100
            
            let rotation = 0
            if (index > 0) {
              const currentHeight = ((allData[index].followers - minFollowers) / (maxFollowers - minFollowers)) * 100
              const prevHeight = ((allData[index - 1].followers - minFollowers) / (maxFollowers - minFollowers)) * 100
              const angle = Math.atan2(currentHeight - prevHeight, 100 / allData.length)
              rotation = angle * 180 / Math.PI
            }
            
            return (
              <div key={data.month} className="flex-1 flex flex-col items-center group relative">
                {index > 0 && (
                  <div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-blue/30"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transformOrigin: 'left center'
                    }}
                  />
                )}
                
                <div
                  className={`w-full rounded-t transition-all hover:opacity-80 ${
                    data.isProjected
                      ? 'bg-gradient-to-t from-accent-green/40 to-accent-green/20 border-2 border-dashed border-accent-green/50'
                      : 'bg-gradient-to-t from-accent-blue to-accent-purple'
                  }`}
                  style={{ height: `${height}%` }}
                  title={`${data.month}: ${data.followers}K followers`}
                />
                
                <div className="text-xs text-fg-dim mt-1">{data.month}</div>
                
                <div className="absolute bottom-full mb-2 px-2 py-1 bg-bg-dark border border-edge-subtle rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {data.followers}K followers
                  {data.isProjected && <span className="text-accent-green ml-1">(projected)</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-fg-high mb-3 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Milestones
        </h3>
        <div className="space-y-2">
          {milestones.map((milestone) => (
            <div
              key={milestone.label}
              className={`p-3 rounded-lg border ${
                milestone.achieved
                  ? 'bg-accent-green/10 border-accent-green/30'
                  : 'bg-bg-soft border-edge-subtle'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {milestone.achieved ? (
                    <div className="w-6 h-6 rounded-full bg-accent-green flex items-center justify-center">
                      <Target className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-bg-sunken border border-edge-subtle" />
                  )}
                  <div>
                    <div className="text-sm font-semibold text-fg-high">{milestone.label} Followers</div>
                    <div className="text-xs text-fg-dim">{milestone.date}</div>
                  </div>
                </div>
                {milestone.achieved ? (
                  <span className="text-xs px-2 py-1 rounded-full bg-accent-green/20 text-accent-green">
                    Achieved
                  </span>
                ) : (
                  <span className="text-xs text-fg-dim">
                    {milestone.followers === 150000 ? `~${monthsTo150K} months` : 'Upcoming'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 rounded-lg border border-accent-blue/20">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-fg-high mb-1">Growth Forecast</h4>
            <p className="text-xs text-fg-dim">
              At your current growth rate, you&apos;ll reach <strong className="text-accent-green">150K followers</strong> in{' '}
              <strong>{monthsTo150K} months</strong> (around {new Date(Date.now() + monthsTo150K * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}).
              Keep up the momentum! 🚀
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

