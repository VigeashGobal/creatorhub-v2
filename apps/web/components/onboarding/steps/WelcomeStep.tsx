'use client'

import { Sparkles, Users, DollarSign, TrendingUp, ArrowRight } from 'lucide-react'
import { StoryNarrative } from '../StoryNarrative'
import { getSocialProofStats } from '../../../lib/revenueProjections'

interface WelcomeStepProps {
  onNext: () => void
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  const socialProof = getSocialProofStats()

  return (
    <div className="w-full max-w-lg mx-auto text-center space-y-8">
      {/* Animated Coin Icon */}
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-accent-yellow/20 rounded-full blur-2xl animate-pulse" />
        <div className="relative bg-gradient-to-br from-accent-yellow to-accent-orange p-6 rounded-full">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
      </div>

      {/* Hero Text */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-fg-high">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">SocialPulse</span>
        </h1>
        
        <StoryNarrative
          text="Let's discover how much you could be earning from your content. This will only take 2 minutes."
          delay={300}
          className="text-fg-dim"
        />
      </div>

      {/* Social Proof Stats */}
      <div className="grid grid-cols-3 gap-4 py-6">
        <div className="space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-accent-blue/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-accent-blue" />
          </div>
          <div className="text-2xl font-bold text-fg-high">
            {(socialProof.totalCreators / 1000).toFixed(0)}K+
          </div>
          <div className="text-xs text-fg-dim">Creators</div>
        </div>

        <div className="space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-accent-green/10 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-accent-green" />
          </div>
          <div className="text-2xl font-bold text-fg-high">
            ${(socialProof.totalEarnings / 1000000).toFixed(1)}M+
          </div>
          <div className="text-xs text-fg-dim">Earned</div>
        </div>

        <div className="space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-accent-purple/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-accent-purple" />
          </div>
          <div className="text-2xl font-bold text-fg-high">
            ${(socialProof.averageMonthly / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-fg-dim">Avg/Month</div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onNext}
        className="w-full max-w-sm mx-auto px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-full hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg"
      >
        Let's Begin
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Trust Badge */}
      <p className="text-xs text-fg-dim">
        🔒 Your data is secure and private
      </p>
    </div>
  )
}

