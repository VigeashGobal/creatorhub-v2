import { RevenueProjection } from '../types/gamification'

// Industry benchmarks (mock data for demo)
const PLATFORM_BENCHMARKS = {
  youtube: {
    // Revenue per 1K subscribers per month
    low: 2,
    medium: 5,
    high: 15,
  },
  instagram: {
    // Revenue per 1K followers per month
    low: 1,
    medium: 3,
    high: 8,
  },
  tiktok: {
    // Revenue per 1K followers per month
    low: 0.5,
    medium: 2,
    high: 6,
  },
}

export function calculateRevenueProjection(
  platform: 'youtube' | 'instagram' | 'tiktok',
  followers: number
): RevenueProjection {
  const benchmark = PLATFORM_BENCHMARKS[platform]
  
  // Determine confidence based on follower count
  let confidence: 'low' | 'medium' | 'high' = 'low'
  let rate = benchmark.low
  
  if (platform === 'youtube') {
    if (followers >= 100000) {
      confidence = 'high'
      rate = benchmark.high
    } else if (followers >= 10000) {
      confidence = 'medium'
      rate = benchmark.medium
    }
  } else if (platform === 'instagram') {
    if (followers >= 100000) {
      confidence = 'high'
      rate = benchmark.high
    } else if (followers >= 25000) {
      confidence = 'medium'
      rate = benchmark.medium
    }
  } else if (platform === 'tiktok') {
    if (followers >= 500000) {
      confidence = 'high'
      rate = benchmark.high
    } else if (followers >= 100000) {
      confidence = 'medium'
      rate = benchmark.medium
    }
  }
  
  const monthlyRevenue = Math.floor((followers / 1000) * rate)
  
  return {
    platform,
    followers,
    estimatedMonthly: monthlyRevenue,
    estimatedYearly: monthlyRevenue * 12,
    confidence,
  }
}

export function calculateTotalProjection(
  platforms: Array<{ platform: 'youtube' | 'instagram' | 'tiktok'; followers: number }>
): {
  totalMonthly: number
  totalYearly: number
  breakdown: RevenueProjection[]
  averageConfidence: 'low' | 'medium' | 'high'
} {
  const breakdown = platforms.map(p => calculateRevenueProjection(p.platform, p.followers))
  
  const totalMonthly = breakdown.reduce((sum, proj) => sum + proj.estimatedMonthly, 0)
  const totalYearly = totalMonthly * 12
  
  // Calculate average confidence
  const confidenceValues = { low: 1, medium: 2, high: 3 }
  const avgConfidence = breakdown.reduce((sum, proj) => sum + confidenceValues[proj.confidence], 0) / breakdown.length
  
  let averageConfidence: 'low' | 'medium' | 'high' = 'low'
  if (avgConfidence >= 2.5) averageConfidence = 'high'
  else if (avgConfidence >= 1.5) averageConfidence = 'medium'
  
  return {
    totalMonthly,
    totalYearly,
    breakdown,
    averageConfidence,
  }
}

// Social proof data (mock data for demo)
export function getSocialProofStats() {
  return {
    totalCreators: 10247,
    totalEarnings: 5287000,
    averageMonthly: 2840,
    topCreatorMonthly: 125000,
    completedOnboardingToday: 42,
  }
}

// Testimonials (mock data for demo)
export function getTestimonials() {
  return [
    {
      name: 'Sarah Martinez',
      role: 'Beauty Creator',
      earnings: '$12,500/mo',
      quote: 'CreatorHub helped me 3x my revenue in just 6 months!',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SM',
    },
    {
      name: 'James Chen',
      role: 'Tech Reviewer',
      earnings: '$25,000/mo',
      quote: 'The analytics and insights are game-changing for creators.',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JC',
    },
    {
      name: 'Emma Williams',
      role: 'Lifestyle Vlogger',
      earnings: '$8,900/mo',
      quote: 'I wish I had found CreatorHub sooner. Absolute must-have!',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=EW',
    },
  ]
}

