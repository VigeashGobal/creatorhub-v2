'use client'

import { DollarSign } from 'lucide-react'

interface ProgressBarProps {
  current: number
  target: number
  label?: string
  dollarValue?: number
  showPercentage?: boolean
  showMoney?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink'
  className?: string
}

export function ProgressBar({ 
  current, 
  target, 
  label,
  dollarValue,
  showPercentage = true,
  showMoney = true,
  size = 'md',
  color = 'blue',
  className = '' 
}: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100)
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  const colorClasses = {
    blue: 'from-accent-blue to-accent-purple',
    green: 'from-accent-green to-accent-blue',
    purple: 'from-accent-purple to-accent-pink',
    orange: 'from-accent-orange to-accent-yellow',
    pink: 'from-accent-pink to-accent-purple'
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Header */}
      {(label || showMoney) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-semibold text-fg-high">{label}</span>
          )}
          
          <div className="flex items-center gap-3">
            {showMoney && dollarValue && (
              <div className="flex items-center gap-1 text-xs font-semibold text-accent-green">
                <DollarSign className="w-3 h-3" />
                <span>{dollarValue.toLocaleString()}</span>
              </div>
            )}
            
            {showPercentage && (
              <span className="text-xs text-fg-dim">
                {percentage.toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative">
        <div className={`w-full bg-bg-sunken rounded-full overflow-hidden ${sizeClasses[size]}`}>
          <div 
            className={`h-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-700 ease-out relative overflow-hidden`}
            style={{ width: `${percentage}%` }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Milestone markers */}
        {percentage < 100 && (
          <div 
            className="absolute top-0 w-px h-full bg-fg-dim/30"
            style={{ left: '100%' }}
          />
        )}
      </div>

      {/* Footer with current/target */}
      <div className="flex items-center justify-between text-xs text-fg-dim">
        <span>{current.toLocaleString()} / {target.toLocaleString()}</span>
        {percentage >= 100 && (
          <span className="text-accent-green font-semibold">Complete!</span>
        )}
      </div>
    </div>
  )
}

