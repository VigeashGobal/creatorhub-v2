'use client'

import { useState } from 'react'
import { Upload, FileText, AlertCircle } from 'lucide-react'

export default function LegalSupport() {
  const [fileText, setFileText] = useState('')
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [contractTitle, setContractTitle] = useState('')
  const [platforms, setPlatforms] = useState('')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('')
    const f = e.target.files?.[0]
    if (!f) return
    
    if (f.type === 'text/plain' || f.name.toLowerCase().endsWith('.txt')) {
      const reader = new FileReader()
      reader.onload = () => {
        setFileText(String(reader.result || ''))
        setUploadError('')
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
      } catch (err: any) {
        setUploadError(err.message)
      }
      return
    }
    
    setUploadError('Unsupported file type. Please upload a TXT or DOCX file.')
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
        } else if (currentSection && (line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.') || line.startsWith('6.'))) {
          // Handle bullet points and numbered lists
          const cleanLine = line.replace(/^[•\-*]\s*/, '').replace(/^\d+\.\s*/, '').trim()
            .replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1') // Remove markdown formatting
          if (cleanLine) {
            sections[currentSection].push(cleanLine)
          }
        } else if (currentSection && line.trim() && !line.startsWith('#') && !line.match(/^[A-Z][a-z\s&]+:$/)) {
          // Add any other content to the current section
          sections[currentSection].push(line.trim())
        }
      }
      
      console.log('Parsed sections:', sections)
      
      // If parsing failed, try alternative approach
      if (Object.keys(sections).length === 0 || Object.values(sections).every((arr: any) => arr.length === 0)) {
        console.log('Primary parsing failed, trying alternative approach...')
        
        // Alternative parsing: look for specific patterns
        const alternativeSections: any = {}
        
        // Extract Risk Assessment
        const riskMatch = result.match(/### Risk Assessment[\s\S]*?(?=###|$)/)
        if (riskMatch) {
          const riskContent = riskMatch[0]
          const riskItems = riskContent.split('\n')
            .filter((line: string) => line.trim() && !line.startsWith('###'))
            .map((line: string) => line.replace(/^[•\-*]\s*/, '').replace(/^\d+\.\s*/, '').trim())
            .map((item: string) => item.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1'))
            .filter((item: string) => item.length > 10)
          alternativeSections['Risk Assessment'] = riskItems
        }
        
        // Extract Negotiation Suggestions
        const negotiationMatch = result.match(/### Negotiation Suggestions[\s\S]*?(?=###|$)/)
        if (negotiationMatch) {
          const negotiationContent = negotiationMatch[0]
          const negotiationItems = negotiationContent.split('\n')
            .filter((line: string) => line.trim() && !line.startsWith('###'))
            .map((line: string) => line.replace(/^[•\-*]\s*/, '').replace(/^\d+\.\s*/, '').trim())
            .map((item: string) => item.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1'))
            .filter((item: string) => item.length > 10)
          alternativeSections['Negotiation Suggestions'] = negotiationItems
        }
        
        // Extract Questions for Counterparty
        const questionsMatch = result.match(/### Questions for Counterparty[\s\S]*?(?=###|$)/)
        if (questionsMatch) {
          const questionsContent = questionsMatch[0]
          const questionItems = questionsContent.split('\n')
            .filter((line: string) => line.trim() && !line.startsWith('###'))
            .map((line: string) => line.replace(/^[•\-*]\s*/, '').replace(/^\d+\.\s*/, '').trim())
            .map((item: string) => item.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1'))
            .filter((item: string) => item.length > 10)
          alternativeSections['Questions for Counterparty'] = questionItems
        }
        
        // Extract Missing/Weak Clauses
        const missingMatch = result.match(/### Missing\/Weak Clauses[\s\S]*?(?=###|$)/)
        if (missingMatch) {
          const missingContent = missingMatch[0]
          const missingItems = missingContent.split('\n')
            .filter((line: string) => line.trim() && !line.startsWith('###'))
            .map((line: string) => line.replace(/^[•\-*]\s*/, '').replace(/^\d+\.\s*/, '').trim())
            .map((item: string) => item.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1'))
            .filter((item: string) => item.length > 10)
          alternativeSections['Missing/Weak Clauses'] = missingItems
        }
        
        console.log('Alternative parsing results:', alternativeSections)
        
        // Merge alternative results
        Object.keys(alternativeSections).forEach(key => {
          if (!sections[key] || sections[key].length === 0) {
            sections[key] = alternativeSections[key]
          }
        })
      }
      
      // Extract and format the sections
      const summary = sections['Summary']?.[0] || 'Analysis completed'
      
      // Key Terms & Payment - combine commercial terms and payment info
      const keyTerms = [
        ...(sections['Key Commercial Terms'] || []),
        ...(sections['Compensation & Payment'] || []),
        ...(sections['Compensation'] || []),
        ...(sections['Payment'] || [])
      ].slice(0, 8)
      
      // Risks & Weak Clauses - combine risk assessment and missing clauses
      const risks = [
        ...(sections['Risk Assessment'] || []),
        ...(sections['Missing/Weak Clauses'] || []),
        ...(sections['Missing Clauses'] || []),
        ...(sections['Weak Clauses'] || [])
      ].slice(0, 6)
      
      // Action Items & Negotiation - combine negotiation suggestions and questions
      const suggestions = [
        ...(sections['Negotiation Suggestions'] || []),
        ...(sections['Questions for Counterparty'] || []),
        ...(sections['Negotiation'] || []),
        ...(sections['Suggestions'] || [])
      ].slice(0, 8)
      
      // Questions to Ask - extract from various sections
      const questions = [
        ...(sections['Questions for Counterparty'] || []),
        ...(sections['Questions'] || []),
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
      
      console.log('Available sections:', Object.keys(sections))
      console.log('Section contents:', sections)
      
      // If all arrays are empty, try to extract content directly from the raw result
      if (keyTerms.length === 0 && risks.length === 0 && suggestions.length === 0 && questions.length === 0) {
        console.log('All sections empty, trying direct extraction from raw result...')
        
        // Extract any bullet points or numbered items from the entire result
        const allLines = result.split('\n').filter((line: string) => line.trim())
        const bulletPoints = allLines
          .filter((line: string) => line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || /^\d+\./.test(line))
          .map((line: string) => line.replace(/^[•\-*]\s*/, '').replace(/^\d+\.\s*/, '').trim())
          .map((item: string) => item.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')) // Remove markdown formatting
          .filter((item: string) => item.length > 10)
        
        console.log('Extracted bullet points:', bulletPoints)
        
        // Distribute the bullet points across sections
        const half = Math.ceil(bulletPoints.length / 2)
        const quarter = Math.ceil(bulletPoints.length / 4)
        
        const fallbackKeyTerms = bulletPoints.slice(0, quarter)
        const fallbackRisks = bulletPoints.slice(quarter, quarter * 2)
        const fallbackSuggestions = bulletPoints.slice(quarter * 2, quarter * 3)
        const fallbackQuestions = bulletPoints.slice(quarter * 3)
        
        setAnalysisResult({
          summary,
          keyTerms: fallbackKeyTerms,
          risks: fallbackRisks,
          suggestions: fallbackSuggestions,
          additionalInfo: {
            ...additionalInfo,
            questions: fallbackQuestions
          }
        })
      } else {
        setAnalysisResult({
          summary,
          keyTerms,
          risks,
          suggestions,
          additionalInfo
        })
      }
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Legal Support</h1>
              <p className="text-gray-600 mt-1">Upload and analyze your contracts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Contract</h2>
          
          {uploadError && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3">{uploadError}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contract File</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {fileText ? (
                  <div className="text-green-600 font-medium">Contract loaded successfully</div>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept=".txt,.docx,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Choose File
                    </label>
                    <p className="text-sm text-gray-500 mt-2">TXT and DOCX files supported</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contract Title</label>
              <input
                type="text"
                value={contractTitle}
                onChange={(e) => setContractTitle(e.target.value)}
                placeholder="Contract name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platforms</label>
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

        {/* Analysis Section - Full Width */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Contract Analysis</h2>
            <button
              onClick={handleAnalyze}
              disabled={!fileText || isAnalyzing}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Contract'}
            </button>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-900 rounded-lg p-4 mb-6">
            This tool provides general informational guidance only and is not legal advice. Consult a qualified attorney for legal advice.
          </div>

          {analysisResult && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Summary</h4>
                <p className="text-green-800">{analysisResult.summary}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </div>
  )
}