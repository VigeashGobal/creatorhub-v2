'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, Youtube, Instagram, Music, Calendar, Download, Plus } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface FinancialSnapshotProps {
  userData: any
  onReset: () => void
}

export default function FinancialSnapshot({ userData, onReset }: FinancialSnapshotProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'30d' | '60d' | '90d'>('30d')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all'])

  // Dummy revenue data
  const revenueData = {
    '30d': {
      all: 15420,
      youtube: 8500,
      instagram: 4200,
      tiktok: 2720
    },
    '60d': {
      all: 28950,
      youtube: 16200,
      instagram: 7850,
      tiktok: 4900
    },
    '90d': {
      all: 42680,
      youtube: 24100,
      instagram: 11580,
      tiktok: 7000
    }
  }

  const getTotalRevenue = () => {
    if (selectedPlatforms.includes('all')) {
      return revenueData[selectedTimeframe].all
    }
    return selectedPlatforms.reduce((sum, platform) => {
      return sum + (revenueData[selectedTimeframe][platform as keyof typeof revenueData['30d']] || 0)
    }, 0)
  }

  // Revenue breakdown chart data
  const revenueChartData = [
    { month: 'Month 1', youtube: 8500, instagram: 4200, tiktok: 2720 },
    { month: 'Month 2', youtube: 12400, instagram: 5850, tiktok: 3890 },
    { month: 'Month 3', youtube: 16200, instagram: 7850, tiktok: 4900 }
  ]

  const togglePlatform = (platform: string) => {
    if (platform === 'all') {
      setSelectedPlatforms(['all'])
    } else {
      const newPlatforms = selectedPlatforms.filter(p => p !== 'all')
      if (newPlatforms.includes(platform)) {
        const filtered = newPlatforms.filter(p => p !== platform)
        setSelectedPlatforms(filtered.length === 0 ? ['all'] : filtered)
      } else {
        setSelectedPlatforms([...newPlatforms, platform])
      }
    }
  }

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: DollarSign, color: '#22c55e' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#FF0000' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F' },
    { id: 'tiktok', name: 'TikTok', icon: Music, color: '#000000' }
  ]

  // Brand campaigns (manually tracked)
  const brandCampaigns = [
    {
      id: 1,
      brand: 'TechCo Inc.',
      amount: 12500,
      status: 'Completed',
      date: '2025-10-01',
      platform: 'YouTube',
      deliverables: '1 video, 3 stories'
    },
    {
      id: 2,
      brand: 'Fashion Brand',
      amount: 8000,
      status: 'In Progress',
      date: '2025-10-15',
      platform: 'Instagram',
      deliverables: '5 posts, 1 reel'
    },
    {
      id: 3,
      brand: 'Food Company',
      amount: 5500,
      status: 'Pending Payment',
      date: '2025-09-28',
      platform: 'TikTok',
      deliverables: '3 TikToks'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Financial Snapshot</h1>
          <p className="text-gray-600 mt-1">Track your revenue across all platforms</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Total Revenue Section */}
        <div className="mb-8">
          <div className="flex items-baseline space-x-4 mb-6">
            <h2 className="text-4xl font-bold text-gray-900">
              ${getTotalRevenue().toLocaleString()}
            </h2>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-5 w-5 mr-1" />
              <span className="text-lg font-semibold">+{selectedTimeframe === '30d' ? '15.2' : selectedTimeframe === '60d' ? '22.8' : '28.5'}%</span>
            </div>
            <span className="text-gray-600">Total Revenue</span>
          </div>

          {/* Timeframe Selector */}
          <div className="flex space-x-2 mb-6">
            {(['30d', '60d', '90d'] as const).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>

          {/* Platform Checkboxes */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Platform</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {platforms.map((platform) => {
                const Icon = platform.icon
                const isSelected = selectedPlatforms.includes(platform.id)
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <Icon 
                        className="h-6 w-6" 
                        style={{ color: isSelected ? platform.color : '#9ca3af' }}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                        {platform.name}
                      </p>
                      {platform.id !== 'all' && (
                        <p className="text-sm text-gray-500">
                          ${revenueData[selectedTimeframe][platform.id as keyof typeof revenueData['30d']].toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected ? 'border-green-600 bg-green-600' : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Breakdown</h3>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Download className="h-4 w-4" />
                <span className="text-sm">Export</span>
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="youtube" fill="#FF0000" />
                  <Bar dataKey="instagram" fill="#E4405F" />
                  <Bar dataKey="tiktok" fill="#000000" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Brand Campaigns Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Brand Campaigns</h3>
              <p className="text-sm text-gray-600">Manually tracked brand partnerships</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Campaign</span>
            </button>
          </div>

          <div className="space-y-4">
            {brandCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {campaign.brand.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{campaign.brand}</h4>
                    <p className="text-sm text-gray-600">{campaign.deliverables}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {campaign.date}
                      </span>
                      <span className="text-xs text-gray-500">{campaign.platform}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">${campaign.amount.toLocaleString()}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    campaign.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

