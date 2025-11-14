import type {
  GamificationState,
  UserLevel,
  CreatorCoins,
  Achievement,
  Streak,
  DailyChallenge,
  LeaderboardEntry,
  RevenueMilestone,
  DailyLoginState,
  DailyLoginReward,
  ReferralData,
  NearMissAlert,
  EarningsVelocity,
  NextBestAction,
  AccessibilityPreferences,
} from '../types/gamification'

const STORAGE_KEY = 'creatorhub-gamification'
const XP_PER_LEVEL = 1000
const COIN_TO_DOLLAR_RATIO = 10

// Achievement definitions
const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlocked' | 'unlockedAt' | 'progress'>[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your profile setup',
    category: 'milestone',
    icon: '🎯',
    dollarValue: 100,
    reward: '+$100 potential unlocked',
    target: 1,
  },
  {
    id: 'platform-pioneer',
    title: 'Platform Pioneer',
    description: 'Connect your first social platform',
    category: 'social',
    icon: '🚀',
    dollarValue: 250,
    reward: '+$250 potential unlocked',
    target: 1,
  },
  {
    id: 'multi-platform-master',
    title: 'Multi-Platform Master',
    description: 'Connect 3+ social platforms',
    category: 'social',
    icon: '👑',
    dollarValue: 500,
    reward: '+$500 potential unlocked',
    target: 3,
  },
  {
    id: 'revenue-master',
    title: 'Revenue Master',
    description: 'Earn $30K+ in a single month',
    category: 'revenue',
    icon: '💰',
    dollarValue: 2000,
    reward: '+$2K bonus',
    target: 30000,
  },
  {
    id: 'consistency-king',
    title: 'Consistency King',
    description: 'Maintain a 7-day login streak',
    category: 'streak',
    icon: '🔥',
    dollarValue: 500,
    reward: '+15% engagement boost',
    target: 7,
  },
  {
    id: 'brand-magnet',
    title: 'Brand Magnet',
    description: 'Complete 5 brand partnerships',
    category: 'revenue',
    icon: '⭐',
    dollarValue: 5000,
    reward: '+$5K potential',
    target: 5,
  },
  {
    id: 'viral-creator',
    title: 'Viral Creator',
    description: 'Reach 1M+ views on a single post',
    category: 'milestone',
    icon: '🏆',
    dollarValue: 10000,
    reward: '+$10K potential',
    target: 1000000,
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Complete all daily challenges for 7 days',
    category: 'task',
    icon: '⚔️',
    dollarValue: 1000,
    reward: '+$1K bonus',
    target: 7,
  },
  {
    id: 'trend-hunter',
    title: 'Trend Hunter',
    description: 'Claim 10 trending opportunities',
    category: 'social',
    icon: '🎯',
    dollarValue: 2500,
    reward: '+$2.5K potential',
    target: 10,
  },
  {
    id: 'referral-champion',
    title: 'Referral Champion',
    description: 'Refer 5 creators who complete onboarding',
    category: 'social',
    icon: '🤝',
    dollarValue: 500,
    reward: '+$500 bonus',
    target: 5,
  },
]

// Daily login rewards schedule
const DAILY_LOGIN_SCHEDULE: number[] = [
  50, 75, 100, 150, 200, 300, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1600,
  1800, 2000, 2200, 2500, 2800, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 7000, 8000, 10000
]

// Initialize default state
function getDefaultState(): GamificationState {
  return {
    userLevel: {
      level: 1,
      xp: 0,
      xpToNextLevel: XP_PER_LEVEL,
      title: 'Rookie Creator',
    },
    creatorCoins: {
      balance: 0,
      lifetimeEarned: 0,
    },
    achievements: ACHIEVEMENT_DEFINITIONS.map(def => ({
      ...def,
      unlocked: false,
      progress: 0,
    })),
    streaks: [
      { type: 'login', current: 0, longest: 0, lastUpdated: new Date(), multiplier: 1 },
      { type: 'revenue', current: 0, longest: 0, lastUpdated: new Date(), multiplier: 1 },
      { type: 'posting', current: 0, longest: 0, lastUpdated: new Date(), multiplier: 1 },
      { type: 'task', current: 0, longest: 0, lastUpdated: new Date(), multiplier: 1 },
    ],
    dailyChallenges: generateDailyChallenges(),
    leaderboard: generateMockLeaderboard(),
    revenueMilestones: generateRevenueMilestones(),
    dailyLogin: {
      currentStreak: 0,
      lastLoginDate: null,
      rewards: DAILY_LOGIN_SCHEDULE.map((amount, index) => ({
        day: index + 1,
        dollarAmount: amount,
        claimed: false,
      })),
      totalEarned: 0,
    },
    referrals: {
      referralCode: generateReferralCode(),
      totalReferrals: 0,
      totalEarnings: 0,
      pendingReferrals: 0,
      referrals: [],
    },
    nearMissAlerts: [],
    earningsVelocity: {
      hourly: 0,
      daily: 0,
      monthly: 0,
      trend: 'stable',
      lastUpdated: new Date(),
    },
    nextBestActions: [],
    accessibilityPreferences: {
      reducedMotion: false,
      skipAnimations: false,
      highContrast: false,
      screenReaderMode: false,
    },
    lastUpdated: new Date(),
  }
}

function generateDailyChallenges(): DailyChallenge[] {
  const today = new Date()
  const endOfDay = new Date(today)
  endOfDay.setHours(23, 59, 59, 999)

  return [
    {
      id: 'daily-login',
      title: 'Daily Check-In',
      description: 'Log in to CreatorHub',
      dollarReward: 50,
      xpReward: 100,
      progress: 0,
      target: 1,
      completed: false,
      expiresAt: endOfDay,
    },
    {
      id: 'complete-task',
      title: 'Task Master',
      description: 'Complete 3 workflow tasks',
      dollarReward: 200,
      xpReward: 300,
      progress: 0,
      target: 3,
      completed: false,
      expiresAt: endOfDay,
    },
    {
      id: 'explore-opportunity',
      title: 'Opportunity Scout',
      description: 'Explore 2 trending opportunities',
      dollarReward: 150,
      xpReward: 250,
      progress: 0,
      target: 2,
      completed: false,
      expiresAt: endOfDay,
    },
    {
      id: 'revenue-goal',
      title: 'Revenue Focus',
      description: 'Update your revenue goals',
      dollarReward: 100,
      xpReward: 200,
      progress: 0,
      target: 1,
      completed: false,
      expiresAt: endOfDay,
    },
  ]
}

function generateMockLeaderboard(): LeaderboardEntry[] {
  const names = ['Alex Rivera', 'Sam Chen', 'Jordan Taylor', 'Casey Morgan', 'Riley Parker', 'Current User']
  return names.map((name, index) => ({
    rank: index + 1,
    userId: `user-${index}`,
    name,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
    level: 15 - index,
    earnings: 50000 - index * 5000,
    achievements: 25 - index * 2,
  }))
}

function generateRevenueMilestones(): RevenueMilestone[] {
  const milestones = [
    { threshold: 10000, title: 'Bronze Creator', reward: 'Unlock Premium Analytics', dollarValue: 500 },
    { threshold: 25000, title: 'Silver Creator', reward: 'Priority Support Access', dollarValue: 1000 },
    { threshold: 50000, title: 'Gold Creator', reward: 'Exclusive Brand Deals', dollarValue: 2500 },
    { threshold: 100000, title: 'Platinum Creator', reward: 'VIP Event Access', dollarValue: 5000 },
    { threshold: 250000, title: 'Diamond Creator', reward: 'Personal Success Manager', dollarValue: 10000 },
  ]

  return milestones.map(m => ({
    id: `milestone-${m.threshold}`,
    ...m,
    unlocked: false,
    progress: 0,
  }))
}

function generateReferralCode(): string {
  return `CREATE${Math.random().toString(36).substring(2, 8).toUpperCase()}`
}

// Validate and repair state
function validateState(state: any): GamificationState {
  try {
    // Check if state has required properties
    if (!state || typeof state !== 'object') {
      return getDefaultState()
    }

    // Validate critical fields
    if (!state.userLevel || !state.creatorCoins || !Array.isArray(state.achievements)) {
      return getDefaultState()
    }

    // Ensure dates are properly parsed
    if (state.dailyLogin?.lastLoginDate) {
      state.dailyLogin.lastLoginDate = new Date(state.dailyLogin.lastLoginDate)
    }

    state.streaks = state.streaks?.map((s: any) => ({
      ...s,
      lastUpdated: new Date(s.lastUpdated),
    })) || getDefaultState().streaks

    state.lastUpdated = new Date(state.lastUpdated || Date.now())

    return state as GamificationState
  } catch (error) {
    console.error('State validation error:', error)
    return getDefaultState()
  }
}

// Storage functions
export function loadGamificationState(): GamificationState {
  if (typeof window === 'undefined') {
    return getDefaultState()
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      const defaultState = getDefaultState()
      saveGamificationState(defaultState)
      return defaultState
    }

    const parsed = JSON.parse(stored)
    return validateState(parsed)
  } catch (error) {
    console.error('Error loading gamification state:', error)
    return getDefaultState()
  }
}

export function saveGamificationState(state: GamificationState): void {
  if (typeof window === 'undefined') return

  try {
    state.lastUpdated = new Date()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Error saving gamification state:', error)
  }
}

// XP and leveling functions
export function addXP(state: GamificationState, amount: number): GamificationState {
  const newState = { ...state }
  newState.userLevel = { ...newState.userLevel }
  newState.userLevel.xp += amount

  // Check for level up
  while (newState.userLevel.xp >= newState.userLevel.xpToNextLevel) {
    newState.userLevel.xp -= newState.userLevel.xpToNextLevel
    newState.userLevel.level += 1
    newState.userLevel.xpToNextLevel = XP_PER_LEVEL * newState.userLevel.level
    newState.userLevel.title = getLevelTitle(newState.userLevel.level)
  }

  saveGamificationState(newState)
  return newState
}

export function getLevelTitle(level: number): string {
  if (level < 5) return 'Rookie Creator'
  if (level < 10) return 'Rising Star'
  if (level < 15) return 'Pro Creator'
  if (level < 20) return 'Elite Creator'
  if (level < 30) return 'Master Creator'
  if (level < 40) return 'Legend'
  return 'Icon'
}

// Coin functions
export function addCoins(state: GamificationState, amount: number): GamificationState {
  const newState = { ...state }
  newState.creatorCoins = {
    balance: newState.creatorCoins.balance + amount,
    lifetimeEarned: newState.creatorCoins.lifetimeEarned + amount,
  }
  saveGamificationState(newState)
  return newState
}

export function spendCoins(state: GamificationState, amount: number): GamificationState | null {
  if (state.creatorCoins.balance < amount) {
    return null
  }

  const newState = { ...state }
  newState.creatorCoins = {
    ...newState.creatorCoins,
    balance: newState.creatorCoins.balance - amount,
  }
  saveGamificationState(newState)
  return newState
}

// Achievement functions
export function unlockAchievement(state: GamificationState, achievementId: string): GamificationState {
  const newState = { ...state }
  const achievement = newState.achievements.find(a => a.id === achievementId)
  
  if (achievement && !achievement.unlocked) {
    achievement.unlocked = true
    achievement.unlockedAt = new Date()
    
    // Award coins
    newState.creatorCoins.balance += achievement.dollarValue * COIN_TO_DOLLAR_RATIO
    newState.creatorCoins.lifetimeEarned += achievement.dollarValue * COIN_TO_DOLLAR_RATIO
    
    // Award XP
    addXP(newState, 500)
  }

  saveGamificationState(newState)
  return newState
}

export function updateAchievementProgress(
  state: GamificationState,
  achievementId: string,
  progress: number
): GamificationState {
  const newState = { ...state }
  const achievement = newState.achievements.find(a => a.id === achievementId)
  
  if (achievement && !achievement.unlocked) {
    achievement.progress = progress
    
    if (achievement.target && progress >= achievement.target) {
      return unlockAchievement(newState, achievementId)
    }
  }

  saveGamificationState(newState)
  return newState
}

// Streak functions
export function updateStreak(state: GamificationState, type: Streak['type']): GamificationState {
  const newState = { ...state }
  const streak = newState.streaks.find(s => s.type === type)
  
  if (streak) {
    const now = new Date()
    const lastUpdate = new Date(streak.lastUpdated)
    const hoursSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60)
    
    // If less than 24 hours, don't update
    if (hoursSinceUpdate < 24) {
      return newState
    }
    
    // If less than 48 hours, increment streak
    if (hoursSinceUpdate < 48) {
      streak.current += 1
      if (streak.current > streak.longest) {
        streak.longest = streak.current
      }
    } else {
      // Reset streak
      streak.current = 1
    }
    
    streak.lastUpdated = now
    streak.multiplier = 1 + Math.min(streak.current * 0.1, 2) // Max 3x multiplier
  }

  saveGamificationState(newState)
  return newState
}

// Daily login functions
export function claimDailyLoginReward(state: GamificationState): GamificationState | null {
  const newState = { ...state }
  const now = new Date()
  const lastLogin = newState.dailyLogin.lastLoginDate
  
  // Check if already claimed today
  if (lastLogin) {
    const lastLoginDate = new Date(lastLogin)
    const isSameDay = 
      lastLoginDate.getDate() === now.getDate() &&
      lastLoginDate.getMonth() === now.getMonth() &&
      lastLoginDate.getFullYear() === now.getFullYear()
    
    if (isSameDay) {
      return null // Already claimed today
    }
  }
  
  // Update streak
  if (lastLogin) {
    const hoursSinceLastLogin = (now.getTime() - new Date(lastLogin).getTime()) / (1000 * 60 * 60)
    if (hoursSinceLastLogin < 48) {
      newState.dailyLogin.currentStreak += 1
    } else {
      newState.dailyLogin.currentStreak = 1
    }
  } else {
    newState.dailyLogin.currentStreak = 1
  }
  
  // Claim reward
  const currentDay = Math.min(newState.dailyLogin.currentStreak, DAILY_LOGIN_SCHEDULE.length)
  const reward = newState.dailyLogin.rewards[currentDay - 1]
  
  if (reward && !reward.claimed) {
    reward.claimed = true
    reward.date = now
    newState.dailyLogin.totalEarned += reward.dollarAmount
    newState.creatorCoins.balance += reward.dollarAmount * COIN_TO_DOLLAR_RATIO
    newState.creatorCoins.lifetimeEarned += reward.dollarAmount * COIN_TO_DOLLAR_RATIO
  }
  
  newState.dailyLogin.lastLoginDate = now
  addXP(newState, 100)
  saveGamificationState(newState)
  return newState
}

// Daily challenge functions
export function updateDailyChallengeProgress(
  state: GamificationState,
  challengeId: string,
  progress: number
): GamificationState {
  const newState = { ...state }
  const challenge = newState.dailyChallenges.find(c => c.id === challengeId)
  
  if (challenge && !challenge.completed) {
    challenge.progress = Math.min(progress, challenge.target)
    
    if (challenge.progress >= challenge.target) {
      challenge.completed = true
      newState.creatorCoins.balance += challenge.dollarReward * COIN_TO_DOLLAR_RATIO
      newState.creatorCoins.lifetimeEarned += challenge.dollarReward * COIN_TO_DOLLAR_RATIO
      addXP(newState, challenge.xpReward)
    }
  }

  saveGamificationState(newState)
  return newState
}

// Near-miss alert generation
export function generateNearMissAlerts(state: GamificationState): NearMissAlert[] {
  const alerts: NearMissAlert[] = []
  
  // Check achievements close to completion
  state.achievements.forEach(achievement => {
    if (!achievement.unlocked && achievement.progress && achievement.target) {
      const remaining = achievement.target - achievement.progress
      const percentComplete = (achievement.progress / achievement.target) * 100
      
      if (percentComplete >= 80 && percentComplete < 100) {
        alerts.push({
          type: 'achievement',
          message: `Only ${remaining} more to unlock ${achievement.title}!`,
          remaining,
          dollarValue: achievement.dollarValue,
          ctaText: `Earn $${achievement.dollarValue}`,
          ctaAction: () => {},
        })
      }
    }
  })
  
  // Check level progress
  const xpRemaining = state.userLevel.xpToNextLevel - state.userLevel.xp
  const levelPercent = (state.userLevel.xp / state.userLevel.xpToNextLevel) * 100
  
  if (levelPercent >= 80) {
    alerts.push({
      type: 'level',
      message: `Only ${xpRemaining} XP to level ${state.userLevel.level + 1}!`,
      remaining: xpRemaining,
      ctaText: 'Earn XP',
      ctaAction: () => {},
    })
  }
  
  // Check daily login streak milestones
  const streakMilestones = [7, 14, 30]
  const loginStreak = state.streaks.find(s => s.type === 'login')
  
  if (loginStreak) {
    const nextMilestone = streakMilestones.find(m => m > loginStreak.current)
    if (nextMilestone) {
      const remaining = nextMilestone - loginStreak.current
      if (remaining <= 3) {
        alerts.push({
          type: 'streak',
          message: `${remaining} more days for ${nextMilestone}-day streak!`,
          remaining,
          dollarValue: nextMilestone * 100,
          ctaText: 'Keep it up!',
          ctaAction: () => {},
        })
      }
    }
  }
  
  return alerts
}

// Calculate earnings velocity
export function calculateEarningsVelocity(recentEarnings: number[]): EarningsVelocity {
  const now = new Date()
  const hourly = recentEarnings.length > 0 ? recentEarnings[recentEarnings.length - 1] : 0
  const daily = hourly * 24
  const monthly = daily * 30
  
  let trend: 'up' | 'down' | 'stable' = 'stable'
  if (recentEarnings.length >= 2) {
    const recent = recentEarnings[recentEarnings.length - 1]
    const previous = recentEarnings[recentEarnings.length - 2]
    if (recent > previous * 1.1) trend = 'up'
    else if (recent < previous * 0.9) trend = 'down'
  }
  
  return {
    hourly,
    daily,
    monthly,
    trend,
    lastUpdated: now,
  }
}

// Generate next best actions
export function generateNextBestActions(state: GamificationState): NextBestAction[] {
  const actions: NextBestAction[] = []
  
  // Uncompleted daily challenges
  state.dailyChallenges.forEach(challenge => {
    if (!challenge.completed) {
      actions.push({
        title: challenge.title,
        description: challenge.description,
        dollarValue: challenge.dollarReward,
        xpValue: challenge.xpReward,
        action: () => {},
        priority: 'high',
        category: 'challenge',
      })
    }
  })
  
  // Near-completion achievements
  state.achievements.forEach(achievement => {
    if (!achievement.unlocked && achievement.progress && achievement.target) {
      const percentComplete = (achievement.progress / achievement.target) * 100
      if (percentComplete >= 70) {
        actions.push({
          title: `Complete ${achievement.title}`,
          description: achievement.description,
          dollarValue: achievement.dollarValue,
          xpValue: 500,
          action: () => {},
          priority: 'medium',
          category: 'achievement',
        })
      }
    }
  })
  
  // Sort by dollar value
  return actions.sort((a, b) => b.dollarValue - a.dollarValue).slice(0, 5)
}

// Reset functions (for testing)
export function resetGamificationState(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

