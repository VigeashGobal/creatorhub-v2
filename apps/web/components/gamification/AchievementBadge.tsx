'use client'

import { Achievement } from '../../types/gamification'
import { Lock, Sparkles, DollarSign } from 'lucide-react'

interface AchievementBadgeProps {
  achievement: Achievement
  onClick?: () => void
  showProgress?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AchievementBadge({ 
  achievement, 
  onClick, 
  showProgress = true,
  size = 'md',
  className = '' 
}: AchievementBadgeProps) {
  const sizeClasses = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-20 h-20 text-3xl',
    lg: 'w-24 h-24 text-4xl'
  }

  const progressPercent = achievement.target && achievement.progress 
    ? (achievement.progress / achievement.target) * 100 
    : 0

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {/* Badge Icon */}
      <div 
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          flex items-center justify-center
          ${achievement.unlocked 
            ? 'bg-gradient-to-br from-accent-blue to-accent-purple border-2 border-accent-blue' 
            : 'bg-bg-sunken border-2 border-edge-subtle'
          }
          transition-all duration-300
          group-hover:scale-110
          ${achievement.unlocked ? 'group-hover:shadow-lg group-hover:shadow-accent-blue/50' : ''}
        `}
      >
        {achievement.unlocked ? (
          <span className="filter drop-shadow-lg">{achievement.icon}</span>
        ) : (
          <Lock className="w-1/2 h-1/2 text-fg-dim" />
        )}
        
        {/* Sparkle overlay for unlocked achievements */}
        {achievement.unlocked && (
          <Sparkles 
            className="absolute top-0 right-0 w-4 h-4 text-accent-yellow animate-pulse" 
          />
        )}
      </div>

      {/* Progress bar for locked achievements */}
      {!achievement.unlocked && showProgress && achievement.target && progressPercent > 0 && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full px-2">
          <div className="h-1 bg-bg-sunken rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
        <div className="bg-bg-soft border border-edge-subtle rounded-lg p-3 shadow-xl min-w-[200px]">
          <div className="text-sm font-semibold text-fg-high mb-1">
            {achievement.title}
          </div>
          <div className="text-xs text-fg-dim mb-2">
            {achievement.description}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-accent-green">
            <DollarSign className="w-3 h-3" />
            {achievement.reward}
          </div>
          {!achievement.unlocked && achievement.target && achievement.progress !== undefined && (
            <div className="text-xs text-fg-dim mt-2">
              Progress: {achievement.progress} / {achievement.target}
            </div>
          )}
          {achievement.unlocked && achievement.unlockedAt && (
            <div className="text-xs text-fg-dim mt-2">
              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

