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
    { id: 'trends', name: 'Search', icon: Search },
    { id: 'workflow', name: 'Workflow', icon: Grid3X3 },
    { id: 'financial', name: 'Finance', icon: DollarSign }
  ]

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50" style={{ backgroundColor: '#2D2D3A' }}>
        <div className="flex justify-around py-2">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange(page.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                currentPage === page.id 
                  ? 'text-white' 
                  : 'text-gray-400'
              }`}
              style={{
                backgroundColor: currentPage === page.id ? '#4A9EFF' : 'transparent'
              }}
            >
              <page.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{page.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 min-h-screen p-6" style={{ backgroundColor: '#2D2D3A' }}>
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ background: 'linear-gradient(135deg, #4A9EFF 0%, #8B5CF6 100%)' }}>
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Daily Pulse</h1>
            <p className="text-sm text-gray-400">Creator Analytics</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange(page.id)}
              className={`w-full flex items-center text-left px-4 py-3 rounded-xl transition-all ${
                currentPage === page.id 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
              style={{
                backgroundColor: currentPage === page.id ? '#4A9EFF' : 'transparent'
              }}
            >
              <page.icon className="h-5 w-5 mr-3" />
              {page.name}
            </button>
          ))}
        </nav>
        
        {/* Settings */}
        <div className="mt-auto space-y-2">
          <button className="w-full flex items-center text-left px-4 py-3 rounded-xl text-gray-400 hover:text-white transition-all">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </button>
          <button 
            onClick={onReset}
            className="w-full flex items-center text-left px-4 py-3 rounded-xl text-gray-400 hover:text-white transition-all"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}