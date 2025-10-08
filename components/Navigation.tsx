'use client'

import { 
  BarChart3, 
  Users, 
  Lightbulb,
  LogOut,
  DollarSign,
  Briefcase,
  FileText,
  Receipt
} from 'lucide-react'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
  onReset: () => void
}

export default function Navigation({ currentPage, onPageChange, onReset }: NavigationProps) {
  const pages = [
    { id: 'analytics', name: 'Home', icon: BarChart3 },
    { id: 'financial', name: 'Financial', icon: DollarSign },
    { id: 'content', name: 'Content Engine', icon: Lightbulb },
    { id: 'projects', name: 'Projects', icon: Briefcase },
    { id: 'legal', name: 'Legal', icon: FileText },
    { id: 'invoicing', name: 'Invoicing', icon: Receipt }
  ]

  return (
    <div className="nav-robinhood sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="bg-black rounded-lg p-2 mr-4">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-robinhood-black">CreatorHub</h1>
              <p className="text-sm text-robinhood-gray-600">Creator Analytics Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageChange(page.id)}
                className={`nav-item-robinhood flex items-center ${
                  currentPage === page.id ? 'active' : ''
                }`}
              >
                <page.icon className="h-4 w-4 mr-2" />
                {page.name}
              </button>
            ))}
            
            <div className="ml-4 pl-4 border-l border-robinhood-gray-300">
              <button
                onClick={onReset}
                className="nav-item-robinhood flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
