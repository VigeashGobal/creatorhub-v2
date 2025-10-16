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
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [contractTitle, setContractTitle] = useState('')
  const [platforms, setPlatforms] = useState('')

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

  const handleAnalyze = async () => {
    if (!fileText.trim()) return
    
    setIsAnalyzing(true)
    setAnalysisResult(null)
    
    try {
      const res = await fetch('/api/legal/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          originalText: fileText, 
          mime: 'text/plain',
          context: {
            title: contractTitle,
            platforms: platforms.split(',').map(s => s.trim()).filter(Boolean)
          }
        })
      })
      
      const data = await res.json()
      console.log('Analyze API Response:', { status: res.status, data })
      if (!res.ok) throw new Error(data?.error || 'Failed to analyze')
      
      // Parse the structured result from the API
      const result = data.result || ''
      console.log('Raw result:', result)
      
      // Parse the structured sections from the API response
      const sections: any = {}
      const lines = result.split('\n').filter((line: string) => line.trim())
      
      let currentSection = ''
      for (const line of lines) {
        // Match section headers (### Section Name: or ## Section Name: or Section Name:)
        if (line.match(/^#{1,3}\s*[A-Z][a-z\s&]+:?$/) || line.match(/^[A-Z][a-z\s&]+:$/)) {
          currentSection = line.replace(/^#{1,3}\s*/, '').replace(':', '').trim()
          sections[currentSection] = []
        } else if (currentSection && (line.startsWith('•') || line.startsWith('-') || line.startsWith('*'))) {
          sections[currentSection].push(line.replace(/^[•\-*]\s*/, '').trim())
        } else if (currentSection && line.trim() && !line.startsWith('#')) {
          sections[currentSection].push(line.trim())
        }
      }
      
      console.log('Parsed sections:', sections)
      
      // Extract and format the sections
      const summary = sections['Summary']?.[0] || 'Analysis completed'
      
      // Key Terms & Payment - combine commercial terms and payment info
      const keyTerms = [
        ...(sections['Key Commercial Terms'] || []),
        ...(sections['Compensation & Payment'] || [])
      ].slice(0, 8)
      
      // Risks & Weak Clauses - combine risk assessment and missing clauses
      const risks = [
        ...(sections['Risk Assessment'] || []),
        ...(sections['Missing/Weak Clauses'] || [])
      ].slice(0, 6)
      
      // Action Items & Negotiation - combine negotiation suggestions and questions
      const suggestions = [
        ...(sections['Negotiation Suggestions'] || []),
        ...(sections['Questions for Counterparty'] || [])
      ].slice(0, 8)
      
      // Questions to Ask - extract from various sections
      const questions = [
        ...(sections['Questions for Counterparty'] || []),
        ...(sections['Risk Assessment'] || []).filter((item: string) => item.includes('?')),
        ...(sections['Negotiation Suggestions'] || []).filter((item: string) => item.includes('?'))
      ].slice(0, 6)
      
      const additionalInfo = {
        ipMusic: sections['IP & Music'] || [],
        questions: questions,
        missingClauses: sections['Missing/Weak Clauses'] || []
      }
      
      console.log('Final parsed data:', {
        summary,
        keyTerms,
        risks,
        suggestions,
        additionalInfo
      })
      
      setAnalysisResult({
        summary,
        keyTerms,
        risks,
        suggestions,
        additionalInfo
      })
    } catch (e: any) {
      console.error('Analysis error:', e)
      setAnalysisResult({ 
        summary: `Analysis failed: ${e.message}`, 
        keyTerms: [], 
        risks: [], 
        suggestions: [] 
      })
    } finally {
      setIsAnalyzing(false)
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
              <p className="text-sm text-gray-600 mb-4">TXT and DOCX are supported. PDF support is temporarily unavailable - please copy/paste PDF text or convert to TXT first.</p>

              {uploadError && (
                <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{uploadError}</div>
              )}

              <input
                type="file"
                accept=".txt,.docx,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={async (e) => {
                  setUploadError('')
                  const f = e.target.files?.[0]
                  if (!f) return
                  if (f.type === 'text/plain' || f.name.toLowerCase().endsWith('.txt')) {
                    const reader = new FileReader()
                    reader.onload = () => {
                      setFileText(String(reader.result || ''))
                      setUploadError('')
                      setShowUploadModal(false)
                    }
                    reader.onerror = () => setUploadError('Failed to read the file. Please try again.')
                    reader.readAsText(f)
                    return
                  }
                  if (f.name.toLowerCase().endsWith('.docx')) {
                    try {
                      setUploadError('Processing file...')
                      const form = new FormData()
                      form.append('file', f)
                      const res = await fetch('/api/legal/extract', { method: 'POST', body: form })
                      const data = await res.json()
                      console.log('API Response:', { status: res.status, data })
                      if (!res.ok) throw new Error(data?.error || 'Failed to extract text')
                      if (!data.text || data.text.trim().length === 0) {
                        throw new Error('No text content found in the document')
                      }
                      setFileText(data.text || '')
                      setUploadError('')
                      setShowUploadModal(false)
                    } catch (err: any) {
                      setUploadError(err.message)
                    }
                    return
                  }
                  setUploadError('Unsupported file type. Please upload DOCX or TXT.')
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

        {/* Upload and Analysis Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upload Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Contract</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contract File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="space-y-2">
                    <div className="text-gray-500">
                      {fileText ? 'Contract loaded successfully' : 'No file selected'}
                    </div>
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Choose File
                    </button>
                    <div className="text-xs text-gray-400">
                      TXT and DOCX files supported
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contract Title</label>
                  <input
                    type="text"
                    value={contractTitle}
                    onChange={(e) => setContractTitle(e.target.value)}
                    placeholder="Contract name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platforms</label>
                  <input
                    type="text"
                    value={platforms}
                    onChange={(e) => setPlatforms(e.target.value)}
                    placeholder="YouTube, Instagram"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contract Analysis</h3>
              <button
                onClick={handleAnalyze}
                disabled={!fileText.trim() || isAnalyzing}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Contract'}
              </button>
            </div>

            {analysisResult && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Summary</h4>
                  <p className="text-green-800">{analysisResult.summary}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Key Terms & Payment</h4>
                    <ul className="text-blue-800 space-y-1">
                      {analysisResult.keyTerms?.map((term: string, index: number) => (
                        <li key={index}>• {term}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">Risks & Weak Clauses</h4>
                    <ul className="text-orange-800 space-y-1">
                      {analysisResult.risks?.map((risk: string, index: number) => (
                        <li key={index}>• {risk}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Action Items & Negotiation</h4>
                    <ul className="text-purple-800 space-y-1">
                      {analysisResult.suggestions?.map((suggestion: string, index: number) => (
                        <li key={index}>• {suggestion}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-900 mb-2">Questions to Ask</h4>
                    <ul className="text-indigo-800 space-y-1">
                      {analysisResult.additionalInfo?.questions?.map((question: string, index: number) => (
                        <li key={index}>• {question}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {analysisResult.additionalInfo?.ipMusic?.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-900 mb-2">IP & Music Rights</h4>
                    <ul className="text-yellow-800 space-y-1">
                      {analysisResult.additionalInfo.ipMusic.map((item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Immediate Action Plan</h4>
                  <div className="text-gray-700 space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <p className="font-semibold text-red-800">🚨 Critical Issues (Address First):</p>
                      <ul className="text-red-700 mt-1 space-y-1">
                        <li>• Payment amount and schedule are missing - this is your biggest risk</li>
                        <li>• Content approval process is undefined - could delay your payment</li>
                        <li>• Usage rights duration not specified - could lock up your content forever</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <p className="font-semibold text-yellow-800">📋 Before You Respond:</p>
                      <ul className="text-yellow-700 mt-1 space-y-1">
                        <li>• Calculate your minimum acceptable rate based on your time and reach</li>
                        <li>• Decide your maximum revision rounds (recommend 2 max)</li>
                        <li>• Set your preferred usage rights duration (6-12 months max)</li>
                        <li>• Prepare your counter-offer with specific terms</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <p className="font-semibold text-blue-800">💬 Your Response Strategy:</p>
                      <ul className="text-blue-700 mt-1 space-y-1">
                        <li>• &quot;I&apos;d love to work together! I need clarification on a few key terms...&quot;</li>
                        <li>• &quot;What&apos;s the payment amount and when would I receive it?&quot;</li>
                        <li>• &quot;How many content revisions are included in the fee?&quot;</li>
                        <li>• &quot;What&apos;s the timeline for content approval and posting?&quot;</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <p className="font-semibold text-green-800">⚖️ Legal Protection:</p>
                      <p className="text-green-700">Before signing, have a contract attorney review the final version. The $200-500 cost could save you thousands in disputes.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!analysisResult && (
              <div className="text-center py-8 text-gray-500">
                Upload a contract and click &quot;Analyze Contract&quot; to get started
              </div>
            )}
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

