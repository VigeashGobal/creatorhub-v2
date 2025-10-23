'use client'

import { Card } from '@/components/ui/Card'
import { KpiCard } from '@/components/ui/KpiCard'
import { Search, TrendingUp, Users, Lightbulb, Star, DollarSign, Target, Zap } from 'lucide-react'

interface ExploreTrendsProps {
  userData: any
  onReset: () => void
}

const trendingCreators = [
  { name: 'AI Artistry Hub', niche: 'Digital Art, AI', followers: '1.2M', revenue: '$45K/month', growth: '+15%', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AH' },
  { name: 'EcoLiving Daily', niche: 'Sustainable Lifestyle', followers: '850K', revenue: '$32K/month', growth: '+10%', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ED' },
  { name: 'Tech Gadget Reviews', niche: 'Consumer Tech', followers: '2.1M', revenue: '$78K/month', growth: '+8%', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TR' },
  { name: 'Mindful Moments', niche: 'Meditation, Wellness', followers: '500K', revenue: '$28K/month', growth: '+12%', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MM' },
]

const revenueOpportunities = [
  { title: 'AI Content Creation Tools', potential: '$15K-25K', difficulty: 'Medium', timeframe: '2-3 months', trend: 'Rising' },
  { title: 'Sustainable Fashion Partnerships', potential: '$8K-15K', difficulty: 'Low', timeframe: '1-2 months', trend: 'Hot' },
  { title: 'Tech Product Reviews', potential: '$20K-35K', difficulty: 'High', timeframe: '3-4 months', trend: 'Stable' },
  { title: 'Wellness & Mindfulness Content', potential: '$12K-20K', difficulty: 'Medium', timeframe: '2-3 months', trend: 'Growing' },
]

const trendingHashtags = [
  { tag: '#GlowGoals', posts: '2.3M', revenue: 'High', trend: 'Rising' },
  { tag: '#JuneVibes', posts: '1.8M', revenue: 'Medium', trend: 'Stable' },
  { tag: '#MidYearReset', posts: '1.2M', revenue: 'High', trend: 'Rising' },
  { tag: '#SummerVibes', posts: '3.1M', revenue: 'Medium', trend: 'Peak' },
  { tag: '#CreatorLife', posts: '890K', revenue: 'High', trend: 'Growing' },
  { tag: '#TrendingNow', posts: '4.2M', revenue: 'Low', trend: 'Declining' },
]

export default function ExploreTrends({ userData, onReset }: ExploreTrendsProps) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 py-6 md:py-8 grid grid-cols-12 gap-4 md:gap-6">
        {/* Header */}
        <div className="col-span-12 mb-6">
          <h1 className="h1">Explore Trends</h1>
            <p className="muted">Discover what&apos;s trending and predict future opportunities</p>
        </div>

        {/* Search Bar */}
        <div className="col-span-12 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fg-dim" />
            <input
              type="text"
              placeholder="Search creators, niches, keywords..."
              className="w-full pl-12 pr-4 py-3 bg-bg-soft border border-edge-subtle rounded-xl text-fg-high placeholder-fg-dim focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>
        </div>

        {/* Trend Metrics */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <KpiCard 
            label="Trending Niches" 
            value="12" 
            delta="+3 this week" 
            icon="users" 
          />
          <KpiCard 
            label="Revenue Opportunities" 
            value="$2.4M" 
            delta="Total potential" 
            icon="heart" 
          />
          <KpiCard 
            label="Hot Hashtags" 
            value="47" 
            delta="+8 trending" 
            icon="eye" 
          />
        </div>

        {/* Revenue Opportunities */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="h2">Revenue Opportunities</h2>
                <p className="muted">High-potential trends for monetization</p>
              </div>
              <DollarSign className="w-6 h-6 text-accent-green" />
            </div>
            
            <div className="space-y-4">
              {revenueOpportunities.map((opportunity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-bg-sunken rounded-lg hover:bg-bg-sunken/80 transition-colors">
                  <div className="flex-1">
                    <div className="body font-semibold text-fg-high mb-1">{opportunity.title}</div>
                    <div className="flex items-center gap-4 text-sm text-fg-dim">
                      <span>Potential: {opportunity.potential}</span>
                      <span>•</span>
                      <span>Timeframe: {opportunity.timeframe}</span>
                      <span>•</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        opportunity.trend === 'Hot' ? 'bg-accent-pink/10 text-accent-pink' :
                        opportunity.trend === 'Rising' ? 'bg-accent-green/10 text-accent-green' :
                        opportunity.trend === 'Growing' ? 'bg-accent-blue/10 text-accent-blue' :
                        'bg-fg-dim/10 text-fg-dim'
                      }`}>
                        {opportunity.trend}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-fg-high">{opportunity.potential}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      opportunity.difficulty === 'Low' ? 'bg-accent-green/10 text-accent-green' :
                      opportunity.difficulty === 'Medium' ? 'bg-accent-yellow/10 text-accent-yellow' :
                      'bg-accent-pink/10 text-accent-pink'
                    }`}>
                      {opportunity.difficulty}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Trending Creators */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Top Earners</h2>
              <Star className="w-5 h-5 text-accent-yellow" />
            </div>
            
            <div className="space-y-4">
              {trendingCreators.map((creator, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-bg-sunken rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-accent-blue flex items-center justify-center text-white font-semibold">
                    {creator.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="body font-semibold text-fg-high">{creator.name}</div>
                    <div className="text-sm text-fg-dim">{creator.niche}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-fg-high font-semibold">{creator.revenue}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent-green/10 text-accent-green">
                        {creator.growth}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Trending Hashtags */}
        <div className="col-span-12">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Trending Hashtags</h2>
              <TrendingUp className="w-6 h-6 text-accent-blue" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {trendingHashtags.map((hashtag, index) => (
                <div key={index} className="text-center p-4 bg-bg-sunken rounded-lg hover:bg-bg-sunken/80 transition-colors">
                  <div className="text-lg font-bold text-fg-high mb-1">{hashtag.tag}</div>
                  <div className="text-sm text-fg-dim mb-2">{hashtag.posts} posts</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    hashtag.revenue === 'High' ? 'bg-accent-green/10 text-accent-green' :
                    hashtag.revenue === 'Medium' ? 'bg-accent-yellow/10 text-accent-yellow' :
                    'bg-fg-dim/10 text-fg-dim'
                  }`}>
                    {hashtag.revenue} Revenue
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}