'use client'

import { DailyLoginState } from '../../types/gamification'
import { Calendar, Flame, DollarSign, Check } from 'lucide-react'

interface DailyLoginCalendarProps {
  dailyLogin: DailyLoginState
  onClaimReward: () => void
  canClaim: boolean
  className?: string
}

export function DailyLoginCalendar({ 
  dailyLogin, 
  onClaimReward, 
  canClaim,
  className = '' 
}: DailyLoginCalendarProps) {
  const displayDays = dailyLogin.rewards.slice(0, 30)
  const currentDay = dailyLogin.currentStreak

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-orange/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-accent-orange" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-fg-high">Daily Login Rewards</h3>
            <p className="text-xs text-fg-dim">Claim your daily reward to keep your streak!</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-accent-orange" />
          <span className="text-2xl font-bold text-fg-high">{currentDay}</span>
          <span className="text-sm text-fg-dim">day streak</span>
        </div>
      </div>

      {/* Claim button */}
      {canClaim && (
        <button
          onClick={onClaimReward}
          className="w-full px-4 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <DollarSign className="w-5 h-5" />
          Claim Today&apos;s Reward: ${displayDays[currentDay]?.dollarAmount || 50}
        </button>
      )}

      {/* Calendar grid */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {displayDays.map((reward) => {
          const isCompleted = reward.claimed
          const isCurrent = reward.day === currentDay && canClaim
          const isLocked = reward.day > currentDay

          return (
            <div 
              key={reward.day}
              className={`
                relative aspect-square rounded-lg p-2 flex flex-col items-center justify-center
                transition-all duration-200
                ${isCompleted 
                  ? 'bg-accent-green/20 border-2 border-accent-green' 
                  : isCurrent
                  ? 'bg-accent-blue/20 border-2 border-accent-blue animate-pulse'
                  : isLocked
                  ? 'bg-bg-sunken border border-edge-subtle opacity-50'
                  : 'bg-bg-soft border border-edge-subtle'
                }
              `}
            >
              {/* Day number */}
              <div className={`text-xs font-semibold ${isCompleted ? 'text-accent-green' : isCurrent ? 'text-accent-blue' : 'text-fg-dim'}`}>
                Day {reward.day}
              </div>
              
              {/* Dollar amount */}
              <div className={`text-sm font-bold mt-1 ${isCompleted ? 'text-accent-green' : isCurrent ? 'text-accent-blue' : 'text-fg-high'}`}>
                ${reward.dollarAmount}
              </div>

              {/* Check mark for completed */}
              {isCompleted && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent-green flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}

              {/* Special milestone days */}
              {[7, 14, 21, 30].includes(reward.day) && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-2 rounded-full bg-accent-yellow" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-bg-soft rounded-lg">
          <div className="text-xs text-fg-dim mb-1">Total Earned</div>
          <div className="flex items-baseline gap-1">
            <DollarSign className="w-4 h-4 text-accent-green" />
            <span className="text-xl font-bold text-fg-high">{dailyLogin.totalEarned.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="p-3 bg-bg-soft rounded-lg">
          <div className="text-xs text-fg-dim mb-1">Next Milestone</div>
          <div className="flex items-baseline gap-1">
            <Flame className="w-4 h-4 text-accent-orange" />
            <span className="text-xl font-bold text-fg-high">
              {[7, 14, 21, 30].find(m => m > currentDay) || 30}
            </span>
            <span className="text-xs text-fg-dim">days</span>
          </div>
        </div>
      </div>
    </div>
  )
}

