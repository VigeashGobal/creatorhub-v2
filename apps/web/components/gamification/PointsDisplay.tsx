'use client'

import { UserLevel } from '../../types/gamification'

interface PointsDisplayProps {
  userLevel: UserLevel
  className?: string
  showTitle?: boolean
}

export function PointsDisplay({ userLevel, className = '', showTitle = true }: PointsDisplayProps) {
  const progressPercent = (userLevel.xp / userLevel.xpToNextLevel) * 100

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple border-2 border-edge-strong">
        <span className="text-xl font-bold text-fg-high">{userLevel.level}</span>
      </div>
      
      <div className="flex-1 min-w-0">
        {showTitle && (
          <div className="text-sm font-semibold text-fg-high">{userLevel.title}</div>
        )}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-2 bg-bg-sunken rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs text-fg-dim whitespace-nowrap">
            {userLevel.xp} / {userLevel.xpToNextLevel} XP
          </span>
        </div>
      </div>
    </div>
  )
}

