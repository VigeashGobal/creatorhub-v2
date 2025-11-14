'use client'

import {
  Activity,
  Search,
  Grid3X3,
  DollarSign,
  Settings,
  LogOut,
  Trophy,
  Bell,
  Calendar
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { loadGamificationState, calculateEarningsVelocity, claimDailyLoginReward } from '../lib/gamification'
import { PointsDisplay } from './gamification/PointsDisplay'
import { VirtualCurrency } from './gamification/VirtualCurrency'
import { StreakCounter } from './gamification/StreakCounter'
import { EarningsVelocity } from './gamification/EarningsVelocity'
import { useRouter } from 'next/navigation'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
  onReset: () => void
}

function SidebarItem({ icon: Icon, label, active = false, onClick, badge }: { icon: any, label: string, active?: boolean, onClick: () => void, badge?: number }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
        active
          ? 'bg-[rgba(255,255,255,0.04)] text-fg-high ring-1 ring-edge-subtle'
          : 'text-fg-base hover:bg-[rgba(255,255,255,0.03)]'
      }`}
    >
      <Icon className="w-5 h-5 text-fg-dim" />
      <span className="text-sm">{label}</span>
      {badge && badge > 0 && (
        <span className="ml-auto w-5 h-5 rounded-full bg-accent-blue text-white text-xs flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  )
}

export default function Navigation({ currentPage, onPageChange, onReset }: NavigationProps) {
  const [isOffline, setIsOffline] = useState(false)
  const [gamificationState, setGamificationState] = useState(loadGamificationState())
  const router = useRouter()

  useEffect(() => {
    const update = () => setIsOffline(!navigator.onLine)
    update()
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setGamificationState(loadGamificationState())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const pages = [
    { id: 'analytics', name: 'Social Pulse', icon: Activity },
    { id: 'trends', name: 'Trends', icon: Search },
    { id: 'workflow', name: 'Workflow', icon: Grid3X3 },
    { id: 'financial', name: 'Finance', icon: DollarSign }
  ]

  const earningsVelocity = calculateEarningsVelocity([35400 / 30 / 24])
  const loginStreak = gamificationState.streaks.find(s => s.type === 'login') || gamificationState.streaks[0]
  
  // Check for notifications
  const newAchievements = gamificationState.achievements.filter(a => a.unlocked && a.unlockedAt && 
    new Date(a.unlockedAt).getTime() > Date.now() - 86400000).length
  const canClaimDailyReward = () => {
    const now = new Date()
    const lastLogin = gamificationState.dailyLogin.lastLoginDate
    if (!lastLogin) return true
    const lastLoginDate = new Date(lastLogin)
    return !(lastLoginDate.getDate() === now.getDate() && 
             lastLoginDate.getMonth() === now.getMonth() && 
             lastLoginDate.getFullYear() === now.getFullYear())
  }

  const handleClaimDailyReward = () => {
    const newState = claimDailyLoginReward(gamificationState)
    if (newState) {
      setGamificationState(newState)
    }
  }

  return (
    <>
      {/* Offline banner */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black text-sm py-2 text-center">
          You are offline. Changes may not be saved.
        </div>
      )}
      
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-soft border-t border-edge-subtle">
        <div className="flex justify-around py-2">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange(page.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                currentPage === page.id 
                  ? 'bg-[rgba(255,255,255,0.04)] text-fg-high' 
                  : 'text-fg-base hover:bg-[rgba(255,255,255,0.03)]'
              }`}
            >
              <page.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{page.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-bg-soft border-r border-edge-subtle w-64 min-h-screen p-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-accent-blue">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-fg-high">Social Pulse</h1>
            <p className="text-sm text-fg-dim">Creator Analytics</p>
          </div>
        </div>

        {/* Gamification Header */}
        <div className="mb-6 p-4 bg-bg border border-edge-subtle rounded-xl space-y-4">
          <PointsDisplay userLevel={gamificationState.userLevel} showTitle={false} />
          <VirtualCurrency creatorCoins={gamificationState.creatorCoins} />
          <StreakCounter streak={loginStreak} showMultiplier={false} />
          <EarningsVelocity velocity={earningsVelocity} size="sm" showProjections={false} />
          
          {/* Daily Login Quick Access */}
          {canClaimDailyReward() && (
            <button
              onClick={handleClaimDailyReward}
              className="w-full px-3 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Claim Daily Reward
            </button>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2 mb-6 flex-1">
          {pages.map((page) => (
            <SidebarItem
              key={page.id}
              icon={page.icon}
              label={page.name}
              active={currentPage === page.id}
              onClick={() => onPageChange(page.id)}
            />
          ))}
        </nav>
        
        {/* Gamification Links */}
        <div className="mb-6 space-y-2">
          <SidebarItem
            icon={Trophy}
            label="Achievements"
            onClick={() => router.push('/achievements')}
            badge={newAchievements > 0 ? newAchievements : undefined}
          />
          {canClaimDailyReward() && (
            <SidebarItem
              icon={Calendar}
              label="Daily Rewards"
              onClick={handleClaimDailyReward}
              badge={1}
            />
          )}
        </div>
        
        {/* Settings */}
        <div className="mt-auto space-y-2">
          <SidebarItem
            icon={Settings}
            label="Settings"
            onClick={() => {}}
          />
          <SidebarItem
            icon={LogOut}
            label="Sign Out"
            onClick={onReset}
          />
        </div>
      </div>
    </>
  )
}
