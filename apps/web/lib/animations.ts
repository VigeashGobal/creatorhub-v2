import { AccessibilityPreferences } from '../types/gamification'
import { shouldAnimate } from './accessibility'

export interface AnimationConfig {
  duration?: number
  delay?: number
  easing?: string
}

// Confetti animation
export function triggerConfetti(prefs: AccessibilityPreferences): void {
  if (!shouldAnimate(prefs)) return

  // Use canvas-confetti if available, otherwise skip
  if (typeof window !== 'undefined' && (window as any).confetti) {
    const confetti = (window as any).confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }
}

// Money counter animation
export function animateCounter(
  element: HTMLElement | null,
  start: number,
  end: number,
  duration: number = 1000,
  prefs: AccessibilityPreferences
): void {
  if (!element) return
  
  if (!shouldAnimate(prefs)) {
    element.textContent = formatCurrency(end)
    return
  }

  const startTime = Date.now()
  const range = end - start

  function update() {
    const now = Date.now()
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function (ease-out)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = start + range * eased

    if (element) {
      element.textContent = formatCurrency(Math.floor(current))
    }

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

export function formatCurrency(value: number): string {
  return `$${value.toLocaleString()}`
}

// Sparkle effect for achievements
export function addSparkles(element: HTMLElement | null, prefs: AccessibilityPreferences): void {
  if (!element || !shouldAnimate(prefs)) return

  const sparkle = document.createElement('div')
  sparkle.className = 'sparkle-effect'
  sparkle.innerHTML = '✨'
  sparkle.style.position = 'absolute'
  sparkle.style.pointerEvents = 'none'
  sparkle.style.animation = 'sparkle 1s ease-out forwards'
  
  element.style.position = 'relative'
  element.appendChild(sparkle)

  setTimeout(() => {
    if (sparkle.parentNode) {
      sparkle.parentNode.removeChild(sparkle)
    }
  }, 1000)
}

// Pulse animation for money indicators
export function pulseElement(element: HTMLElement | null, prefs: AccessibilityPreferences): void {
  if (!element || !shouldAnimate(prefs)) return

  element.style.animation = 'pulse 0.5s ease-out'
  
  setTimeout(() => {
    element.style.animation = ''
  }, 500)
}

// Shake animation for near-miss alerts
export function shakeElement(element: HTMLElement | null, prefs: AccessibilityPreferences): void {
  if (!element || !shouldAnimate(prefs)) return

  element.style.animation = 'shake 0.5s ease-out'
  
  setTimeout(() => {
    element.style.animation = ''
  }, 500)
}

// Glow effect for achievements
export function addGlow(element: HTMLElement | null, color: string = '#5BB6FF', prefs: AccessibilityPreferences): void {
  if (!element || !shouldAnimate(prefs)) return

  element.style.boxShadow = `0 0 20px ${color}`
  element.style.transition = 'box-shadow 0.3s ease-out'
  
  setTimeout(() => {
    element.style.boxShadow = ''
  }, 2000)
}

// Number increment animation
export function incrementNumber(
  element: HTMLElement | null,
  value: number,
  prefs: AccessibilityPreferences
): void {
  if (!element) return
  
  if (!shouldAnimate(prefs)) {
    element.textContent = value.toString()
    return
  }

  const current = parseInt(element.textContent || '0')
  animateCounter(element, current, value, 800, prefs)
}

// CSS animations that need to be added to globals.css
export const REQUIRED_ANIMATIONS = `
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes sparkle {
  0% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
  100% { opacity: 0; transform: scale(0) rotate(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideInUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes countUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`

