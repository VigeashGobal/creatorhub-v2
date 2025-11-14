'use client'

import { CreatorCoins } from '../../types/gamification'
import { Coins, TrendingUp } from 'lucide-react'

interface VirtualCurrencyProps {
  creatorCoins: CreatorCoins
  className?: string
  showLifetime?: boolean
  animated?: boolean
}

export function VirtualCurrency({ 
  creatorCoins, 
  className = '', 
  showLifetime = false,
  animated = true 
}: VirtualCurrencyProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-yellow/10">
        <Coins className="w-5 h-5 text-accent-yellow" />
      </div>
      
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-bold text-fg-high ${animated ? 'transition-all duration-300' : ''}`}>
            {creatorCoins.balance.toLocaleString()}
          </span>
          <span className="text-sm text-fg-dim">coins</span>
        </div>
        
        {showLifetime && (
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-accent-green" />
            <span className="text-xs text-fg-dim">
              {creatorCoins.lifetimeEarned.toLocaleString()} lifetime
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

