'use client'

import React, { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'

interface OnboardingStepProps {
  children: ReactNode
  onBack?: () => void
  onSkip?: () => void
  currentStep: number
  totalSteps: number
  direction?: 'forward' | 'backward'
}

export function OnboardingStep({
  children,
  onBack,
  onSkip,
  currentStep,
  totalSteps,
  direction = 'forward'
}: OnboardingStepProps) {
  return (
    <div
      className={`min-h-screen w-full flex flex-col bg-bg relative overflow-hidden ${
        direction === 'forward' ? 'onboarding-step-enter' : 'onboarding-step-enter-back'
      }`}
    >
      {/* Progress Dots */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-sm border-b border-edge-subtle">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Back Button */}
          <div className="w-10">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-full hover:bg-bg-soft transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-fg-high" />
              </button>
            )}
          </div>

          {/* Progress Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? 'w-8 bg-accent-blue'
                    : idx < currentStep
                    ? 'w-2 bg-accent-green'
                    : 'w-2 bg-edge-subtle'
                }`}
              />
            ))}
          </div>

          {/* Skip Button */}
          <div className="w-10">
            {onSkip && (
              <button
                onClick={onSkip}
                className="text-sm text-fg-dim hover:text-fg-high transition-colors"
              >
                Skip
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 pt-24">
        {children}
      </div>
    </div>
  )
}

