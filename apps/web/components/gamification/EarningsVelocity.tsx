'use client'

import { EarningsVelocity as EarningsVelocityType } from '../../types/gamification'
import { TrendingUp, TrendingDown, DollarSign, Zap } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface EarningsVelocityProps {
  velocity: EarningsVelocityType
  size?: 'sm' | 'md' | 'lg'
  showProjections?: boolean
  className?: string
}

export function EarningsVelocity({ 
  velocity, 
  size = 'md',
  showProjections = true,
  className = '' 
}: EarningsVelocityProps) {
  const valueRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (valueRef.current) {
      valueRef.current.style.animation = 'countUp 0.5s ease-out'
      setTimeout(() => {
        if (valueRef.current) {
          valueRef.current.style.animation = ''
        }
      }, 500)
    }
  }, [velocity.hourly])

  const getTrendIcon = () => {
    if (velocity.trend === 'up') return <TrendingUp className="w-5 h-5 text-accent-green" />
    if (velocity.trend === 'down') return <TrendingDown className="w-5 h-5 text-accent-pink" />
    return <Zap className="w-5 h-5 text-fg-dim" />
  }

  const getTrendColor = () => {
    if (velocity.trend === 'up') return 'text-accent-green'
    if (velocity.trend === 'down') return 'text-accent-pink'
    return 'text-fg-dim'
  }

  const sizeClasses = {
    sm: {
      container: 'p-3',
      icon: 'w-8 h-8',
      value: 'text-2xl',
      label: 'text-xs',
    },
    md: {
      container: 'p-4',
      icon: 'w-10 h-10',
      value: 'text-3xl',
      label: 'text-sm',
    },
    lg: {
      container: 'p-6',
      icon: 'w-12 h-12',
      value: 'text-4xl',
      label: 'text-base',
    },
  }

  const classes = sizeClasses[size]

  return (
    <div className={`${className}`}>
      {/* Main velocity display */}
      <div className={`bg-gradient-to-br from-accent-green/10 to-accent-blue/10 border border-accent-green/30 rounded-xl ${classes.container}`}>
        <div className="flex items-center gap-4">
          {/* Speedometer icon */}
          <div className={`${classes.icon} rounded-full bg-accent-green/20 flex items-center justify-center`}>
            <Zap className={`${classes.icon === 'w-12 h-12' ? 'w-6 h-6' : 'w-5 h-5'} text-accent-green`} />
          </div>

          {/* Value */}
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <DollarSign className={`${classes.icon === 'w-12 h-12' ? 'w-6 h-6' : 'w-5 h-5'} text-accent-green`} />
              <span 
                ref={valueRef}
                className={`${classes.value} font-bold text-fg-high`}
              >
                {velocity.hourly.toLocaleString()}
              </span>
              <span className={`${classes.label} text-fg-dim`}>/hour</span>
            </div>
            
            <div className={`flex items-center gap-1 mt-1 ${classes.label} ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="font-semibold">
                {velocity.trend === 'up' && 'Increasing'}
                {velocity.trend === 'down' && 'Decreasing'}
                {velocity.trend === 'stable' && 'Stable'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Projections */}
      {showProjections && (
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="p-3 bg-bg-soft rounded-lg">
            <div className="text-xs text-fg-dim mb-1">Daily</div>
            <div className="flex items-baseline gap-1">
              <DollarSign className="w-4 h-4 text-accent-blue" />
              <span className="text-lg font-bold text-fg-high">
                {velocity.daily.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3 bg-bg-soft rounded-lg">
            <div className="text-xs text-fg-dim mb-1">Monthly</div>
            <div className="flex items-baseline gap-1">
              <DollarSign className="w-4 h-4 text-accent-purple" />
              <span className="text-lg font-bold text-fg-high">
                {velocity.monthly.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Last updated */}
      <div className="text-xs text-fg-dim text-center mt-2">
        Updated {new Date(velocity.lastUpdated).toLocaleTimeString()}
      </div>
    </div>
  )
}

