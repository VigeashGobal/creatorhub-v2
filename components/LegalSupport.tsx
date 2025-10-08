'use client'

import { useState } from 'react'
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Eye, 
  MessageSquare,
  Send,
  Plus,
  Trash2,
  Link as LinkIcon
} from 'lucide-react'

interface Contract {
  id: string
  name: string
  brand: string
  projectId?: string
  status: 'draft' | 'under-review' | 'approved' | 'signed'
  uploadDate: string
  value: number
  deliverables: string[]
  redlines?: number
}

interface LegalSupportProps {
  userData: any
  onReset: () => void
}

export default function LegalSupport({ userData, onReset }: LegalSupportProps) {
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: '1',
      name: 'Brand Partnership Agreement - TechCo',
      brand: 'TechCo Inc.',
      projectId: '2',
      status: 'signed',
      uploadDate: '2025-09-15',
      value: 8000,
      deliverables: ['1 YouTube video', '3 Instagram stories', '2 TikTok videos']
    },
    {
      id: '2',
      name: 'Influencer Agreement - Fashion Brand',
      brand: 'Fashion Brand',
      status: 'under-review',
      uploadDate: '2025-10-05',
      value: 12000,
      deliverables: ['5 Instagram posts', '1 Instagram reel', '3 stories'],
      redlines: 3
    },
    {
      id: '3',
      name: 'Content License Agreement',
      brand: 'Food Company',
      status: 'draft',
      uploadDate: '2025-10-08',
      value: 5500,
      deliverables: ['3 TikTok videos', 'Usage rights for 6 months']
    }
  ])

  const [showUploadModal, setShowUploadModal] = useState(false)

  const getStatusColor = (status: Contract['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'under-review': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-blue-100 text-blue-800'
      case 'signed': return 'bg-green-100 text-green-800'
    }
  }

  const getStatusIcon = (status: Contract['status']) => {
    switch (status) {
      case 'draft': return <FileText className="h-4 w-4" />
      case 'under-review': return <AlertCircle className="h-4 w-4" />
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'signed': return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Legal Support</h1>
              <p className="text-gray-600 mt-1">Manage contracts and legal documents</p>
            </div>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Contract</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Contract Review Info Box */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">AI Contract Review (Coming Soon)</h3>
              <p className="text-white/90 text-sm">
                Upload your contracts and get AI-powered suggestions for improvements, identify potential risks, 
                and receive recommendations for better terms. Collaborate with brands directly through the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Contracts List */}
        <div className="space-y-4">
          {contracts.map((contract) => (
            <div key={contract.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{contract.name}</h3>
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contract.status)}`}>
                      {getStatusIcon(contract.status)}
                      <span className="ml-1">{contract.status.charAt(0).toUpperCase() + contract.status.slice(1).replace('-', ' ')}</span>
                    </span>
                    {contract.redlines && contract.redlines > 0 && (
                      <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                        {contract.redlines} Redlines
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{contract.brand}</span>
                    <span>•</span>
                    <span>Uploaded {new Date(contract.uploadDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="font-semibold text-green-600">${contract.value.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Deliverables */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Deliverables:</h4>
                <div className="flex flex-wrap gap-2">
                  {contract.deliverables.map((deliverable, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {deliverable}
                    </span>
                  ))}
                </div>
              </div>

              {/* Linked Project */}
              {contract.projectId && (
                <div className="mb-4 flex items-center space-x-2 text-sm">
                  <LinkIcon className="h-4 w-4 text-blue-600" />
                  <button className="text-blue-600 hover:underline">
                    Linked to Project #{contract.projectId}
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                {contract.status === 'under-review' && (
                  <>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span>Approve Changes</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>Request Revisions</span>
                    </button>
                  </>
                )}
                {contract.status === 'approved' && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Send className="h-4 w-4" />
                    <span>Send to Brand</span>
                  </button>
                )}
                {contract.status === 'draft' && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                    <Send className="h-4 w-4" />
                    <span>Submit for Review</span>
                  </button>
                )}
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <MessageSquare className="h-4 w-4" />
                  <span>Add Comment</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* External POC Collaboration Section */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">External Collaboration</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900">John Doe</span>
                  <span className="text-sm text-gray-600">Brand Manager @ TechCo</span>
                </div>
                <p className="text-sm text-gray-700">
                  &quot;The contract looks good. Can we adjust the timeline for deliverables to extend by one week?&quot;
                </p>
                <span className="text-xs text-gray-500 mt-1">2 days ago</span>
              </div>
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Invite External POC</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

