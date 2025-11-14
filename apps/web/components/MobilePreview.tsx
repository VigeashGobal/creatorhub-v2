'use client'

import { useState } from 'react'
import { Smartphone, Monitor, X } from 'lucide-react'

interface MobilePreviewProps {
  children: React.ReactNode
}

export default function MobilePreview({ children }: MobilePreviewProps) {
  const [isMobileView, setIsMobileView] = useState(false)

  if (!isMobileView) {
    return (
      <>
        {/* Toggle Button - Fixed Position */}
        <button
          onClick={() => setIsMobileView(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-accent-blue text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          aria-label="Toggle mobile preview"
        >
          <Smartphone className="w-5 h-5" />
          <span className="font-semibold">Mobile Preview</span>
        </button>
        {children}
      </>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-bg-sunken flex items-center justify-center p-4">
      {/* Controls */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-bg-soft px-4 py-2 rounded-full border border-edge-subtle shadow-lg">
        <button
          onClick={() => setIsMobileView(false)}
          className="flex items-center gap-2 px-3 py-1.5 bg-bg text-fg-high rounded-full hover:bg-bg-sunken transition-colors"
        >
          <Monitor className="w-4 h-4" />
          <span className="text-sm font-medium">Desktop</span>
        </button>
        <button
          className="flex items-center gap-2 px-3 py-1.5 bg-accent-blue text-white rounded-full"
        >
          <Smartphone className="w-4 h-4" />
          <span className="text-sm font-medium">Mobile</span>
        </button>
        <button
          onClick={() => setIsMobileView(false)}
          className="ml-2 p-1.5 hover:bg-bg-sunken rounded-full transition-colors"
          aria-label="Close mobile preview"
        >
          <X className="w-5 h-5 text-fg-dim" />
        </button>
      </div>

      {/* Phone Frame */}
      <div className="relative">
        {/* Phone Outer Shell */}
        <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl" style={{ width: '400px', height: '820px' }}>
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#1a1a1a] rounded-b-3xl z-10"></div>
          
          {/* Screen */}
          <div className="relative w-full h-full bg-bg rounded-[2.5rem] overflow-hidden">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-bg-soft/50 backdrop-blur-sm z-20 flex items-center justify-between px-6 text-xs text-fg-dim">
              <span className="font-medium">9:41</span>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>

            {/* App Content - Scrollable */}
            <div className="w-full h-full overflow-y-auto pt-12 pb-6" style={{ scrollbarWidth: 'thin' }}>
              <div className="min-h-full" style={{ width: '100%', maxWidth: '100%' }}>
                {children}
              </div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full"></div>
        </div>

        {/* Phone Shadow */}
        <div className="absolute inset-0 rounded-[3rem] shadow-2xl pointer-events-none" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}></div>
      </div>

      {/* Info Text */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-fg-dim">
          Showing mobile preview • iPhone 14 Pro (390x844)
        </p>
      </div>
    </div>
  )
}

