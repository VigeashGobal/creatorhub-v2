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
  
  // Show only next 7 days
  const upcomingDays = dailyLogin.rewards.slice(
    Math.max(0, currentDay - 1), 
    Math.min(currentDay + 6, dailyLogin.rewards.length)
  )

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent-orange/10 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-accent-orange" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-fg-high">Daily Rewards</h3>
            <div className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-accent-orange" />
              <span className="text-xs text-fg-dim">{currentDay} day streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Claim button */}
      {canClaim && todayReward && (
        <button
          onClick={onClaimReward}
          className="w-full px-4 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm"
        >
          <DollarSign className="w-4 h-4" />
          Claim ${todayReward.dollarAmount}
        </button>
      )}

      {/* Upcoming rewards - Horizontal scroll */}
      <div className="space-y-2">
        <div className="text-xs text-fg-dim font-medium">Next 7 Days</div>
        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
          {upcomingDays.map((reward) => {
            const isCompleted = reward.claimed
            const isCurrent = reward.day === currentDay && canClaim
            const isLocked = reward.day > currentDay

            return (
              <div
                key={reward.day}
                className={`flex-shrink-0 w-16 h-20 rounded-lg border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                  isCompleted
                    ? 'bg-accent-green/10 border-accent-green/30'
                    : isCurrent
                    ? 'bg-accent-blue/10 border-accent-blue animate-pulse'
                    : isLocked
                    ? 'bg-bg-sunken border-edge-subtle opacity-50'
                    : 'bg-bg-soft border-edge-subtle'
                }`}
              >
                <div className="text-xs text-fg-dim font-medium">Day {reward.day}</div>
                
                {isCompleted ? (
                  <Check className="w-4 h-4 text-accent-green" />
                ) : (
                  <div className="text-sm font-bold text-accent-green">
                    ${reward.dollarAmount}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-2 border-t border-edge-subtle">
        <div>
          <div className="text-xs text-fg-dim">Total Earned</div>
          <div className="text-sm font-bold text-fg-high">
            ${dailyLogin.totalEarned.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-fg-dim">Next Milestone</div>
          <div className="text-sm font-bold text-accent-orange flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {currentDay < 7 ? '7' : currentDay < 30 ? '30' : '30+'} days
          </div>
        </div>
      </div>
    </div>
  )
}

