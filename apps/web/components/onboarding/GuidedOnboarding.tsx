'use client'

import React, { useState, useEffect, useCallback, TouchEvent as ReactTouchEvent } from 'react'
import { OnboardingStep } from './OnboardingStep'
import { WelcomeStep } from './steps/WelcomeStep'
import { NameStep } from './steps/NameStep'
import { EmailStep } from './steps/EmailStep'
import { YouTubeStep } from './steps/YouTubeStep'
import { InstagramStep } from './steps/InstagramStep'
import { TikTokStep } from './steps/TikTokStep'
import { CompletionStep } from './steps/CompletionStep'
import { loadGamificationState, addCoins, saveGamificationState } from '../../lib/gamification'
import { VirtualCurrency } from '../gamification/VirtualCurrency'

interface GuidedOnboardingProps {
  onComplete: (data: any) => void
}

interface FormData {
  name: string
  email: string
  youtube: string
  instagram: string
  tiktok: string
}

const TOTAL_STEPS = 7

export default function GuidedOnboarding({ onComplete }: GuidedOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    youtube: '',
    instagram: '',
    tiktok: ''
  })
  const [gamificationState, setGamificationState] = useState(loadGamificationState())
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Swipe gesture handlers
  const handleTouchStart = (e: ReactTouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: ReactTouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && canGoNext()) {
      goToNextStep()
    }
    
    if (isRightSwipe && currentStep > 0) {
      goToPreviousStep()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'ArrowRight' && canGoNext()) {
        goToNextStep()
      } else if (e.key === 'ArrowLeft' && currentStep > 0) {
        goToPreviousStep()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, formData])

  const canGoNext = (): boolean => {
    switch (currentStep) {
      case 0: return true // Welcome
      case 1: return formData.name.length > 0
      case 2: return formData.email.length > 0 && formData.email.includes('@')
      case 3: return true // YouTube (optional)
      case 4: return true // Instagram (optional)
      case 5: return true // TikTok (optional)
      case 6: return false // Completion (can't go forward)
      default: return false
    }
  }

  const goToNextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS - 1) {
      setDirection('forward')
      setCurrentStep(currentStep + 1)
    }
  }, [currentStep])

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setDirection('backward')
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep])

  const handleFieldUpdate = (field: keyof FormData, value: string, coins: number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Award coins if this is the first time filling the field
    if (!formData[field] && value) {
      const newState = addCoins(gamificationState, coins)
      setGamificationState(newState)
      saveGamificationState(newState)
    }
  }

  const handleSkip = () => {
    goToNextStep()
  }

  const handleComplete = async () => {
    // Fetch analytics and complete onboarding
    try {
      const response = await fetch('/api/fetch-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const analyticsData = response.ok ? await response.json() : null

      // Award completion coins
      const finalState = addCoins(gamificationState, 200)
      setGamificationState(finalState)
      saveGamificationState(finalState)

      setTimeout(() => {
        onComplete({
          ...formData,
          analytics: analyticsData
        })
      }, 2000)
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setTimeout(() => {
        onComplete({
          ...formData,
          analytics: null
        })
      }, 2000)
    }
  }

  const renderStep = () => {
    const stepProps = {
      onBack: currentStep > 0 ? goToPreviousStep : undefined,
      onSkip: currentStep >= 3 && currentStep <= 5 ? handleSkip : undefined,
      currentStep,
      totalSteps: TOTAL_STEPS,
      direction
    }

    switch (currentStep) {
      case 0:
        return (
          <OnboardingStep {...stepProps} onBack={undefined}>
            <WelcomeStep onNext={goToNextStep} />
          </OnboardingStep>
        )
      case 1:
        return (
          <OnboardingStep {...stepProps}>
            <NameStep
              value={formData.name}
              onChange={(value) => handleFieldUpdate('name', value, 50)}
              onNext={goToNextStep}
            />
          </OnboardingStep>
        )
      case 2:
        return (
          <OnboardingStep {...stepProps}>
            <EmailStep
              value={formData.email}
              name={formData.name}
              onChange={(value) => handleFieldUpdate('email', value, 50)}
              onNext={goToNextStep}
            />
          </OnboardingStep>
        )
      case 3:
        return (
          <OnboardingStep {...stepProps}>
            <YouTubeStep
              value={formData.youtube}
              onChange={(value) => handleFieldUpdate('youtube', value, 100)}
              onNext={goToNextStep}
            />
          </OnboardingStep>
        )
      case 4:
        return (
          <OnboardingStep {...stepProps}>
            <InstagramStep
              value={formData.instagram}
              onChange={(value) => handleFieldUpdate('instagram', value, 80)}
              onNext={goToNextStep}
            />
          </OnboardingStep>
        )
      case 5:
        return (
          <OnboardingStep {...stepProps}>
            <TikTokStep
              value={formData.tiktok}
              onChange={(value) => handleFieldUpdate('tiktok', value, 80)}
              onNext={goToNextStep}
            />
          </OnboardingStep>
        )
      case 6:
        return (
          <OnboardingStep {...stepProps} onSkip={undefined}>
            <CompletionStep
              formData={formData}
              totalCoins={gamificationState.creatorCoins}
              onComplete={handleComplete}
            />
          </OnboardingStep>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Coin Counter - Fixed top-right */}
      <div className="fixed top-4 right-4 z-50">
        <VirtualCurrency creatorCoins={gamificationState.creatorCoins} />
      </div>

      {/* Current Step */}
      {renderStep()}
    </div>
  )
}

