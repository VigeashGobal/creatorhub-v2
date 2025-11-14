'use client'

import { DailyLoginState } from '../../types/gamification'
import { Calendar, Flame, DollarSign, Check, ChevronRight } from 'lucide-react'

interface DailyLoginCalendarMobileProps {
  dailyLogin: DailyLoginState
  onClaimReward: () => void
  canClaim: boolean
  className?: string
}

export function DailyLoginCalendarMobile({ 
  dailyLogin, 
  onClaimReward, 
  canClaim,
  className = '' 
}: DailyLoginCalendarMobileProps) {
  const currentDay = dailyLogin.currentStreak
  const todayReward = dailyLogin.rewards[Math.min(currentDay - 1, dailyLogin.rewards.length - 1)]
  const nextReward = dailyLogin.rewards[Math.min(currentDay, dailyLogin.rewards.length - 1)]
  
  // Show only current week (7 days from current)
  const upcomingDays = dailyLogin.rewards.slice(
    Math.max(0, currentDay - 1), 
    Math.min(currentDay + 6, dailyLogin.rewards.length)
  )

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Header with streak */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent-orange" />
          <h3 className="text-sm font-semibold text-fg-high">Daily Login Rewards</h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-fg-dim">
          <Flame className="w-3 h-3 text-accent-orange" />
          <span className="font-semibold text-accent-orange">{currentDay}</span> day streak
        </div>
      </div>

      {/* Claim button - compact */}
      {canClaim && todayReward && (
        <button
          onClick={onClaimReward}
          className="w-full px-3 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-xs"
        >
          <DollarSign className="w-3 h-3" />
          Claim ${todayReward.dollarAmount}
        </button>
      )}

      {/* Week view - Horizontal scroll */}
      <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
        {upcomingDays.map((reward) => {
          const isCompleted = reward.claimed
          const isCurrent = reward.day === currentDay && canClaim
          const isLocked = reward.day > currentDay

          return (
            <div
              key={reward.day}
              className={`flex-shrink-0 w-12 h-16 rounded-lg border flex flex-col items-center justify-center gap-0.5 transition-all ${
                isCompleted
                  ? 'bg-accent-green/10 border-accent-green/30'
                  : isCurrent
                  ? 'bg-accent-blue/10 border-accent-blue'
                  : isLocked
                  ? 'bg-bg-sunken border-edge-subtle opacity-40'
                  : 'bg-bg-soft border-edge-subtle'
              }`}
            >
              <div className="text-[10px] text-fg-dim font-medium">D{reward.day}</div>
              
              {isCompleted ? (
                <Check className="w-3 h-3 text-accent-green" />
              ) : (
                <div className="text-xs font-bold text-accent-green">
                  ${reward.dollarAmount}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Compact stats */}
      <div className="flex items-center justify-between text-xs pt-1">
        <div className="flex items-center gap-1">
          <span className="text-fg-dim">Total:</span>
          <span className="font-bold text-fg-high">${dailyLogin.totalEarned}</span>
        </div>
        <div className="flex items-center gap-1 text-accent-orange">
          <Flame className="w-2.5 h-2.5" />
          <span className="font-semibold">{currentDay < 7 ? '7' : '30'} days</span>
        </div>
      </div>
    </div>
  )
}

