'use client'

import { LeaderboardEntry } from '../../types/gamification'
import { Trophy, TrendingUp, Award } from 'lucide-react'

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  currentUserId?: string
  className?: string
}

export function Leaderboard({ entries, currentUserId, className = '' }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-accent-yellow" />
    if (rank === 2) return <Award className="w-5 h-5 text-fg-dim" />
    if (rank === 3) return <Award className="w-5 h-5 text-accent-orange" />
    return null
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-accent-yellow to-accent-orange border-accent-yellow'
    if (rank === 2) return 'bg-gradient-to-br from-fg-dim to-fg-base border-fg-dim'
    if (rank === 3) return 'bg-gradient-to-br from-accent-orange to-accent-yellow border-accent-orange'
    return 'bg-bg-sunken border-edge-subtle'
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {entries.map((entry) => {
        const isCurrentUser = entry.userId === currentUserId
        
        return (
          <div 
            key={entry.userId}
            className={`
              flex items-center gap-4 p-4 rounded-xl transition-all
              ${isCurrentUser 
                ? 'bg-accent-blue/10 border border-accent-blue/30 scale-[1.02]' 
                : 'bg-bg-soft border border-edge-subtle hover:bg-bg-sunken'
              }
            `}
          >
            {/* Rank */}
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold border-2
              ${getRankBadge(entry.rank)}
            `}>
              {getRankIcon(entry.rank) || entry.rank}
            </div>

            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-accent-blue flex items-center justify-center text-white font-semibold overflow-hidden">
              {entry.avatar ? (
                <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
              ) : (
                entry.name.charAt(0)
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-semibold truncate ${isCurrentUser ? 'text-accent-blue' : 'text-fg-high'}`}>
                  {entry.name}
                  {isCurrentUser && <span className="text-xs ml-2">(You)</span>}
                </span>
                {isCurrentUser && <TrendingUp className="w-4 h-4 text-accent-blue" />}
              </div>
              <div className="flex items-center gap-3 text-xs text-fg-dim mt-1">
                <span>Level {entry.level}</span>
                <span>•</span>
                <span>{entry.achievements} achievements</span>
              </div>
            </div>

            {/* Earnings */}
            <div className="text-right">
              <div className="text-lg font-bold text-accent-green">
                ${(entry.earnings / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-fg-dim">earned</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

