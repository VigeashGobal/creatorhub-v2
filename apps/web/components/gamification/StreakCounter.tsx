'use client'

import { Streak } from '../../types/gamification'
import { Flame, TrendingUp } from 'lucide-react'

interface StreakCounterProps {
  streak: Streak
  className?: string
  showMultiplier?: boolean
}

export function StreakCounter({ streak, className = '', showMultiplier = true }: StreakCounterProps) {
  const getStreakColor = () => {
    if (streak.current >= 30) return 'text-accent-pink'
    if (streak.current >= 14) return 'text-accent-orange'
    if (streak.current >= 7) return 'text-accent-yellow'
    return 'text-fg-dim'
  }

  const getStreakLabel = () => {
    switch (streak.type) {
      case 'login': return 'Day Streak'
      case 'revenue': return 'Revenue Streak'
      case 'posting': return 'Post Streak'
      case 'task': return 'Task Streak'
      default: return 'Streak'
    }
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-orange/10">
        <Flame className={`w-5 h-5 ${getStreakColor()}`} />
      </div>
      
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-fg-high">{streak.current}</span>
          <span className="text-sm text-fg-dim">{getStreakLabel()}</span>
        </div>
        
        {showMultiplier && streak.multiplier > 1 && (
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-accent-green" />
            <span className="text-xs text-accent-green font-semibold">
              {streak.multiplier.toFixed(1)}x multiplier
            </span>
          </div>
        )}
        
        {streak.longest > streak.current && (
          <div className="text-xs text-fg-dim mt-1">
            Best: {streak.longest}
          </div>
        )}
      </div>
    </div>
  )
}

