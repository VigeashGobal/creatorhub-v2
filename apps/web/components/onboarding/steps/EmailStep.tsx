'use client'

import { Mail, Coins, ArrowRight, Lock } from 'lucide-react'
import { StoryNarrative } from '../StoryNarrative'
import { useEffect, useRef } from 'react'

interface EmailStepProps {
  value: string
  name: string
  onChange: (value: string) => void
  onNext: () => void
}

export function EmailStep({ value, name, onChange, onNext }: EmailStepProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const isValidEmail = value.includes('@') && value.includes('.')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidEmail) {
      onNext()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValidEmail) {
      onNext()
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-8">
      {/* Email Icon */}
      <div className="relative inline-block mx-auto">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center">
          <Mail className="w-10 h-10 text-white" />
        </div>
        {isValidEmail && (
          <div className="absolute -top-2 -right-2 bg-accent-green rounded-full px-2 py-1 flex items-center gap-1 text-xs text-white font-semibold shadow-lg animate-bounce">
            <Coins className="w-3 h-3" />
            +50
          </div>
        )}
      </div>

      {/* Story with Personalization */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-fg-high">
          Great to meet you{name ? `, ${name}` : ''}!
        </h2>
        <StoryNarrative
          text="Where should we send your earnings insights?"
          delay={200}
          className="text-fg-dim text-center"
        />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            ref={inputRef}
            type="email"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="your.email@example.com"
            className="w-full px-6 py-4 bg-bg-soft border-2 border-edge-subtle rounded-2xl focus:outline-none focus:border-accent-purple text-fg-high placeholder-fg-dim text-lg text-center transition-all"
            autoComplete="email"
          />
        </div>

        {/* Continue Button */}
        {isValidEmail && (
          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-accent-purple to-accent-pink text-white font-semibold rounded-full hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg animate-fadeIn"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-fg-dim">
        <Lock className="w-4 h-4" />
        <span>We'll never spam you</span>
      </div>
    </div>
  )
}

