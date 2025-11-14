'use client'

import { useState, useEffect } from 'react'
import GuidedOnboarding from '@/components/onboarding/GuidedOnboarding'
import DailyPulseDashboard from '@/components/DailyPulseDashboard'
import FinanceDashboard from '@/components/FinanceDashboard'
import ExploreTrends from '@/components/ExploreTrends'
import WorkflowTools from '@/components/WorkflowTools'
import Navigation from '@/components/Navigation'
import MobileTabBar from '@/components/MobileTabBar'
import MobilePreview, { useMobilePreview } from '@/components/MobilePreview'

interface UserData {
  name: string
  youtube?: string
  instagram?: string
  tiktok?: string
}

function AppContent() {
  const { isMobileView, setMobileTabBar } = useMobilePreview()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [currentPage, setCurrentPage] = useState('analytics')

  useEffect(() => {
    const savedUserData = localStorage.getItem('creatorhub-user')
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData))
    }
  }, [])

  // Register mobile tab bar
  useEffect(() => {
    if (isMobileView && userData && setMobileTabBar) {
      setMobileTabBar(
        <MobileTabBar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
        />
      )
    }
    return () => {
      if (setMobileTabBar) {
        setMobileTabBar(null)
      }
    }
  }, [isMobileView, userData, currentPage, setMobileTabBar])

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
    return <GuidedOnboarding onComplete={handleSaveUserData} />
  }

  return (
    <div className={`min-h-screen flex ${isMobileView ? 'max-w-[390px]' : ''}`} style={{ backgroundColor: '#1A1A2E' }}>
      {!isMobileView && (
        <Navigation 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
          onReset={handleReset} 
        />
      )}
      <div className={`flex-1 ${isMobileView ? '' : 'pb-16 lg:pb-0'} w-full`}>
        {renderCurrentPage()}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <MobilePreview>
      <AppContent />
    </MobilePreview>
  )
}

