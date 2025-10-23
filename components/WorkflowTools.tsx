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
    statusColor: "orange",
    dueDate: "Nov 15"
  },
  {
    id: 2,
    title: "Upload finalized Misfits campaign report",
    status: "Completed",
    statusColor: "green",
    dueDate: "Nov 10"
  },
  {
    id: 3,
    title: "Approve updated legal contract terms",
    status: "In Review",
    statusColor: "purple",
    dueDate: "Nov 12"
  },
  {
    id: 4,
    title: "Submit content performance metrics",
    status: "Due Today",
    statusColor: "blue",
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
    color: "purple"
  },
  {
    id: 2,
    title: "Contract Hub",
    description: "View, sign, and manage all influencer agreements and renewals in one central dashboard.",
    icon: FileText,
    color: "blue"
  },
  {
    id: 3,
    title: "One-Click Invoice Generator",
    description: "Automatically generate and send branded invoices linked to campaign deliverables and payout schedules.",
    icon: DollarSign,
    color: "green"
  },
  {
    id: 4,
    title: "Content Calendar",
    description: "Plan and track your upcoming posts, campaigns, and cross-platform activities with predictive insights.",
    icon: CalendarIcon,
    color: "pink"
  }
]

export default function WorkflowTools({ userData, onReset }: WorkflowToolsProps) {
  const [selectedTool, setSelectedTool] = useState<number | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'Due Today':
        return <AlertCircle className="w-4 h-4 text-red-400" />
      case 'In Review':
        return <Clock className="w-4 h-4 text-blue-400" />
      default:
        return <Clock className="w-4 h-4 text-orange-400" />
    }
  }

  const getStatusColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-500'
      case 'orange':
        return 'bg-orange-500'
      case 'purple':
        return 'bg-purple-500'
      case 'blue':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getToolColor = (color: string) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-500'
      case 'blue':
        return 'bg-blue-500'
      case 'green':
        return 'bg-green-500'
      case 'pink':
        return 'bg-pink-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#1A1A2E' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Workflow Tools</h1>
      </div>

      {/* Action Items */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-6" style={{ backgroundColor: '#2A2A3A' }}>
        <div className="flex items-center mb-4">
          <Grid3X3 className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Action Items</h3>
        </div>
        
        <div className="space-y-3">
          {actionItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#3A3A4A' }}>
              <div className="flex items-center flex-1">
                <div className="mr-3">
                  {getStatusIcon(item.status)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white mb-1">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-400">
                    Due: {item.dueDate}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(item.statusColor)}`}>
                  {item.status}
                </div>
                <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Add to Calendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Tools Grid */}
      <div className="grid grid-cols-1 gap-4">
        {workflowTools.map((tool) => (
          <div 
            key={tool.id} 
            className="bg-gray-800 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#2A2A3A' }}
            onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${getToolColor(tool.color)}`}>
                  <tool.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {tool.title}
                  </h3>
                </div>
              </div>
              <ArrowRight 
                className={`w-4 h-4 transition-transform duration-300 ${
                  selectedTool === tool.id ? 'rotate-90' : ''
                } text-gray-400`} 
              />
            </div>
            
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {tool.description}
            </p>
            
            {selectedTool === tool.id && (
              <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#3A3A4A' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-white">
                    Ready to get started?
                  </span>
                  <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded">
                    Launch Tool
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}