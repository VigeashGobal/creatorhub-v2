import { AccessibilityPreferences } from '../types/gamification'

const STORAGE_KEY = 'creatorhub-accessibility'

export function loadAccessibilityPreferences(): AccessibilityPreferences {
  if (typeof window === 'undefined') {
    return getDefaultPreferences()
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return getDefaultPreferences()
    }
    return JSON.parse(stored)
  } catch (error) {
    return getDefaultPreferences()
  }
}

export function saveAccessibilityPreferences(prefs: AccessibilityPreferences): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch (error) {
    console.error('Error saving accessibility preferences:', error)
  }
}

export function getDefaultPreferences(): AccessibilityPreferences {
  // Check system preferences
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return {
    reducedMotion: prefersReducedMotion,
    skipAnimations: false,
    highContrast: false,
    screenReaderMode: false,
  }
}

export function announceToScreenReader(message: string): void {
  if (typeof window === 'undefined') return

  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

export function shouldAnimate(prefs: AccessibilityPreferences): boolean {
  return !prefs.reducedMotion && !prefs.skipAnimations
}

