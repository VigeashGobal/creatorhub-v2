export interface UserLevel {
  level: number
  xp: number
  xpToNextLevel: number
  title: string
}

export interface CreatorCoins {
  balance: number
  lifetimeEarned: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  category: 'revenue' | 'streak' | 'task' | 'social' | 'milestone'
  icon: string
  dollarValue: number
  reward: string
  unlocked: boolean
  unlockedAt?: Date
  progress?: number
  target?: number
}

export interface Streak {
  type: 'login' | 'revenue' | 'posting' | 'task'
  current: number
  longest: number
  lastUpdated: Date
  multiplier: number
}

export interface DailyChallenge {
  id: string
  title: string
  description: string
  dollarReward: number
  xpReward: number
  progress: number
  target: number
  completed: boolean
  expiresAt: Date
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  avatar?: string
  level: number
  earnings: number
  achievements: number
}

export interface RevenueMilestone {
  id: string
  threshold: number
  title: string
  reward: string
  dollarValue: number
  unlocked: boolean
  progress: number
}

export interface DailyLoginReward {
  day: number
  dollarAmount: number
  claimed: boolean
  date?: Date
}

export interface DailyLoginState {
  currentStreak: number
  lastLoginDate: Date | null
  rewards: DailyLoginReward[]
  totalEarned: number
}

export interface ReferralData {
  referralCode: string
  totalReferrals: number
  totalEarnings: number
  pendingReferrals: number
  referrals: Array<{
    name: string
    status: 'signed_up' | 'completed_onboarding' | 'active'
    earnings: number
    date: Date
  }>
}

export interface NearMissAlert {
  type: 'milestone' | 'achievement' | 'level' | 'streak' | 'opportunity'
  message: string
  remaining: number
  dollarValue?: number
  ctaText: string
  ctaAction: () => void
}

export interface EarningsVelocity {
  hourly: number
  daily: number
  monthly: number
  trend: 'up' | 'down' | 'stable'
  lastUpdated: Date
}

export interface NextBestAction {
  title: string
  description: string
  dollarValue: number
  xpValue: number
  action: () => void
  priority: 'high' | 'medium' | 'low'
  category: string
}

export interface AccessibilityPreferences {
  reducedMotion: boolean
  skipAnimations: boolean
  highContrast: boolean
  screenReaderMode: boolean
}

export interface GamificationState {
  userLevel: UserLevel
  creatorCoins: CreatorCoins
  achievements: Achievement[]
  streaks: Streak[]
  dailyChallenges: DailyChallenge[]
  leaderboard: LeaderboardEntry[]
  revenueMilestones: RevenueMilestone[]
  dailyLogin: DailyLoginState
  referrals: ReferralData
  nearMissAlerts: NearMissAlert[]
  earningsVelocity: EarningsVelocity
  nextBestActions: NextBestAction[]
  accessibilityPreferences: AccessibilityPreferences
  lastUpdated: Date
}

export interface RevenueProjection {
  platform: 'youtube' | 'instagram' | 'tiktok'
  followers: number
  estimatedMonthly: number
  estimatedYearly: number
  confidence: 'low' | 'medium' | 'high'
}

export interface OnboardingProgress {
  step: number
  totalSteps: number
  completedSteps: string[]
  coinsEarned: number
  achievementsUnlocked: string[]
  projectedEarnings: number
}

