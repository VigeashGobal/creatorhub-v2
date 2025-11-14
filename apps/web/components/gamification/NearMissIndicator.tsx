'use client'

import { NearMissAlert } from '../../types/gamification'
import { AlertCircle, DollarSign, ArrowRight, X } from 'lucide-react'

interface NearMissIndicatorProps {
  alerts: NearMissAlert[]
  onDismiss?: (alert: NearMissAlert) => void
  onAction?: (alert: NearMissAlert) => void
  maxDisplay?: number
  className?: string
}

export function NearMissIndicator({ 
  alerts, 
  onDismiss, 
  onAction, 
  maxDisplay = 5,
  className = '' 
}: NearMissIndicatorProps) {
  const displayAlerts = alerts.slice(0, maxDisplay)

  if (displayAlerts.length === 0) {
    return null
  }

  const getAlertColor = (type: NearMissAlert['type']) => {
    switch (type) {
      case 'milestone':
        return {
          bg: 'bg-accent-purple/10',
          border: 'border-accent-purple/30',
          text: 'text-accent-purple',
          icon: 'text-accent-purple',
        }
      case 'achievement':
        return {
          bg: 'bg-accent-yellow/10',
          border: 'border-accent-yellow/30',
          text: 'text-accent-yellow',
          icon: 'text-accent-yellow',
        }
      case 'level':
        return {
          bg: 'bg-accent-blue/10',
          border: 'border-accent-blue/30',
          text: 'text-accent-blue',
          icon: 'text-accent-blue',
        }
      case 'streak':
        return {
          bg: 'bg-accent-orange/10',
          border: 'border-accent-orange/30',
          text: 'text-accent-orange',
          icon: 'text-accent-orange',
        }
      case 'opportunity':
        return {
          bg: 'bg-accent-green/10',
          border: 'border-accent-green/30',
          text: 'text-accent-green',
          icon: 'text-accent-green',
        }
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {displayAlerts.map((alert, index) => {
        const colors = getAlertColor(alert.type)
        
        return (
          <div 
            key={index}
            className={`
              p-4 rounded-xl border transition-all
              ${colors.bg} ${colors.border}
              animate-slideInRight
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0">
                <AlertCircle className={`w-5 h-5 ${colors.icon}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className={`text-sm font-semibold ${colors.text}`}>
                    {alert.message}
                  </p>
                  
                  {onDismiss && (
                    <button
                      onClick={() => onDismiss(alert)}
                      className="flex-shrink-0 p-1 hover:bg-bg-sunken rounded transition-colors"
                      aria-label="Dismiss"
                    >
                      <X className="w-4 h-4 text-fg-dim" />
                    </button>
                  )}
                </div>

                {/* Dollar value */}
                {alert.dollarValue && (
                  <div className="flex items-center gap-1 text-accent-green text-xs font-semibold mb-2">
                    <DollarSign className="w-3 h-3" />
                    <span>{alert.dollarValue.toLocaleString()} potential</span>
                  </div>
                )}

                {/* Progress bar */}
                {alert.remaining > 0 && (
                  <div className="mb-2">
                    <div className="h-1 bg-bg-sunken rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-500`}
                        style={{ width: '80%' }}
                      />
                    </div>
                    <div className="text-xs text-fg-dim mt-1">
                      {alert.remaining} remaining
                    </div>
                  </div>
                )}

                {/* CTA button */}
                {onAction && (
                  <button
                    onClick={() => onAction(alert)}
                    className={`
                      inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold
                      ${colors.bg} ${colors.text}
                      hover:opacity-80 transition-opacity
                    `}
                  >
                    {alert.ctaText}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

