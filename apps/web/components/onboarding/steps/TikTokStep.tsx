'use client'

import React, { useEffect, useRef } from 'react'
import { Music, Coins, ArrowRight, TrendingUp, Zap } from 'lucide-react'
import { StoryNarrative } from '../StoryNarrative'

interface TikTokStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
}

export function TikTokStep({ value, onChange, onNext }: TikTokStepProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onNext()
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-8">
      {/* TikTok Icon */}
      <div className="relative inline-block mx-auto">
        <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center shadow-lg border-2 border-cyan-400">
          <Music className="w-10 h-10 text-cyan-400" />
        </div>
        {value && (
          <div className="absolute -top-2 -right-2 bg-accent-green rounded-full px-2 py-1 flex items-center gap-1 text-xs text-white font-semibold shadow-lg animate-bounce">
            <Coins className="w-3 h-3" />
            +80
          </div>
        )}
      </div>

      {/* Story */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-fg-high">
          Last one! TikTok?
        </h2>
        <StoryNarrative
          text="Let's see what you could earn from the fastest-growing platform for creators."
          delay={200}
          className="text-fg-dim text-center"
        />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="@yourhandle"
            className="w-full px-6 py-4 bg-bg-soft border-2 border-edge-subtle rounded-2xl focus:outline-none focus:border-cyan-400 text-fg-high placeholder-fg-dim text-lg text-center transition-all"
          />
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="w-full px-8 py-4 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-semibold rounded-full hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg"
        >
          {value ? 'Continue' : 'Skip'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      {/* Viral Potential */}
      {value && (
        <div className="p-4 bg-gradient-to-br from-cyan-400/10 to-pink-500/10 border border-cyan-400/30 rounded-xl animate-fadeIn">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-accent-yellow" />
            <span className="text-sm font-semibold text-fg-high">Viral Potential</span>
          </div>
          <div className="text-2xl font-bold text-accent-green">
            $600 - $4,000
          </div>
          <div className="text-xs text-fg-dim mt-1">
            Creator fund + brand partnerships + live gifts
          </div>
        </div>
      )}

      {/* Helper Text */}
      <p className="text-center text-sm text-fg-dim">
        {value ? 'Almost done! One more step...' : 'Optional - swipe to skip'}
      </p>
    </div>
  )
}

