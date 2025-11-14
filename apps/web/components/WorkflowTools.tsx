'use client'

import { useState } from 'react'
import { Card, KpiCard } from '@creatorhub/ui'
import { CheckCircle, Plus, FileText, Lightbulb, Calendar, Zap, Edit, DollarSign, Target, TrendingUp, Flame } from 'lucide-react'
import { loadGamificationState, generateNextBestActions, updateStreak } from '../lib/gamification'
import { MoneyIndicator } from './gamification/MoneyIndicator'
import { ProgressBar } from './gamification/ProgressBar'
import { StreakCounter } from './gamification/StreakCounter'
import { NextBestAction } from './gamification/NextBestAction'
import { CelebrationModal } from './gamification/CelebrationModal'
import { loadAccessibilityPreferences } from '../lib/accessibility'

interface WorkflowToolsProps {
  userData: any
  onReset: () => void
}

interface ActionItem {
  id: number
  title: string
  dueDate: string
  status: 'pending' | 'completed' | 'in-progress'
  revenue: number
  priority: 'high' | 'medium' | 'low'
}

const actionItems: ActionItem[] = [
  { id: 1, title: 'Plan Q4 Content Calendar', dueDate: '2024-11-01', status: 'in-progress', revenue: 5000, priority: 'high' },
  { id: 2, title: 'Review Brand X Contract', dueDate: '2024-10-28', status: 'pending', revenue: 2500, priority: 'high' },
  { id: 3, title: 'Edit "My Day" Vlog', dueDate: '2024-10-25', status: 'completed', revenue: 1200, priority: 'medium' },
  { id: 4, title: 'Schedule Instagram Reels', dueDate: '2024-10-26', status: 'pending', revenue: 800, priority: 'medium' },
  { id: 5, title: 'Negotiate Partnership Deal', dueDate: '2024-11-05', status: 'pending', revenue: 8000, priority: 'high' },
]

const workflowTools = [
  { id: 'legal-support', name: 'Legal Support', description: 'AI-powered contract review and legal advice.', icon: FileText, color: 'accent-blue', revenue: 2000 },
  { id: 'content-optimizer', name: 'Content Optimizer', description: 'Analyze content for engagement and SEO.', icon: Lightbulb, color: 'accent-orange', revenue: 0, revenuePercent: 15 },
  { id: 'invoice-generator', name: 'Invoice Generator', description: 'Create and send professional invoices.', icon: Zap, color: 'accent-green', revenue: 0, revenuePercent: 30 },
  { id: 'social-scheduler', name: 'Social Scheduler', description: 'Plan and automate your social media posts.', icon: Calendar, color: 'accent-purple', revenue: 0, timeSaved: '5 hours/week' },
]

const revenueGoals = [
  { month: 'August', target: 25000, actual: 22400, progress: 89.6 },
  { month: 'September', target: 30000, actual: 0, progress: 0 },
  { month: 'October', target: 35000, actual: 0, progress: 0 },
]

export default function WorkflowTools({ userData, onReset }: WorkflowToolsProps) {
  const [gamificationState, setGamificationState] = useState(loadGamificationState())
  const [tasks, setTasks] = useState<ActionItem[]>(actionItems)
  const [accessibilityPrefs] = useState(loadAccessibilityPreferences())
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationData, setCelebrationData] = useState<any>(null)

  const taskStreak = gamificationState.streaks.find(s => s.type === 'task') || gamificationState.streaks[0]
  const nextBestActions = generateNextBestActions(gamificationState)
  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const totalTaskValue = tasks.filter(t => t.status !== 'completed').reduce((sum, t) => sum + t.revenue, 0)
  const multiplier = taskStreak.multiplier

  const handleTaskComplete = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && task.status !== 'completed') {
        const newState = updateStreak(gamificationState, 'task')
        setGamificationState(newState)
        
        setCelebrationData({
          title: 'Task Completed!',
          description: `You've earned $${task.revenue.toLocaleString()}!`,
          dollarValue: Math.floor(task.revenue * multiplier),
          xpValue: 200,
        })
        setShowCelebration(true)
        
        return { ...task, status: 'completed' as const }
      }
      return task
    }))
  }

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

        {/* Next Best Task */}
        {nextBestActions.length > 0 && (
          <div className="col-span-12 mb-6">
            <NextBestAction actions={nextBestActions.filter(a => a.category === 'challenge' || a.category === 'task')} />
          </div>
        )}

        {/* Revenue Goals */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card>
            <MoneyIndicator amount={revenueGoals[0].actual} size="md" />
            <div className="text-sm text-fg-dim mb-2 mt-2">August Revenue</div>
            <ProgressBar
              current={revenueGoals[0].actual}
              target={revenueGoals[0].target}
              dollarValue={revenueGoals[0].target - revenueGoals[0].actual}
              showMoney={true}
              size="sm"
            />
          </Card>
          
          <Card>
            <MoneyIndicator amount={revenueGoals[1].target} size="md" />
            <div className="text-sm text-fg-dim mb-2 mt-2">September Target</div>
            <div className="text-xs text-accent-green">+20% increase</div>
          </Card>
          
          <Card>
            <MoneyIndicator amount={revenueGoals[2].target} size="md" />
            <div className="text-sm text-fg-dim mb-2 mt-2">October Target</div>
            <div className="text-xs text-accent-green">+16.7% increase</div>
          </Card>
        </div>

        {/* Action Items */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="h2">Action Items</h2>
                <p className="muted">Tasks with revenue potential</p>
              </div>
              <div className="flex items-center gap-2">
                <MoneyIndicator amount={totalTaskValue} size="sm" />
                <span className="text-xs text-fg-dim">available</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {tasks.map((item) => {
                const earnedValue = Math.floor(item.revenue * multiplier)
                
                return (
                  <div 
                    key={item.id} 
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                      item.status === 'completed'
                        ? 'bg-accent-green/10 border-accent-green/30'
                        : 'bg-bg-sunken border-edge-subtle hover:bg-bg-soft'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={item.status === 'completed'}
                        onChange={() => handleTaskComplete(item.id)}
                        className="w-5 h-5 text-accent-blue bg-bg-soft border-edge-subtle rounded focus:ring-accent-blue cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="body font-semibold text-fg-high">{item.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-fg-dim">Due: {item.dueDate}</span>
                          <MoneyIndicator amount={item.status === 'completed' ? earnedValue : item.revenue} size="sm" />
                          {item.status === 'completed' && multiplier > 1 && (
                            <span className="text-xs text-accent-green font-semibold">
                              ×{multiplier.toFixed(1)} multiplier
                            </span>
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
                )
              })}
            </div>
            
            <button className="w-full mt-6 flex items-center justify-center gap-2 p-3 bg-bg-sunken hover:bg-bg-soft rounded-lg transition-colors">
              <Plus className="w-4 h-4 text-fg-dim" />
              <span className="text-sm text-fg-dim">Add New Task</span>
            </button>
          </Card>
        </div>

        {/* Task Multiplier & Productivity Streak */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Task Multiplier</h2>
              <Zap className="w-5 h-5 text-accent-blue" />
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-accent-purple/10 to-accent-pink/10 border border-accent-purple/30 rounded-lg">
                <div className="text-sm font-semibold text-fg-high mb-2">Current Multiplier</div>
                <div className="text-4xl font-bold text-accent-purple mb-2">{multiplier.toFixed(1)}x</div>
                <div className="text-xs text-fg-dim">Complete tasks daily to maintain streak</div>
              </div>
              
              <StreakCounter streak={taskStreak} showMultiplier={true} />
            </div>

            <div className="pt-6 border-t border-edge-subtle">
              <div className="text-sm font-semibold text-fg-high mb-3">Completed Today</div>
              <div className="text-3xl font-bold text-accent-green mb-1">{completedTasks}</div>
              <div className="text-xs text-fg-dim">tasks completed</div>
            </div>
          </Card>
        </div>

        {/* Revenue Goals */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Revenue Goals</h2>
              <Target className="w-5 h-5 text-accent-blue" />
            </div>
            
            <div className="space-y-4">
              {revenueGoals.map((goal, index) => {
                const remaining = goal.target - goal.actual
                const isNearMiss = remaining > 0 && remaining < goal.target * 0.2
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-fg-high">{goal.month}</span>
                      <div className="flex items-center gap-2">
                        <MoneyIndicator amount={goal.actual} size="sm" />
                        <span className="text-fg-dim">/</span>
                        <MoneyIndicator amount={goal.target} size="sm" />
                      </div>
                    </div>
                    <ProgressBar
                      current={goal.actual}
                      target={goal.target}
                      dollarValue={goal.target}
                      showMoney={true}
                      size="sm"
                      color={goal.progress >= 100 ? 'green' : 'blue'}
                    />
                    {isNearMiss && (
                      <div className="text-xs text-accent-yellow font-semibold">
                        Only ${remaining.toLocaleString()} away from goal!
                      </div>
                    )}
                    {goal.progress >= 100 && (
                      <div className="text-xs text-accent-green font-semibold">Goal achieved! 🎉</div>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Revenue-Boosting Tools */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="h2">Revenue-Boosting Tools</h2>
              <Zap className="w-6 h-6 text-accent-blue" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workflowTools.map((tool) => (
                <div key={tool.id} className="p-4 bg-bg-sunken rounded-lg hover:bg-bg-soft transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <tool.icon className={`w-6 h-6 text-${tool.color} group-hover:scale-110 transition-transform`} />
                    <h3 className="body font-semibold text-fg-high">{tool.name}</h3>
                  </div>
                  <p className="text-sm text-fg-dim mb-3">{tool.description}</p>
                  <div className="flex items-center gap-1 text-xs text-accent-green font-semibold">
                    <DollarSign className="w-3 h-3" />
                    {tool.revenue > 0 && `Save $${tool.revenue.toLocaleString()}+`}
                    {tool.revenuePercent && `Increase revenue by ${tool.revenuePercent}%`}
                    {tool.timeSaved && tool.timeSaved}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebration && celebrationData && (
        <CelebrationModal
          isOpen={showCelebration}
          onClose={() => {
            setShowCelebration(false)
            setCelebrationData(null)
          }}
          title={celebrationData.title}
          description={celebrationData.description}
          dollarValue={celebrationData.dollarValue}
          xpValue={celebrationData.xpValue}
          accessibilityPrefs={accessibilityPrefs}
        />
      )}
    </div>
  )
}
