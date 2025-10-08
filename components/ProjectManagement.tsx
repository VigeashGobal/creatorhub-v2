'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  DollarSign, 
  FileText, 
  Calendar, 
  Tag,
  Youtube,
  Instagram,
  Music,
  MoreVertical,
  Send,
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  platform: string
  status: 'concept' | 'in-production' | 'editing' | 'sent-for-review' | 'ready-to-post' | 'published'
  budget?: number
  contractId?: string
  tags?: string[]
  dueDate?: string
  createdAt: string
  views?: number
  engagement?: number
}

interface ProjectManagementProps {
  userData: any
  onReset: () => void
}

export default function ProjectManagement({ userData, onReset }: ProjectManagementProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]')
    
    // Check for pending concepts from trending topics
    const pendingConcepts = JSON.parse(localStorage.getItem('pending-concepts') || '[]')
    if (pendingConcepts.length > 0) {
      setProjects([...savedProjects, ...pendingConcepts])
      localStorage.setItem('projects', JSON.stringify([...savedProjects, ...pendingConcepts]))
      localStorage.removeItem('pending-concepts')
    } else {
      setProjects(savedProjects)
    }
  }, [])

  useEffect(() => {
    // Save projects whenever they change
    if (projects.length > 0) {
      localStorage.setItem('projects', JSON.stringify(projects))
    }
  }, [projects])

  // Initialize with dummy projects if empty
  useEffect(() => {
    if (projects.length === 0) {
      const dummyProjects: Project[] = [
        {
          id: '1',
          title: 'AI Content Creation Tutorial',
          description: 'Create a comprehensive tutorial on using AI tools for content creation',
          platform: 'YouTube',
          status: 'concept',
          budget: 5000,
          tags: ['AI', 'Tutorial', 'Education'],
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Product Review: Tech Gadgets',
          description: 'Review latest tech gadgets for the holiday season',
          platform: 'YouTube',
          status: 'in-production',
          budget: 8000,
          contractId: 'contract-001',
          dueDate: '2025-11-01',
          tags: ['Tech', 'Review', 'Sponsored'],
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Behind the Scenes Vlog',
          description: 'Day in the life content showing creative process',
          platform: 'Instagram',
          status: 'editing',
          tags: ['Vlog', 'BTS'],
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Short Form Content Series',
          description: 'Weekly short-form content series on trending topics',
          platform: 'TikTok',
          status: 'ready-to-post',
          dueDate: '2025-10-25',
          tags: ['Trending', 'Series'],
          createdAt: new Date().toISOString()
        },
        {
          id: '5',
          title: 'Collaboration with @CreatorX',
          description: 'Joint content piece with fellow creator',
          platform: 'YouTube',
          status: 'published',
          views: 125000,
          engagement: 8500,
          tags: ['Collaboration'],
          createdAt: new Date().toISOString()
        }
      ]
      setProjects(dummyProjects)
    }
  }, [projects.length])

  const columns = [
    { id: 'concept', title: 'Creative Concepts', color: 'bg-gray-100' },
    { id: 'in-production', title: 'In Production', color: 'bg-blue-100' },
    { id: 'editing', title: 'Editing', color: 'bg-purple-100' },
    { id: 'sent-for-review', title: 'Sent for Review', color: 'bg-yellow-100' },
    { id: 'ready-to-post', title: 'Ready to Post', color: 'bg-green-100' },
    { id: 'published', title: 'Published Content', color: 'bg-indigo-100' }
  ]

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube': return <Youtube className="h-4 w-4 text-red-600" />
      case 'instagram': return <Instagram className="h-4 w-4 text-pink-600" />
      case 'tiktok': return <Music className="h-4 w-4 text-black" />
      default: return null
    }
  }

  const moveProject = (projectId: string, newStatus: Project['status']) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, status: newStatus } : p
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
              <p className="text-gray-600 mt-1">Manage your content pipeline from concept to publish</p>
            </div>
            <button 
              onClick={() => setShowNewProjectModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>New Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="p-6 overflow-x-auto">
        <div className="flex space-x-4 min-w-max">
          {columns.map((column) => {
            const columnProjects = projects.filter(p => p.status === column.id)
            return (
              <div key={column.id} className="flex-shrink-0 w-80">
                <div className={`${column.color} rounded-lg p-4 mb-4`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{column.title}</h3>
                    <span className="text-sm text-gray-600">{columnProjects.length}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {columnProjects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('projectId', project.id)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault()
                        const projectId = e.dataTransfer.getData('projectId')
                        moveProject(projectId, column.id as Project['status'])
                      }}
                    >
                      {/* Project Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getPlatformIcon(project.platform)}
                          <span className="text-xs text-gray-500">{project.platform}</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Project Title */}
                      <h4 className="font-semibold text-gray-900 mb-2">{project.title}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>

                      {/* Project Metadata */}
                      <div className="space-y-2">
                        {project.budget && (
                          <div className="flex items-center space-x-2 text-sm">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="text-gray-700">${project.budget.toLocaleString()}</span>
                          </div>
                        )}
                        
                        {project.contractId && (
                          <div className="flex items-center space-x-2 text-sm">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <button className="text-blue-600 hover:underline">View Contract</button>
                          </div>
                        )}

                        {project.dueDate && (
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="h-4 w-4 text-orange-600" />
                            <span className="text-gray-700">{new Date(project.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}

                        {project.views && (
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4 text-gray-600" />
                              <span className="text-gray-700">{project.views.toLocaleString()}</span>
                            </div>
                            {project.engagement && (
                              <div className="flex items-center space-x-1">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-gray-700">{project.engagement.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-100">
                        {column.id === 'editing' && (
                          <button 
                            onClick={() => moveProject(project.id, 'sent-for-review')}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-yellow-600 text-white rounded text-xs font-medium hover:bg-yellow-700"
                          >
                            <Send className="h-3 w-3" />
                            <span>Send for Review</span>
                          </button>
                        )}
                        {column.id === 'ready-to-post' && (
                          <button 
                            onClick={() => moveProject(project.id, 'published')}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700"
                          >
                            <CheckCircle className="h-3 w-3" />
                            <span>Publish</span>
                          </button>
                        )}
                        {column.id === 'concept' && (
                          <button 
                            onClick={() => moveProject(project.id, 'in-production')}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700"
                          >
                            <Clock className="h-3 w-3" />
                            <span>Start Production</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Card Button */}
                  <button 
                    onClick={() => setShowNewProjectModal(true)}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Plus className="h-5 w-5 mx-auto" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

