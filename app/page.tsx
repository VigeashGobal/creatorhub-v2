'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Youtube,
  Instagram,
  Music
} from 'lucide-react'
import OnboardingForm from '@/components/OnboardingForm'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import CRMDashboard from '@/components/CRMDashboard'
import ContentEngine from '@/components/ContentEngine'
import Navigation from '@/components/Navigation'

export default function Home() {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState('analytics')

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedData = localStorage.getItem('creatorhub-user')
    if (storedData) {
      setUserData(JSON.parse(storedData))
    }
  }, [])

  const handleOnboardingComplete = (data: any) => {
    setUserData(data)
    localStorage.setItem('creatorhub-user', JSON.stringify(data))
  }

  const handleReset = () => {
    setUserData(null)
    localStorage.removeItem('creatorhub-user')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-2xl p-4 shadow-xl">
                  <BarChart3 className="h-12 w-12 text-indigo-600" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-slate-900 mb-6">
                CreatorHub
                <span className="block text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Analytics
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Track your performance across all social media platforms with comprehensive analytics, 
                beautiful visualizations, and actionable insights.
              </p>
              
              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <TrendingUp className="h-8 w-8 text-green-500 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Real-time Analytics</h3>
                  <p className="text-slate-600">Track your growth across YouTube, Instagram, and TikTok with live data updates.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <Users className="h-8 w-8 text-blue-500 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Audience Insights</h3>
                  <p className="text-slate-600">Understand your audience with detailed engagement metrics and content performance.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <Zap className="h-8 w-8 text-purple-500 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Smart Insights</h3>
                  <p className="text-slate-600">Get AI-powered recommendations to optimize your content strategy.</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">3</div>
                  <div className="text-sm text-slate-600">Platforms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">24/7</div>
                  <div className="text-sm text-slate-600">Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">∞</div>
                  <div className="text-sm text-slate-600">Insights</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">100%</div>
                  <div className="text-sm text-slate-600">Free</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Onboarding Form */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Get Started</h2>
              <p className="text-slate-600">Connect your social media accounts to begin tracking your performance</p>
            </div>
            <OnboardingForm onComplete={handleOnboardingComplete} />
          </div>
        </div>
      </div>
    )
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'analytics':
        return <AnalyticsDashboard userData={userData} onReset={handleReset} />
      case 'crm':
        return <CRMDashboard userData={userData} onReset={handleReset} />
      case 'content':
        return <ContentEngine userData={userData} onReset={handleReset} />
      default:
        return <AnalyticsDashboard userData={userData} onReset={handleReset} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        onReset={handleReset} 
      />
      {renderCurrentPage()}
    </div>
  )
}
