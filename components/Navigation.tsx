'use client'

import { 
  BarChart3, 
  Users, 
  Lightbulb,
  LogOut
} from 'lucide-react'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
  onReset: () => void
}

export default function Navigation({ currentPage, onPageChange, onReset }: NavigationProps) {
  const pages = [
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'crm', name: 'Project Management', icon: Users },
    { id: 'content', name: 'Content Engine', icon: Lightbulb }
  ]

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-2 mr-4">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">CreatorHub</h1>
              <p className="text-sm text-slate-600">Creator Analytics Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageChange(page.id)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === page.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <page.icon className="h-4 w-4 mr-2" />
                {page.name}
              </button>
            ))}
            
            <div className="ml-4 pl-4 border-l border-slate-300">
              <button
                onClick={onReset}
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200"
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
