'use client'

import React, { useEffect, useRef } from 'react'
import { User, Coins, ArrowRight } from 'lucide-react'
import { StoryNarrative } from '../StoryNarrative'

interface NameStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
}

export function NameStep({ value, onChange, onNext }: NameStepProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Autofocus on mount
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.length > 0) {
      onNext()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.length > 0) {
      onNext()
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-8">
      {/* Character Avatar */}
      <div className="relative inline-block mx-auto">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
        {value && (
          <div className="absolute -top-2 -right-2 bg-accent-green rounded-full px-2 py-1 flex items-center gap-1 text-xs text-white font-semibold shadow-lg animate-bounce">
            <Coins className="w-3 h-3" />
            +50
          </div>
        )}
      </div>

      {/* Story */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-fg-high">
          First things first
        </h2>
        <StoryNarrative
          text="What should we call you?"
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
            placeholder="Enter your name"
            className="w-full px-6 py-4 bg-bg-soft border-2 border-edge-subtle rounded-2xl focus:outline-none focus:border-accent-blue text-fg-high placeholder-fg-dim text-lg text-center transition-all"
            autoComplete="given-name"
          />
        </div>

        {/* Continue Button */}
        {value.length > 0 && (
          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-full hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg animate-fadeIn"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* Helper Text */}
      <p className="text-center text-sm text-fg-dim">
        This helps us personalize your experience
      </p>
    </div>
  )
}

