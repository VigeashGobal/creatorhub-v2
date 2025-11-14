'use client'

import { useEffect } from 'react'
import { Trophy, Sparkles, TrendingUp } from 'lucide-react'
import { AccessibilityPreferences } from '../../types/gamification'
import { triggerConfetti } from '../../lib/animations'

interface LevelUpAnimationProps {
  newLevel: number
  title: string
  isVisible: boolean
  onComplete: () => void
  accessibilityPrefs?: AccessibilityPreferences
}

export function LevelUpAnimation({ 
  newLevel, 
  title, 
  isVisible, 
  onComplete,
  accessibilityPrefs 
}: LevelUpAnimationProps) {
  useEffect(() => {
    if (isVisible) {
      if (accessibilityPrefs) {
        triggerConfetti(accessibilityPrefs)
      }
      
      const timer = setTimeout(() => {
        onComplete()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onComplete, accessibilityPrefs])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-none">
      <div className="text-center animate-slideInUp">
        {/* Level badge */}
        <div className="relative mb-6">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink flex items-center justify-center animate-float border-4 border-white/20">
            <div className="text-5xl font-bold text-white">{newLevel}</div>
          </div>
          
          {/* Sparkles around badge */}
          <Sparkles className="absolute top-0 right-1/4 w-8 h-8 text-accent-yellow animate-pulse" style={{ animationDelay: '0s' }} />
          <Sparkles className="absolute top-1/4 right-0 w-6 h-6 text-accent-yellow animate-pulse" style={{ animationDelay: '0.2s' }} />
          <Sparkles className="absolute bottom-1/4 left-0 w-6 h-6 text-accent-yellow animate-pulse" style={{ animationDelay: '0.4s' }} />
          <Sparkles className="absolute bottom-0 left-1/4 w-8 h-8 text-accent-yellow animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>

        {/* Level up text */}
        <div className="space-y-2 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent-green" />
            <h2 className="text-4xl font-bold text-white">Level Up!</h2>
            <TrendingUp className="w-6 h-6 text-accent-green" />
          </div>
          
          <p className="text-xl text-white/90">
            You&apos;re now a <span className="font-semibold text-accent-blue">{title}</span>
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <Trophy className="w-5 h-5 text-accent-yellow" />
            <p className="text-lg text-white/80">
              New abilities unlocked!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

