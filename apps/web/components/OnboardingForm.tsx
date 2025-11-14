'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Youtube, Instagram, Music, ArrowRight, DollarSign, Coins, Sparkles, TrendingUp, Users, Award } from 'lucide-react'
import { loadGamificationState, addCoins, unlockAchievement, updateAchievementProgress, saveGamificationState } from '../lib/gamification'
import { calculateTotalProjection, getSocialProofStats, getTestimonials } from '../lib/revenueProjections'
import { CelebrationModal } from './gamification/CelebrationModal'
import { ProgressBar } from './gamification/ProgressBar'
import { VirtualCurrency } from './gamification/VirtualCurrency'
import { AchievementBadge } from './gamification/AchievementBadge'
import { loadAccessibilityPreferences } from '../lib/accessibility'

interface OnboardingFormProps {
  onComplete: (data: any) => void
}

const STEPS = [
  { id: 'name', label: 'Name & Email', value: 100, coins: 50 },
  { id: 'youtube', label: 'YouTube', value: 250, coins: 100 },
  { id: 'instagram', label: 'Instagram', value: 200, coins: 80 },
  { id: 'tiktok', label: 'TikTok', value: 200, coins: 80 },
  { id: 'complete', label: 'Complete', value: 500, coins: 200 },
]

export default function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    youtube: '',
    instagram: '',
    tiktok: ''
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coinsEarned, setCoinsEarned] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [projectedEarnings, setProjectedEarnings] = useState<number | null>(null)
  const [gamificationState, setGamificationState] = useState(loadGamificationState())
  const [accessibilityPrefs] = useState(loadAccessibilityPreferences())
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])

  const socialProof = getSocialProofStats()
  const testimonials = getTestimonials()

  const completedSteps = [
    formData.name && formData.email ? 1 : 0,
    formData.youtube ? 1 : 0,
    formData.instagram ? 1 : 0,
    formData.tiktok ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  const totalSteps = STEPS.length - 1
  const progress = (completedSteps / totalSteps) * 100
  const totalValueUnlocked = STEPS.slice(0, completedSteps + 1).reduce((sum, step) => sum + step.value, 0)

  // Calculate revenue projection
  useEffect(() => {
    const platforms = []
    if (formData.youtube) platforms.push({ platform: 'youtube' as const, followers: 100000 }) // Mock
    if (formData.instagram) platforms.push({ platform: 'instagram' as const, followers: 50000 }) // Mock
    if (formData.tiktok) platforms.push({ platform: 'tiktok' as const, followers: 75000 }) // Mock

    if (platforms.length > 0) {
      const projection = calculateTotalProjection(platforms)
      setProjectedEarnings(projection.totalMonthly)
    }
  }, [formData.youtube, formData.instagram, formData.tiktok])

  // Check for achievement unlocks
  useEffect(() => {
    setGamificationState(prevState => {
      let newState = { ...prevState }

      // First Steps achievement
      if (formData.name && formData.email && !unlockedAchievements.includes('first-steps')) {
        newState = unlockAchievement(newState, 'first-steps')
        setUnlockedAchievements([...unlockedAchievements, 'first-steps'])
        setCoinsEarned(c => c + 50)
      }

      // Platform Pioneer achievement
      const platformCount = [formData.youtube, formData.instagram, formData.tiktok].filter(Boolean).length
      if (platformCount >= 1 && !unlockedAchievements.includes('platform-pioneer')) {
        newState = unlockAchievement(newState, 'platform-pioneer')
        setUnlockedAchievements([...unlockedAchievements, 'platform-pioneer'])
        setCoinsEarned(c => c + 100)
      }

      // Multi-Platform Master achievement
      if (platformCount >= 3 && !unlockedAchievements.includes('multi-platform-master')) {
        newState = unlockAchievement(newState, 'multi-platform-master')
        setUnlockedAchievements([...unlockedAchievements, 'multi-platform-master'])
        setCoinsEarned(c => c + 200)
      }

      return newState
    })
  }, [formData, unlockedAchievements])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newFormData)

    // Award coins for completing fields
    if (e.target.value && !formData[e.target.name as keyof typeof formData]) {
      const step = STEPS.find(s => s.id === e.target.name)
      if (step) {
        const newState = addCoins(gamificationState, step.coins)
        setGamificationState(newState)
        setCoinsEarned(coinsEarned + step.coins)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/fetch-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const analyticsData = response.ok ? await response.json() : null

      // Final celebration
      setShowCelebration(true)
      
      // Award completion coins
      const finalState = addCoins(gamificationState, STEPS[STEPS.length - 1].coins)
      setGamificationState(finalState)
      setCoinsEarned(coinsEarned + STEPS[STEPS.length - 1].coins)

      setTimeout(() => {
        onComplete({
          ...formData,
          analytics: analyticsData
        })
      }, 2000)
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setShowCelebration(true)
      setTimeout(() => {
        onComplete({
          ...formData,
          analytics: null
        })
      }, 2000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStepValue = (stepIndex: number) => {
    return STEPS[stepIndex]?.value || 0
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg">
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-fg-high mb-2">Get Started</h2>
              <p className="text-fg-dim">Unlock your earning potential step by step</p>
            </div>
            <VirtualCurrency creatorCoins={gamificationState.creatorCoins} />
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <ProgressBar
              current={completedSteps}
              target={totalSteps}
              label={`Step ${completedSteps} of ${totalSteps}`}
              dollarValue={totalValueUnlocked}
              showMoney={true}
              size="lg"
            />
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-3 bg-bg-soft rounded-lg text-center">
              <Users className="w-5 h-5 text-accent-blue mx-auto mb-1" />
              <div className="text-lg font-bold text-fg-high">{socialProof.totalCreators.toLocaleString()}+</div>
              <div className="text-xs text-fg-dim">Creators</div>
            </div>
            <div className="p-3 bg-bg-soft rounded-lg text-center">
              <DollarSign className="w-5 h-5 text-accent-green mx-auto mb-1" />
              <div className="text-lg font-bold text-fg-high">${(socialProof.totalEarnings / 1000000).toFixed(1)}M+</div>
              <div className="text-xs text-fg-dim">Earned</div>
            </div>
            <div className="p-3 bg-bg-soft rounded-lg text-center">
              <TrendingUp className="w-5 h-5 text-accent-purple mx-auto mb-1" />
              <div className="text-lg font-bold text-fg-high">${socialProof.averageMonthly.toLocaleString()}</div>
              <div className="text-xs text-fg-dim">Avg/Month</div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-bg-soft border border-edge-subtle rounded-2xl p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-fg-high flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                {formData.name && (
                  <div className="flex items-center gap-1 text-xs text-accent-green">
                    <Coins className="w-3 h-3" />
                    <span>+{getStepValue(0) / 2} coins</span>
                  </div>
                )}
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg border border-edge-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue text-fg-high placeholder-fg-dim"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-fg-high flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                {formData.email && (
                  <div className="flex items-center gap-1 text-xs text-accent-green">
                    <Coins className="w-3 h-3" />
                    <span>+{getStepValue(0) / 2} coins</span>
                  </div>
                )}
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg border border-edge-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue text-fg-high placeholder-fg-dim"
                placeholder="Enter your email"
              />
            </div>

            {/* Platform Inputs */}
            {[
              { name: 'youtube', icon: Youtube, label: 'YouTube Handle', color: 'text-red-500', stepValue: getStepValue(1) },
              { name: 'instagram', icon: Instagram, label: 'Instagram Handle', color: 'text-pink-500', stepValue: getStepValue(2) },
              { name: 'tiktok', icon: Music, label: 'TikTok Handle', color: 'text-black', stepValue: getStepValue(3) },
            ].map(({ name, icon: Icon, label, color, stepValue }) => (
              <div key={name} className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-fg-high flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${color}`} />
                    {label}
                  </label>
                  {formData[name as keyof typeof formData] && (
                    <div className="flex items-center gap-1 text-xs text-accent-green">
                      <Coins className="w-3 h-3" />
                      <span>+{stepValue} coins</span>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  name={name}
                  value={formData[name as keyof typeof formData] as string}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg border border-edge-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue text-fg-high placeholder-fg-dim"
                  placeholder={`@yourhandle or channel name`}
                />
              </div>
            ))}

            {/* Revenue Projection */}
            {projectedEarnings && (
              <div className="p-4 bg-gradient-to-br from-accent-green/10 to-accent-blue/10 border border-accent-green/30 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-accent-green" />
                  <span className="text-sm font-semibold text-fg-high">Your Potential Earnings</span>
                </div>
                <div className="text-3xl font-bold text-accent-green mb-1">
                  ${projectedEarnings.toLocaleString()}/month
                </div>
                <div className="text-xs text-fg-dim">
                  Based on your platform sizes and industry benchmarks
                </div>
              </div>
            )}

            {/* Unlocked Achievements */}
            {unlockedAchievements.length > 0 && (
              <div className="p-4 bg-bg-sunken rounded-xl">
                <div className="text-sm font-semibold text-fg-high mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent-yellow" />
                  Achievements Unlocked!
                </div>
                <div className="flex gap-3">
                  {unlockedAchievements.map(achievementId => {
                    const achievement = gamificationState.achievements.find(a => a.id === achievementId)
                    return achievement ? (
                      <AchievementBadge key={achievementId} achievement={achievement} size="sm" />
                    ) : null
                  })}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-accent-blue to-accent-purple text-white py-4 px-6 rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent-blue disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all transform hover:scale-105"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Fetching Analytics...
                </>
              ) : (
                <>
                  Complete Setup & Unlock ${totalValueUnlocked.toLocaleString()} Potential
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Testimonials */}
            <div className="pt-6 border-t border-edge-subtle">
              <div className="text-xs text-fg-dim mb-3 text-center">Join thousands of successful creators</div>
              <div className="grid grid-cols-3 gap-3">
                {testimonials.slice(0, 3).map((testimonial, index) => (
                  <div key={index} className="p-3 bg-bg-sunken rounded-lg text-center">
                    <div className="text-xs font-semibold text-fg-high mb-1">{testimonial.name}</div>
                    <div className="text-xs text-accent-green font-bold mb-1">{testimonial.earnings}</div>
                    <div className="text-xs text-fg-dim line-clamp-2">{testimonial.quote}</div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebration && (
        <CelebrationModal
          isOpen={showCelebration}
          onClose={() => setShowCelebration(false)}
          title="Welcome to CreatorHub!"
          description={`You've unlocked $${totalValueUnlocked.toLocaleString()} in potential earnings!`}
          reward="Start earning today"
          dollarValue={totalValueUnlocked}
          xpValue={500}
          icon={<Sparkles className="w-12 h-12 text-white" />}
          accessibilityPrefs={accessibilityPrefs}
        />
      )}
    </div>
  )
}
