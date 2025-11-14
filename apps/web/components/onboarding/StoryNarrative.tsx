'use client'

import { useEffect, useState } from 'react'

interface StoryNarrativeProps {
  text: string
  delay?: number
  className?: string
}

export function StoryNarrative({ text, delay = 0, className = '' }: StoryNarrativeProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      <p className="text-lg md:text-xl text-fg-high leading-relaxed">
        {text}
      </p>
    </div>
  )
}

