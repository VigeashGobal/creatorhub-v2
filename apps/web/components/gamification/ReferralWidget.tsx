'use client'

import { ReferralData } from '../../types/gamification'
import { Users, Copy, DollarSign, Check, Share2 } from 'lucide-react'
import { useState } from 'react'

interface ReferralWidgetProps {
  referrals: ReferralData
  onShare?: () => void
  className?: string
}

export function ReferralWidget({ referrals, onShare, className = '' }: ReferralWidgetProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `Join CreatorHub with my code: ${referrals.referralCode}\nhttps://creatorhub.app/ref/${referrals.referralCode}`
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-accent-purple" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-fg-high">Refer & Earn</h3>
            <p className="text-xs text-fg-dim">$100 per successful referral</p>
          </div>
        </div>
      </div>

      {/* Referral code */}
      <div className="p-4 bg-gradient-to-br from-accent-purple/10 to-accent-pink/10 border border-accent-purple/30 rounded-xl">
        <div className="text-xs text-fg-dim mb-2">Your Referral Code</div>
        <div className="flex items-center gap-2">
          <code className="flex-1 px-3 py-2 bg-bg-soft rounded-lg text-lg font-mono font-bold text-fg-high border border-edge-subtle">
            {referrals.referralCode}
          </code>
          <button
            onClick={handleCopy}
            className="p-2 bg-accent-purple hover:bg-accent-purple/80 text-white rounded-lg transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={onShare}
            className="p-2 bg-accent-blue hover:bg-accent-blue/80 text-white rounded-lg transition-colors"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-bg-soft rounded-lg text-center">
          <div className="text-2xl font-bold text-fg-high">{referrals.totalReferrals}</div>
          <div className="text-xs text-fg-dim mt-1">Total Referrals</div>
        </div>
        
        <div className="p-3 bg-bg-soft rounded-lg text-center">
          <div className="flex items-center justify-center gap-1">
            <DollarSign className="w-5 h-5 text-accent-green" />
            <span className="text-2xl font-bold text-accent-green">
              {referrals.totalEarnings.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-fg-dim mt-1">Total Earned</div>
        </div>
        
        <div className="p-3 bg-bg-soft rounded-lg text-center">
          <div className="text-2xl font-bold text-accent-yellow">{referrals.pendingReferrals}</div>
          <div className="text-xs text-fg-dim mt-1">Pending</div>
        </div>
      </div>

      {/* Recent referrals */}
      {referrals.referrals.length > 0 && (
        <div>
          <div className="text-sm font-semibold text-fg-high mb-3">Recent Referrals</div>
          <div className="space-y-2">
            {referrals.referrals.slice(0, 3).map((referral, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-bg-soft rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent-purple flex items-center justify-center text-white text-sm font-semibold">
                    {referral.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-fg-high">{referral.name}</div>
                    <div className="text-xs text-fg-dim capitalize">{referral.status.replace('_', ' ')}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-accent-green font-semibold">
                  <DollarSign className="w-4 h-4" />
                  <span>${referral.earnings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to action */}
      <div className="p-4 bg-accent-purple/5 border border-accent-purple/20 rounded-xl">
        <div className="text-sm font-semibold text-fg-high mb-1">
          How it works:
        </div>
        <ul className="text-xs text-fg-dim space-y-1">
          <li>• Share your code with other creators</li>
          <li>• Earn $50 when they sign up</li>
          <li>• Earn $50 more when they complete onboarding</li>
          <li>• Bonus rewards for multiple referrals!</li>
        </ul>
      </div>
    </div>
  )
}

