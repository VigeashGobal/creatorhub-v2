'use client'

import { Card } from '@/components/ui/Card'
import { KpiCard } from '@/components/ui/KpiCard'
import { HeroScore } from '@/components/HeroScore'
import { PortfolioChart } from '@/components/PortfolioChart'
import { RevenueSummary } from '@/components/RevenueSummary'

interface DailyPulseDashboardProps {
  userData: any
  onReset: () => void
}

export default function DailyPulseDashboard({ userData, onReset }: DailyPulseDashboardProps) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 py-6 md:py-8 grid grid-cols-12 gap-4 md:gap-6">
        {/* Hero Score Section */}
        <section className="col-span-12 lg:col-span-5">
          <Card>
            <HeroScore />
          </Card>
        </section>

        {/* KPI Cards Section */}
        <section className="col-span-12 lg:col-span-7 grid grid-cols-12 gap-4 md:gap-6">
          <KpiCard 
            className="col-span-12 md:col-span-6" 
            label="Total Followers" 
            value="294K" 
            delta="+12.5% this month" 
            icon="users" 
          />
          <KpiCard 
            className="col-span-12 md:col-span-6" 
            label="Avg Engagement" 
            value="9.2%" 
            delta="+2.1% this week" 
            icon="heart" 
          />
          <KpiCard 
            className="col-span-12 md:col-span-6" 
            label="Content Views" 
            value="2.4M" 
            delta="+18.3% this month" 
            icon="eye" 
          />
          <KpiCard 
            className="col-span-12 md:col-span-6" 
            label="Comments" 
            value="8.7K" 
            delta="+5.2% this week" 
            icon="message" 
          />
        </section>

        {/* Portfolio Chart Section */}
        <section className="col-span-12 xl:col-span-7">
          <Card>
            <PortfolioChart />
          </Card>
        </section>

        {/* Revenue Summary Section */}
        <section className="col-span-12 xl:col-span-5">
          <Card>
            <RevenueSummary />
          </Card>
        </section>
      </div>
    </div>
  )
}