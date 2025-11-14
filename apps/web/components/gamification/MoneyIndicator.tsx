'use client'

import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { formatCompactNumber } from '../../lib/formatNumber'
import { useMobilePreview } from '../MobilePreview'

interface MoneyIndicatorProps {
  amount: number
  label?: string
  trend?: 'up' | 'down' | 'neutral'
  trendPercent?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  className?: string
}

export function MoneyIndicator({ 
  amount, 
  label, 
  trend = 'neutral',
  trendPercent,
  size = 'md',
  animated = true,
  className = '' 
}: MoneyIndicatorProps) {
  const { isMobileView } = useMobilePreview()
  const valueRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (animated && valueRef.current) {
      valueRef.current.style.animation = 'countUp 0.5s ease-out'
      setTimeout(() => {
        if (valueRef.current) {
          valueRef.current.style.animation = ''
        }
      }, 500)
    }
  }, [amount, animated])

  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl md:text-5xl',
    xl: 'text-5xl md:text-6xl'
  }

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-accent-green" />
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-accent-pink" />
    return null
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-accent-green'
    if (trend === 'down') return 'text-accent-pink'
    return 'text-fg-dim'
  }

  // Format number based on view mode
  const formattedAmount = isMobileView ? formatCompactNumber(amount, 1) : amount.toLocaleString()

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-baseline gap-2">
        <DollarSign className={`${size === 'xl' ? 'w-8 h-8' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} text-accent-green`} />
        <span 
          ref={valueRef}
          className={`${sizeClasses[size]} font-bold text-fg-high`}
        >
          {formattedAmount}
        </span>
        {trendPercent && (
          <span className={`text-sm font-semibold ${getTrendColor()} flex items-center gap-1`}>
            {getTrendIcon()}
            {trend === 'up' ? '+' : ''}{trendPercent}%
          </span>
        )}
      </div>
      
      {label && (
        <span className="text-sm text-fg-dim mt-1">{label}</span>
      )}
    </div>
  )
}

