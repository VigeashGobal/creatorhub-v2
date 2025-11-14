'use client'

import { useEffect } from 'react'
import { X, Trophy, DollarSign, Sparkles } from 'lucide-react'
import { AccessibilityPreferences } from '../../types/gamification'
import { triggerConfetti } from '../../lib/animations'

interface CelebrationModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  reward?: string
  dollarValue?: number
  xpValue?: number
  icon?: React.ReactNode
  accessibilityPrefs?: AccessibilityPreferences
}

export function CelebrationModal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  reward,
  dollarValue,
  xpValue,
  icon,
  accessibilityPrefs 
}: CelebrationModalProps) {
  useEffect(() => {
    if (isOpen && accessibilityPrefs) {
      triggerConfetti(accessibilityPrefs)
    }
  }, [isOpen, accessibilityPrefs])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-bg-soft border border-edge-strong rounded-2xl shadow-2xl animate-slideInUp">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-bg-sunken transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-fg-dim" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center relative animate-float">
              {icon || <Trophy className="w-12 h-12 text-white" />}
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent-yellow animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-fg-high mb-3 animate-slideInUp">
            {title}
          </h2>

          {/* Description */}
          <p className="text-fg-base mb-6 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            {description}
          </p>

          {/* Rewards */}
          <div className="space-y-3 mb-6">
            {reward && (
              <div className="p-4 bg-accent-green/10 border border-accent-green/20 rounded-xl animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                <div className="text-sm text-fg-dim mb-1">Reward</div>
                <div className="text-lg font-semibold text-accent-green">{reward}</div>
              </div>
            )}

            {(dollarValue || xpValue) && (
              <div className="grid grid-cols-2 gap-3">
                {dollarValue && (
                  <div className="p-4 bg-bg-sunken rounded-xl animate-slideInUp" style={{ animationDelay: '0.3s' }}>
                    <DollarSign className="w-5 h-5 text-accent-green mx-auto mb-2" />
                    <div className="text-2xl font-bold text-fg-high">
                      ${dollarValue.toLocaleString()}
                    </div>
                    <div className="text-xs text-fg-dim">Earned</div>
                  </div>
                )}
                
                {xpValue && (
                  <div className="p-4 bg-bg-sunken rounded-xl animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                    <Sparkles className="w-5 h-5 text-accent-blue mx-auto mb-2" />
                    <div className="text-2xl font-bold text-fg-high">
                      +{xpValue}
                    </div>
                    <div className="text-xs text-fg-dim">XP</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

