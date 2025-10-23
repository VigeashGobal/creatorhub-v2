'use client'

import { 
  Home, 
  BarChart3, 
  Search, 
  DollarSign,
  Activity,
  Calendar,
  Grid3X3,
  Settings,
  LogOut
} from 'lucide-react'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
  onReset: () => void
}

export default function Navigation({ currentPage, onPageChange, onReset }: NavigationProps) {
  const pages = [
    { id: 'analytics', name: 'Home', icon: Home },
    { id: 'trends', name: 'Trends', icon: Search },
    { id: 'workflow', name: 'Workflow', icon: Grid3X3 },
    { id: 'financial', name: 'Finance', icon: DollarSign }
  ]

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50" style={{ backgroundColor: 'var(--dark-bg-secondary)' }}>
        <div className="flex justify-around py-2">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange(page.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                currentPage === page.id ? 'active' : ''
              }`}
            >
              <page.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{page.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block sidebar-dark w-64 min-h-screen p-6">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ background: 'var(--gradient-primary)' }}>
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Daily Pulse</h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Creator Analytics</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange(page.id)}
              className={`nav-item-dark w-full flex items-center text-left ${
                currentPage === page.id ? 'active' : ''
              }`}
            >
              <page.icon className="h-5 w-5 mr-3" />
              {page.name}
            </button>
          ))}
        </nav>
        
        {/* Settings */}
        <div className="mt-auto space-y-2">
          <button className="nav-item-dark w-full flex items-center text-left">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </button>
          <button 
            onClick={onReset}
            className="nav-item-dark w-full flex items-center text-left"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}
