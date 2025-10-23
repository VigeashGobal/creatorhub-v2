'use client'

import {
  Activity,
  Search,
  Grid3X3,
  DollarSign,
  Settings,
  LogOut
} from 'lucide-react'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
  onReset: () => void
}

function SidebarItem({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
        active
          ? 'bg-[rgba(255,255,255,0.04)] text-fg-high ring-1 ring-edge-subtle'
          : 'text-fg-base hover:bg-[rgba(255,255,255,0.03)]'
      }`}
    >
      <Icon className="w-5 h-5 text-fg-dim" />
      <span className="text-sm">{label}</span>
    </button>
  )
}

export default function Navigation({ currentPage, onPageChange, onReset }: NavigationProps) {
  const pages = [
    { id: 'analytics', name: 'Pulse', icon: Activity },
    { id: 'trends', name: 'Trends', icon: Search },
    { id: 'workflow', name: 'Workflow', icon: Grid3X3 },
    { id: 'financial', name: 'Finance', icon: DollarSign }
  ]

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-soft border-t border-edge-subtle">
        <div className="flex justify-around py-2">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange(page.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                currentPage === page.id 
                  ? 'bg-[rgba(255,255,255,0.04)] text-fg-high' 
                  : 'text-fg-base hover:bg-[rgba(255,255,255,0.03)]'
              }`}
            >
              <page.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{page.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-bg-soft border-r border-edge-subtle w-64 min-h-screen p-6">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-accent-blue">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-fg-high">Daily Pulse</h1>
            <p className="text-sm text-fg-dim">Creator Analytics</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {pages.map((page) => (
            <SidebarItem
              key={page.id}
              icon={page.icon}
              label={page.name}
              active={currentPage === page.id}
              onClick={() => onPageChange(page.id)}
            />
          ))}
        </nav>
        
        {/* Settings */}
        <div className="mt-auto space-y-2">
          <SidebarItem
            icon={Settings}
            label="Settings"
            onClick={() => {}}
          />
          <SidebarItem
            icon={LogOut}
            label="Sign Out"
            onClick={onReset}
          />
        </div>
      </div>
    </>
  )
}