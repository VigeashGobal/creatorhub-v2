'use client'

import { Card } from '@creatorhub/ui'
import { TrendingUp, Calendar, DollarSign, Target, Zap } from 'lucide-react'

interface Prediction {
  scenario: string
  postsPerWeek: number
  estimatedViews: number
  estimatedEarnings: number
  followerGrowth: number
  timeframe: string
}

interface ContentPerformancePredictorProps {
  className?: string
}

const predictions: Prediction[] = [
  {
    scenario: 'Current Rate',
    postsPerWeek: 5,
    estimatedViews: 125000,
    estimatedEarnings: 775,
    followerGrowth: 120000,
    timeframe: 'This month'
  },
  {
    scenario: '2x Posting',
    postsPerWeek: 10,
    estimatedViews: 250000,
    estimatedEarnings: 1550,
    followerGrowth: 135000,
    timeframe: 'This month'
  },
  {
    scenario: '3x Posting',
    postsPerWeek: 15,
    estimatedViews: 375000,
    estimatedEarnings: 2325,
    followerGrowth: 150000,
    timeframe: 'This month'
  }
]

export function ContentPerformancePredictor({ className = '' }: ContentPerformancePredictorProps) {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-accent-purple" />
          <h2 className="text-xl font-bold text-fg-high">Performance Predictor</h2>
        </div>
        <div className="text-xs px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple">
          AI Forecast
        </div>
      </div>

      <p className="text-sm text-fg-dim mb-6">
        See how your metrics could change based on posting frequency
      </p>

      <div className="space-y-4">
        {predictions.map((pred, index) => {
          const isCurrent = index === 0
          const isBest = index === predictions.length - 1

          return (
            <div
              key={pred.scenario}
              className={`p-4 rounded-lg border transition-all ${
                isCurrent
                  ? 'bg-bg-soft border-edge-subtle'
                  : isBest
                  ? 'bg-gradient-to-br from-accent-green/10 to-accent-blue/10 border-accent-green/30'
                  : 'bg-bg-soft border-edge-subtle hover:border-accent-blue/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-fg-high">{pred.scenario}</h3>
                  {isCurrent && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent-blue/20 text-accent-blue">
                      Current
                    </span>
                  )}
                  {isBest && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent-green/20 text-accent-green">
                      Best Option
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-fg-dim">
                  <Calendar className="w-3 h-3" />
                  {pred.postsPerWeek} posts/week
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-2 bg-bg-sunken rounded">
                  <div className="flex items-center gap-1 mb-1">
                    <TrendingUp className="w-3 h-3 text-fg-dim" />
                    <span className="text-xs text-fg-dim">Views</span>
                  </div>
                  <div className="text-sm font-bold text-fg-high">
                    {pred.estimatedViews >= 1000 
                      ? `${(pred.estimatedViews / 1000).toFixed(0)}K` 
                      : pred.estimatedViews}
                  </div>
                </div>

                <div className="p-2 bg-bg-sunken rounded">
                  <div className="flex items-center gap-1 mb-1">
                    <DollarSign className="w-3 h-3 text-fg-dim" />
                    <span className="text-xs text-fg-dim">Earnings</span>
                  </div>
                  <div className="text-sm font-bold text-accent-green">
                    ${pred.estimatedEarnings.toLocaleString()}
                  </div>
                </div>

                <div className="p-2 bg-bg-sunken rounded">
                  <div className="flex items-center gap-1 mb-1">
                    <Target className="w-3 h-3 text-fg-dim" />
                    <span className="text-xs text-fg-dim">Followers</span>
                  </div>
                  <div className="text-sm font-bold text-fg-high">
                    {pred.followerGrowth >= 1000 
                      ? `${(pred.followerGrowth / 1000).toFixed(0)}K` 
                      : pred.followerGrowth}
                  </div>
                </div>
              </div>

              {!isCurrent && (
                <div className="mt-3 pt-3 border-t border-edge-subtle">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-fg-dim">Potential increase:</span>
                    <span className="font-semibold text-accent-green">
                      +${(pred.estimatedEarnings - predictions[0].estimatedEarnings).toLocaleString()}/mo
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-accent-blue/10 rounded-lg border border-accent-blue/20">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-fg-high mb-1">Pro Tip</h4>
            <p className="text-xs text-fg-dim">
              Posting 3x more could increase your monthly earnings by $1,550. 
              Focus on your best-performing content types to maximize results.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

