'use client'

import { Card } from '@/components/ui/Card'
import { KpiCard } from '@/components/ui/KpiCard'
import { CheckCircle, Plus, MessageSquare, FileText, Lightbulb, Settings, Calendar, Zap, LayoutGrid, Edit, Trash2, Share2, Clock, DollarSign, Target, TrendingUp } from 'lucide-react'

interface WorkflowToolsProps {
  userData: any
  onReset: () => void
}

interface ActionItem {
  id: number
  title: string
  dueDate: string
  status: 'pending' | 'completed' | 'in-progress'
  revenue?: string
  priority: 'high' | 'medium' | 'low'
}

const actionItems: ActionItem[] = [
  { id: 1, title: 'Plan Q4 Content Calendar', dueDate: '2024-11-01', status: 'in-progress', revenue: '$5K potential', priority: 'high' },
  { id: 2, title: 'Review Brand X Contract', dueDate: '2024-10-28', status: 'pending', revenue: '$2.5K', priority: 'high' },
  { id: 3, title: 'Edit "My Day" Vlog', dueDate: '2024-10-25', status: 'completed', revenue: '$1.2K', priority: 'medium' },
  { id: 4, title: 'Schedule Instagram Reels', dueDate: '2024-10-26', status: 'pending', revenue: '$800', priority: 'medium' },
  { id: 5, title: 'Negotiate Partnership Deal', dueDate: '2024-11-05', status: 'pending', revenue: '$8K potential', priority: 'high' },
]

const workflowTools = [
  { id: 'legal-support', name: 'Legal Support', description: 'AI-powered contract review and legal advice.', icon: FileText, color: 'accent-blue', revenue: 'Save $2K+ on legal fees' },
  { id: 'content-optimizer', name: 'Content Optimizer', description: 'Analyze content for engagement and SEO.', icon: Lightbulb, color: 'accent-orange', revenue: 'Increase revenue by 15%' },
  { id: 'invoice-generator', name: 'Invoice Generator', description: 'Create and send professional invoices.', icon: Zap, color: 'accent-green', revenue: 'Get paid 30% faster' },
  { id: 'social-scheduler', name: 'Social Scheduler', description: 'Plan and automate your social media posts.', icon: Calendar, color: 'accent-purple', revenue: 'Save 5 hours/week' },
]

const revenueGoals = [
  { month: 'August', target: 25000, actual: 22400, progress: 89.6 },
  { month: 'September', target: 30000, actual: 0, progress: 0 },
  { month: 'October', target: 35000, actual: 0, progress: 0 },
]

export default function WorkflowTools({ userData, onReset }: WorkflowToolsProps) {
  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-accent-pink/10 text-accent-pink'
      case 'medium': return 'bg-accent-yellow/10 text-accent-yellow'
      case 'low': return 'bg-accent-blue/10 text-accent-blue'
    }
  }

  const getStatusColor = (status: 'pending' | 'completed' | 'in-progress') => {
    switch (status) {
      case 'completed': return 'bg-accent-green/10 text-accent-green'
      case 'in-progress': return 'bg-accent-blue/10 text-accent-blue'
      case 'pending': return 'bg-fg-dim/10 text-fg-dim'
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 py-6 md:py-8 grid grid-cols-12 gap-4 md:gap-6">
        {/* Header */}
        <div className="col-span-12 mb-6">
          <h1 className="h1">Workflow Tools</h1>
          <p className="muted">Streamline your creative process and manage tasks</p>
        </div>

        {/* Revenue Goals */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <KpiCard 
            label="August Revenue" 
            value="$22.4K" 
            delta="89.6% of $25K goal" 
            icon="users" 
          />
          <KpiCard 
            label="September Target" 
            value="$30K" 
            delta="+20% increase" 
            icon="heart" 
          />
          <KpiCard 
            label="October Target" 
            value="$35K" 
            delta="+16.7% increase" 
            icon="eye" 
          />
        </div>

        {/* Action Items */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="h2">Action Items</h2>
                <p className="muted">Tasks with revenue potential</p>
              </div>
              <CheckCircle className="w-6 h-6 text-accent-green" />
            </div>
            
            <div className="space-y-4">
              {actionItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-bg-sunken rounded-lg hover:bg-bg-sunken/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.status === 'completed'}
                      className="w-5 h-5 text-accent-blue bg-bg-soft border-edge-subtle rounded focus:ring-accent-blue"
                    />
                    <div>
                      <div className="body font-semibold text-fg-high">{item.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-fg-dim">Due: {item.dueDate}</span>
                        {item.revenue && (
                          <span className="text-sm font-semibold text-accent-green">{item.revenue}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                      {item.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 flex items-center justify-center gap-2 p-3 bg-bg-sunken hover:bg-bg-sunken/80 rounded-lg transition-colors">
              <Plus className="w-4 h-4 text-fg-dim" />
              <span className="text-sm text-fg-dim">Add New Task</span>
            </button>
          </Card>
        </div>

        {/* Revenue Goals Chart */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Revenue Goals</h2>
              <Target className="w-5 h-5 text-accent-blue" />
            </div>
            
            <div className="space-y-4">
              {revenueGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-fg-high">{goal.month}</span>
                    <span className="text-sm text-fg-high">${goal.actual.toLocaleString()} / ${goal.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-bg-sunken rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-green"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-fg-dim">{goal.progress}% complete</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Workflow Tools */}
        <div className="col-span-12">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Revenue-Boosting Tools</h2>
              <Zap className="w-6 h-6 text-accent-blue" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {workflowTools.map((tool) => (
                <div key={tool.id} className="p-4 bg-bg-sunken rounded-lg hover:bg-bg-sunken/80 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <tool.icon className={`w-6 h-6 text-${tool.color}`} />
                    <h3 className="body font-semibold text-fg-high">{tool.name}</h3>
                  </div>
                  <p className="text-sm text-fg-dim mb-3">{tool.description}</p>
                  <div className="text-xs px-2 py-1 rounded-full bg-accent-green/10 text-accent-green">
                    {tool.revenue}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="col-span-12">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Quick Actions</h2>
              <LayoutGrid className="w-6 h-6 text-accent-blue" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center gap-2 p-4 bg-bg-sunken hover:bg-bg-sunken/80 rounded-lg transition-colors">
                <Plus className="w-5 h-5 text-fg-dim" />
                <span className="text-sm text-fg-dim">Create New Campaign</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-4 bg-bg-sunken hover:bg-bg-sunken/80 rounded-lg transition-colors">
                <Edit className="w-5 h-5 text-fg-dim" />
                <span className="text-sm text-fg-dim">Draft New Post</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-4 bg-bg-sunken hover:bg-bg-sunken/80 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-fg-dim" />
                <span className="text-sm text-fg-dim">Share Analytics Report</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}