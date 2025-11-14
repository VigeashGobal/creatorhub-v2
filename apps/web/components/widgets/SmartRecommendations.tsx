'use client'

import { Card } from '@creatorhub/ui'
import { Lightbulb, TrendingUp, Clock, Target, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

interface Recommendation {
  id: string
  type: 'timing' | 'content' | 'growth' | 'revenue' | 'engagement'
  title: string
  description: string
  impact: string
  action?: string
  icon: any
  priority: 'high' | 'medium' | 'low'
}

interface SmartRecommendationsProps {
  className?: string
}

const recommendations: Recommendation[] = [
  {
    id: '1',
    type: 'timing',
    title: 'Optimal Posting Time',
    description: 'Your TikTok content performs 3x better on weekends. Post more content on Saturday-Sunday.',
    impact: 'Could increase views by 40%',
    action: 'Schedule weekend posts',
    icon: Clock,
    priority: 'high'
  },
  {
    id: '2',
    type: 'content',
    title: 'Content Type Performance',
    description: 'Videos with "tutorial" in the title get 40% more views on YouTube. Consider adding tutorials to your content mix.',
    impact: 'Potential +12.5K views per video',
    icon: TrendingUp,
    priority: 'high'
  },
  {
    id: '3',
    type: 'growth',
    title: 'Platform Focus',
    description: 'Your TikTok is growing 2x faster than other platforms. Double down on TikTok content this month.',
    impact: 'Could reach 150K followers in 2 months',
    icon: Target,
    priority: 'medium'
  },
  {
    id: '4',
    type: 'revenue',
    title: 'Revenue Opportunity',
    description: 'Post 3x more this week to unlock brand partnership opportunities. Brands prefer active creators.',
    impact: 'Potential $500+ additional monthly revenue',
    icon: Zap,
    priority: 'high'
  },
  {
    id: '5',
    type: 'engagement',
    title: 'Engagement Boost',
    description: 'Posts with questions in the first 3 seconds get 25% more comments. Try asking a question early.',
    impact: 'Could increase engagement by 2.5%',
    icon: TrendingUp,
    priority: 'medium'
  }
]

const priorityColors = {
  high: 'border-accent-yellow/50 bg-accent-yellow/5',
  medium: 'border-accent-blue/50 bg-accent-blue/5',
  low: 'border-edge-subtle bg-bg-soft'
}

const priorityLabels = {
  high: 'High Impact',
  medium: 'Medium Impact',
  low: 'Low Impact'
}

export function SmartRecommendations({ className = '' }: SmartRecommendationsProps) {
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set())

  const handleApply = (id: string) => {
    setAppliedIds(prev => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
    // In a real app, this would trigger an action
  }

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    if (a.priority === 'high' && b.priority !== 'high') return -1
    if (b.priority === 'high' && a.priority !== 'high') return 1
    return 0
  })

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent-yellow" />
          <h2 className="text-xl font-bold text-fg-high">Smart Recommendations</h2>
        </div>
        <div className="text-xs px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue">
          AI-Powered
        </div>
      </div>

      <div className="space-y-4">
        {sortedRecommendations.map((rec) => {
          const Icon = rec.icon
          const isApplied = appliedIds.has(rec.id)

          return (
            <div
              key={rec.id}
              className={`p-4 rounded-lg border transition-all ${
                priorityColors[rec.priority]
              } ${isApplied ? 'opacity-60' : 'hover:shadow-md'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  rec.priority === 'high' ? 'bg-accent-yellow/20' : 'bg-accent-blue/20'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    rec.priority === 'high' ? 'text-accent-yellow' : 'text-accent-blue'
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-fg-high">{rec.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      rec.priority === 'high' 
                        ? 'bg-accent-yellow/20 text-accent-yellow' 
                        : 'bg-accent-blue/20 text-accent-blue'
                    }`}>
                      {priorityLabels[rec.priority]}
                    </span>
                  </div>

                  <p className="text-sm text-fg-dim mb-2">{rec.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-accent-green">
                      💡 {rec.impact}
                    </div>

                    {isApplied ? (
                      <div className="flex items-center gap-1 text-xs text-accent-green">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Applied</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApply(rec.id)}
                        className="flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-purple transition-colors"
                      >
                        {rec.action || 'Apply'} <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-accent-blue hover:bg-accent-blue/10 rounded-lg transition-colors">
        View All Recommendations →
      </button>
    </Card>
  )
}

