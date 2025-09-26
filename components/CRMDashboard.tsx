'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus,
  Filter,
  Search,
  BarChart3,
  TrendingUp,
  Target,
  Zap,
  Star,
  MessageSquare,
  FileText,
  Video,
  Image,
  Music,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react'

interface CRMDashboardProps {
  userData: any
  onReset: () => void
}

export default function CRMDashboard({ userData, onReset }: CRMDashboardProps) {
  const [activeTab, setActiveTab] = useState('projects')

  // Dummy data for projects
  const projects = [
    {
      id: 1,
      title: 'Q4 Content Strategy',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-01-15',
      progress: 75,
      team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      description: 'Develop comprehensive content strategy for Q4 including video series, blog posts, and social media campaigns.',
      tasks: [
        { id: 1, title: 'Research trending topics', completed: true },
        { id: 2, title: 'Create content calendar', completed: true },
        { id: 3, title: 'Plan video series', completed: false },
        { id: 4, title: 'Design social media templates', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Brand Partnership Campaign',
      status: 'planning',
      priority: 'medium',
      dueDate: '2024-02-01',
      progress: 30,
      team: ['Sarah Wilson', 'Alex Brown'],
      description: 'Collaborate with major brand for sponsored content series across all platforms.',
      tasks: [
        { id: 1, title: 'Identify potential partners', completed: true },
        { id: 2, title: 'Create partnership proposal', completed: false },
        { id: 3, title: 'Negotiate terms', completed: false },
        { id: 4, title: 'Execute campaign', completed: false }
      ]
    },
    {
      id: 3,
      title: 'YouTube Channel Optimization',
      status: 'completed',
      priority: 'low',
      dueDate: '2023-12-20',
      progress: 100,
      team: ['Tom Davis'],
      description: 'Optimize YouTube channel for better discoverability and engagement.',
      tasks: [
        { id: 1, title: 'Update channel art', completed: true },
        { id: 2, title: 'Optimize video titles', completed: true },
        { id: 3, title: 'Add end screens', completed: true },
        { id: 4, title: 'Create playlists', completed: true }
      ]
    }
  ]

  // Dummy data for team members
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Content Creator',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      status: 'online',
      projects: 3,
      tasks: 8
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Social Media Manager',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      status: 'away',
      projects: 2,
      tasks: 5
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Video Editor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      status: 'online',
      projects: 4,
      tasks: 12
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      role: 'Brand Manager',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      status: 'offline',
      projects: 1,
      tasks: 3
    }
  ]

  // Dummy data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'task_completed',
      user: 'John Doe',
      action: 'completed',
      item: 'Research trending topics',
      time: '2 hours ago',
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'project_created',
      user: 'Jane Smith',
      action: 'created',
      item: 'Brand Partnership Campaign',
      time: '4 hours ago',
      icon: Plus
    },
    {
      id: 3,
      type: 'comment',
      user: 'Mike Johnson',
      action: 'commented on',
      item: 'Q4 Content Strategy',
      time: '6 hours ago',
      icon: MessageSquare
    },
    {
      id: 4,
      type: 'file_uploaded',
      user: 'Sarah Wilson',
      action: 'uploaded',
      item: 'Partnership Proposal.pdf',
      time: '1 day ago',
      icon: FileText
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'planning': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-2 mr-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Project Management</h1>
                <p className="text-sm text-slate-600">Manage your team and projects efficiently</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </button>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200">
                <Users className="h-4 w-4 mr-2" />
                Invite Team
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Projects</p>
                <p className="text-2xl font-bold text-slate-900">12</p>
              </div>
              <BarChart3 className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Team Members</p>
                <p className="text-2xl font-bold text-slate-900">8</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-slate-900">47</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-slate-900">23</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'projects', name: 'Projects', icon: BarChart3 },
                { id: 'team', name: 'Team', icon: Users },
                { id: 'activity', name: 'Activity', icon: Clock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                        {project.priority} priority
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{project.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-700">Progress</span>
                        <span className="text-sm text-slate-600">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Tasks */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-700">Tasks</h4>
                      {project.tasks.map((task) => (
                        <div key={task.id} className="flex items-center space-x-3">
                          <CheckCircle className={`h-4 w-4 ${task.completed ? 'text-green-500' : 'text-slate-400'}`} />
                          <span className={`text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-700'}`}>
                            {task.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="ml-6 text-right">
                    <div className="text-sm text-slate-600 mb-2">Due Date</div>
                    <div className="text-sm font-medium text-slate-900">{project.dueDate}</div>
                    <div className="text-sm text-slate-600 mt-4 mb-2">Team</div>
                    <div className="flex -space-x-2">
                      {project.team.map((member, index) => (
                        <div key={index} className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <Image 
                      src={member.avatar} 
                      alt={member.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusIcon(member.status)}`}></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                    <p className="text-sm text-slate-600">{member.role}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{member.projects}</div>
                    <div className="text-sm text-slate-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{member.tasks}</div>
                    <div className="text-sm text-slate-600">Tasks</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="bg-slate-100 rounded-full p-2">
                    <activity.icon className="h-4 w-4 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">
                      <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.item}</span>
                    </p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
