'use client'

import React from 'react'
import { Instagram, Coins, ArrowRight, TrendingUp } from 'lucide-react'
import { StoryNarrative } from '../StoryNarrative'

interface InstagramStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
}

export function InstagramStep({ value, onChange, onNext }: InstagramStepProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onNext()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onNext()
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-8">
      <div className="relative inline-block mx-auto">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
          <Instagram className="w-10 h-10 text-white" />
        </div>
        {value && (
          <div className="absolute -top-2 -right-2 bg-accent-green rounded-full px-2 py-1 flex items-center gap-1 text-xs text-white font-semibold shadow-lg animate-bounce">
            <Coins className="w-3 h-3" />
            +80
          </div>
        )}
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-fg-high">
          How about Instagram?
        </h2>
        <StoryNarrative
          text="Share your handle and we'll analyze your opportunities for brand deals and sponsorships."
          delay={200}
          className="text-fg-dim text-center"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="@yourhandle"
            className="w-full px-6 py-4 bg-bg-soft border-2 border-edge-subtle rounded-2xl focus:outline-none focus:border-pink-500 text-fg-high placeholder-fg-dim text-lg text-center transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold rounded-full hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg"
        >
          {value ? 'Continue' : 'Skip'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      {value && (
        <div className="p-4 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl animate-fadeIn">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-accent-green" />
            <span className="text-sm font-semibold text-fg-high">Sponsorship Potential</span>
          </div>
          <div className="text-2xl font-bold text-accent-green">
            $800 - $3,500
          </div>
          <div className="text-xs text-fg-dim mt-1">
            Average per sponsored post based on engagement
          </div>
        </div>
      )}

      <p className="text-center text-sm text-fg-dim">
        {value ? 'We will check your engagement and reach' : 'Optional - swipe to skip'}
      </p>
    </div>
  )
}

