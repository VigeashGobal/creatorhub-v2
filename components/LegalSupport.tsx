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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

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
  const [fileText, setFileText] = useState('')
  const [redactedPreview, setRedactedPreview] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [context, setContext] = useState({
    title: '',
    platforms: [] as string[],
    campaignType: '',
    deliverables: '',
    term: '',
    territory: '',
    compModel: ''
  })

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
        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowUploadModal(false)}></div>
            <div className="relative bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-lg mx-4 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Contract</h3>
              <p className="text-sm text-gray-600 mb-4">TXT supported now. PDF/DOCX support will be added shortly.</p>

              {uploadError && (
                <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{uploadError}</div>
              )}

              <input
                type="file"
                accept=".txt,.pdf,.docx,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={async (e) => {
                  setUploadError('')
                  const f = e.target.files?.[0]
                  if (!f) return
                  if (f.type === 'text/plain' || f.name.toLowerCase().endsWith('.txt')) {
                    const reader = new FileReader()
                    reader.onload = () => {
                      setFileText(String(reader.result || ''))
                      setShowUploadModal(false)
                    }
                    reader.onerror = () => setUploadError('Failed to read the file. Please try again.')
                    reader.readAsText(f)
                    return
                  }
                  if (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf') || f.name.toLowerCase().endsWith('.docx')) {
                    try {
                      const form = new FormData()
                      form.append('file', f)
                      const res = await fetch('/api/legal/extract', { method: 'POST', body: form })
                      const data = await res.json()
                      if (!res.ok) throw new Error(data?.error || 'Failed to extract text')
                      setFileText(data.text || '')
                      setShowUploadModal(false)
                    } catch (err: any) {
                      setUploadError(err.message)
                    }
                    return
                  }
                  setUploadError('Unsupported file type. Please upload PDF, DOCX, or TXT.')
                }}
                className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
              />

              <div className="mt-4 flex items-center justify-end space-x-2">
                <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
                <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Done</button>
              </div>
            </div>
          </div>
        )}
        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-900 rounded-lg p-4 mb-6">
          This tool provides general informational guidance only and is not legal advice. Consult a qualified attorney for legal advice.
        </div>

        {/* Upload and Analyze Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left: Upload & Context */}
          <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload or Paste Contract</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Paste Text</label>
                <textarea
                  value={fileText}
                  onChange={(e) => setFileText(e.target.value)}
                  className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Paste contract text here (TXT preferred). PDFs/DOCs will be supported soon."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Title"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  value={context.title}
                  onChange={(e) => setContext({ ...context, title: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Platforms (comma)"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  onChange={(e) => setContext({ ...context, platforms: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                />
                <input
                  type="text"
                  placeholder="Campaign type"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  value={context.campaignType}
                  onChange={(e) => setContext({ ...context, campaignType: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Deliverables"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  value={context.deliverables}
                  onChange={(e) => setContext({ ...context, deliverables: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Term"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  value={context.term}
                  onChange={(e) => setContext({ ...context, term: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Territory"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  value={context.territory}
                  onChange={(e) => setContext({ ...context, territory: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Compensation model"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  value={context.compModel}
                  onChange={(e) => setContext({ ...context, compModel: e.target.value })}
                />
              </div>

              <button
                onClick={async () => {
                  setIsAnalyzing(true)
                  setAnalysis('')
                  setRedactedPreview('')
                  try {
                    const res = await fetch('/api/legal/analyze', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ originalText: fileText, mime: 'text/plain', context })
                    })
                    const data = await res.json()
                    if (!res.ok) throw new Error(data?.error || 'Failed to analyze')
                    setRedactedPreview(data.redactedPreview || '')
                    setAnalysis(data.result || '')
                  } catch (e: any) {
                    setAnalysis(`Unable to analyze: ${e.message}`)
                  } finally {
                    setIsAnalyzing(false)
                  }
                }}
                disabled={!fileText || isAnalyzing}
                className={classNames(
                  'w-full flex items-center justify-center px-4 py-2 rounded-lg text-white font-semibold transition-colors',
                  isAnalyzing ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
                )}
              >
                {isAnalyzing ? 'Analyzing…' : 'Analyze (Redacted)'}
              </button>
            </div>
          </div>

          {/* Right: Previews & Results */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Redacted Preview</h3>
              <div className="h-48 overflow-auto whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded p-3">
                {redactedPreview || 'Upload or paste a contract to see a redacted preview.'}
              </div>
              <p className="text-xs text-gray-500 mt-2">Only redacted text is sent to the AI. Sensitive data is removed.</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Guidance (Not Legal Advice)</h3>
              <div className="prose prose-sm max-w-none whitespace-pre-wrap text-gray-900">
                {analysis || 'Run Analyze to receive structured guidance tailored to influencer/creator/media contracts.'}
              </div>
              <div className="mt-3 text-xs text-gray-500">
                This guidance is informational only and not legal advice. Consult a qualified attorney for legal advice.
              </div>
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

