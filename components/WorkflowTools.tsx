'use client'

import { useState } from 'react'
import { 
  Grid3X3, 
  Calendar, 
  Scale, 
  FileText, 
  DollarSign, 
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Plus,
  Target,
  Sparkles
} from 'lucide-react'

interface WorkflowToolsProps {
  userData: any
  onReset: () => void
}

// Mock action items data
const actionItems = [
  {
    id: 1,
    title: "Follow up with brand on Q4 deliverables",
    status: "Pending",
    statusColor: "warning",
    dueDate: "Nov 15"
  },
  {
    id: 2,
    title: "Upload finalized Misfits campaign report",
    status: "Completed",
    statusColor: "success",
    dueDate: "Nov 10"
  },
  {
    id: 3,
    title: "Approve updated legal contract terms",
    status: "In Review",
    statusColor: "info",
    dueDate: "Nov 12"
  },
  {
    id: 4,
    title: "Submit content performance metrics",
    status: "Due Today",
    statusColor: "error",
    dueDate: "Today"
  }
]

// Mock workflow tools
const workflowTools = [
  {
    id: 1,
    title: "AI Legal Support Tool",
    description: "Generate or analyze brand deal contracts with instant AI feedback and compliance suggestions.",
    icon: Scale,
    color: "var(--accent-purple)"
  },
  {
    id: 2,
    title: "Contract Hub",
    description: "View, sign, and manage all influencer agreements and renewals in one central dashboard.",
    icon: FileText,
    color: "var(--accent-blue)"
  },
  {
    id: 3,
    title: "One-Click Invoice Generator",
    description: "Automatically generate and send branded invoices linked to campaign deliverables and payout schedules.",
    icon: DollarSign,
    color: "var(--accent-green)"
  },
  {
    id: 4,
    title: "Content Calendar",
    description: "Plan and track your upcoming posts, campaigns, and cross-platform activities with predictive insights.",
    icon: CalendarIcon,
    color: "var(--accent-pink)"
  }
]

export default function WorkflowTools({ userData, onReset }: WorkflowToolsProps) {
  const [selectedTool, setSelectedTool] = useState<number | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4" style={{ color: 'var(--status-success)' }} />
      case 'Due Today':
        return <AlertCircle className="w-4 h-4" style={{ color: 'var(--status-error)' }} />
      case 'In Review':
        return <Clock className="w-4 h-4" style={{ color: 'var(--status-info)' }} />
      default:
        return <Clock className="w-4 h-4" style={{ color: 'var(--status-warning)' }} />
    }
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--dark-bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Workflow Tools
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Streamline your creator workflow with powerful tools
          </p>
        </div>

        {/* Action Items */}
        <div className="card-dark p-8 mb-8">
          <div className="flex items-center mb-6">
            <Grid3X3 className="w-6 h-6 mr-3" style={{ color: 'var(--accent-blue)' }} />
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Action Items
            </h3>
          </div>
          
          <div className="space-y-4">
            {actionItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--dark-bg-tertiary)' }}>
                <div className="flex items-center flex-1">
                  <div className="mr-4">
                    {getStatusIcon(item.status)}
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Due: {item.dueDate}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`badge-dark badge-${item.statusColor}`}>
                    {item.status}
                  </div>
                  <button className="btn-secondary flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {workflowTools.map((tool) => (
            <div 
              key={tool.id} 
              className="card-dark p-6 cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
              style={{
                borderColor: selectedTool === tool.id ? tool.color : 'var(--dark-bg-tertiary)',
                boxShadow: selectedTool === tool.id ? `0 8px 24px ${tool.color}40` : undefined
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{ backgroundColor: `${tool.color}20` }}
                  >
                    <tool.icon className="w-6 h-6" style={{ color: tool.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {tool.title}
                    </h3>
                  </div>
                </div>
                <ArrowRight 
                  className={`w-5 h-5 transition-transform duration-300 ${
                    selectedTool === tool.id ? 'rotate-90' : ''
                  }`} 
                  style={{ color: 'var(--text-muted)' }} 
                />
              </div>
              
              <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {tool.description}
              </p>
              
              {selectedTool === tool.id && (
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--dark-bg-tertiary)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      Ready to get started?
                    </span>
                    <button className="btn-primary text-sm px-4 py-2">
                      Launch Tool
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="card-dark p-8">
            <div className="flex items-center mb-6">
              <Target className="w-6 h-6 mr-3" style={{ color: 'var(--accent-blue)' }} />
              <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Quick Actions
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="btn-secondary flex items-center justify-center p-4">
                <Plus className="w-5 h-5 mr-2" />
                Create New Campaign
              </button>
              
              <button className="btn-secondary flex items-center justify-center p-4">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Content
              </button>
              
              <button className="btn-secondary flex items-center justify-center p-4">
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Ideas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
