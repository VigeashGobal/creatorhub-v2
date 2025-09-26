'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Youtube, Instagram, Music } from 'lucide-react'
import OnboardingForm from '@/components/OnboardingForm'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'

export default function Home() {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Fetching your analytics...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">CreatorHub</h1>
            <p className="text-gray-600">Track your social media performance across all platforms</p>
          </div>
          <OnboardingForm onComplete={handleOnboardingComplete} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AnalyticsDashboard userData={userData} onReset={handleReset} />
    </div>
  )
}
