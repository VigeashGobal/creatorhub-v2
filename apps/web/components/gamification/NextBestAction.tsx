'use client'

import { NextBestAction as NextBestActionType } from '../../types/gamification'
import { DollarSign, ArrowRight, Zap, Star } from 'lucide-react'

interface NextBestActionProps {
  actions: NextBestActionType[]
  onActionClick?: (action: NextBestActionType) => void
  maxDisplay?: number
  className?: string
}

export function NextBestAction({ 
  actions, 
  onActionClick, 
  maxDisplay = 3,
  className = '' 
}: NextBestActionProps) {
  const displayActions = actions.slice(0, maxDisplay)

  if (displayActions.length === 0) {
    return (
      <div className={`p-6 bg-bg-soft rounded-xl border border-edge-subtle ${className}`}>
        <div className="text-center">
          <Star className="w-12 h-12 text-fg-dim mx-auto mb-3" />
          <p className="text-fg-dim">No actions available right now</p>
          <p className="text-xs text-fg-dim mt-1">Check back later for new opportunities!</p>
        </div>
      </div>
    )
  }

  const topAction = displayActions[0]

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Featured top action */}
      <div className="p-6 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 border-2 border-accent-blue/30 rounded-xl relative overflow-hidden group cursor-pointer hover:border-accent-blue transition-all">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-accent-blue/20 border border-accent-blue/30 rounded-full text-xs font-semibold text-accent-blue mb-3">
            <Zap className="w-3 h-3" />
            HIGHEST VALUE
          </div>

          {/* Title & description */}
          <h3 className="text-xl font-bold text-fg-high mb-2">{topAction.title}</h3>
          <p className="text-sm text-fg-base mb-4">{topAction.description}</p>

          {/* Rewards */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <DollarSign className="w-5 h-5 text-accent-green" />
              <span className="text-2xl font-bold text-accent-green">
                ${topAction.dollarValue.toLocaleString()}
              </span>
            </div>
            
            {topAction.xpValue > 0 && (
              <>
                <div className="text-fg-dim">+</div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-accent-blue" />
                  <span className="text-xl font-bold text-accent-blue">
                    {topAction.xpValue} XP
                  </span>
                </div>
              </>
            )}
          </div>

          {/* CTA button */}
          <button
            onClick={() => onActionClick?.(topAction)}
            className="w-full px-4 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
          >
            Start Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Other actions */}
      {displayActions.slice(1).map((action, index) => (
        <div 
          key={index}
          className="p-4 bg-bg-soft border border-edge-subtle rounded-xl hover:bg-bg-sunken transition-colors cursor-pointer group"
          onClick={() => onActionClick?.(action)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-fg-high mb-1 group-hover:text-accent-blue transition-colors">
                {action.title}
              </h4>
              <p className="text-xs text-fg-dim">{action.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="flex items-center gap-1 text-accent-green font-bold">
                  <DollarSign className="w-4 h-4" />
                  <span>{action.dollarValue.toLocaleString()}</span>
                </div>
                {action.xpValue > 0 && (
                  <div className="text-xs text-fg-dim">+{action.xpValue} XP</div>
                )}
              </div>
              
              <ArrowRight className="w-5 h-5 text-fg-dim group-hover:text-accent-blue group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

