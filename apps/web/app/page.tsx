'use client'

import { useState, useEffect } from 'react'
import OnboardingForm from '@/components/OnboardingForm'
import DailyPulseDashboard from '@/components/DailyPulseDashboard'
import FinanceDashboard from '@/components/FinanceDashboard'
import ExploreTrends from '@/components/ExploreTrends'
import WorkflowTools from '@/components/WorkflowTools'
import Navigation from '@/components/Navigation'
import MobilePreview from '@/components/MobilePreview'

interface UserData {
  name: string
  youtube?: string
  instagram?: string
  tiktok?: string
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [currentPage, setCurrentPage] = useState('analytics')

  useEffect(() => {
    const savedUserData = localStorage.getItem('creatorhub-user')
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData))
    }
  }, [])

  const handleSaveUserData = (data: UserData) => {
    setUserData(data)
    localStorage.setItem('creatorhub-user', JSON.stringify(data))
  }

  const handleReset = () => {
    setUserData(null)
    localStorage.removeItem('creatorhub-user')
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'analytics':
        return <DailyPulseDashboard userData={userData} onReset={handleReset} />
      case 'trends':
        return <ExploreTrends userData={userData} onReset={handleReset} />
      case 'workflow':
        return <WorkflowTools userData={userData} onReset={handleReset} />
      case 'financial':
        return <FinanceDashboard userData={userData} onReset={handleReset} />
      default:
        return <DailyPulseDashboard userData={userData} onReset={handleReset} />
    }
  }

  if (!userData) {
    return (
      <MobilePreview>
        <OnboardingForm onComplete={handleSaveUserData} />
      </MobilePreview>
    )
  }

  return (
    <MobilePreview>
      <div className="min-h-screen flex" style={{ backgroundColor: '#1A1A2E' }}>
        <Navigation 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
          onReset={handleReset} 
        />
        <div className="flex-1 pb-16 lg:pb-0">
        {renderCurrentPage()}
        </div>
      </div>
    </MobilePreview>
  )
}

