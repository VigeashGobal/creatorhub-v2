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
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="bg-green-600 rounded-lg p-2 mr-4">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CreatorHub</h1>
              <p className="text-sm text-gray-600">Creator Analytics Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageChange(page.id)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === page.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <page.icon className="h-4 w-4 mr-2" />
                {page.name}
              </button>
            ))}
            
            <div className="ml-4 pl-4 border-l border-gray-300">
              <button
                onClick={onReset}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
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
