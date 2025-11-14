'use client'

import { Youtube, Coins, ArrowRight, TrendingUp } from 'lucide-react'
import { StoryNarrative } from '../StoryNarrative'
import { useEffect, useRef } from 'react'

interface YouTubeStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
}

export function YouTubeStep({ value, onChange, onNext }: YouTubeStepProps) {
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
      {/* YouTube Icon */}
      <div className="relative inline-block mx-auto">
        <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
          <Youtube className="w-10 h-10 text-white" />
        </div>
        {value && (
          <div className="absolute -top-2 -right-2 bg-accent-green rounded-full px-2 py-1 flex items-center gap-1 text-xs text-white font-semibold shadow-lg animate-bounce">
            <Coins className="w-3 h-3" />
            +100
          </div>
        )}
      </div>

      {/* Story */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-fg-high">
          YouTube Creator?
        </h2>
        <StoryNarrative
          text="Let's unlock your earning potential on the world's largest video platform."
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
            placeholder="@yourchannel or channel name"
            className="w-full px-6 py-4 bg-bg-soft border-2 border-edge-subtle rounded-2xl focus:outline-none focus:border-red-500 text-fg-high placeholder-fg-dim text-lg text-center transition-all"
          />
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg"
        >
          {value ? 'Continue' : 'Skip'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      {/* Potential Earnings Preview */}
      {value && (
        <div className="p-4 bg-gradient-to-br from-red-500/10 to-accent-orange/10 border border-red-500/30 rounded-xl animate-fadeIn">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-accent-green" />
            <span className="text-sm font-semibold text-fg-high">Potential Monthly Earnings</span>
          </div>
          <div className="text-2xl font-bold text-accent-green">
            $1,200 - $5,000
          </div>
          <div className="text-xs text-fg-dim mt-1">
            Based on average CPM and engagement rates
          </div>
        </div>
      )}

      {/* Helper Text */}
      <p className="text-center text-sm text-fg-dim">
        {value ? 'We'll analyze your channel potential' : 'Optional - swipe to skip'}
      </p>
    </div>
  )
}

