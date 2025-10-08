'use client'

import { useState } from 'react'
import { 
  Plus, 
  Send, 
  Download, 
  Eye, 
  Calendar, 
  DollarSign, 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Folder
} from 'lucide-react'

interface Invoice {
  id: string
  invoiceNumber: string
  brand: string
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  issueDate: string
  dueDate: string
  paidDate?: string
  projectId?: string
  items: {
    description: string
    amount: number
  }[]
}

interface InvoicingProps {
  userData: any
  onReset: () => void
}

export default function Invoicing({ userData, onReset }: InvoicingProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2025-001',
      brand: 'TechCo Inc.',
      amount: 8000,
      status: 'paid',
      issueDate: '2025-09-20',
      dueDate: '2025-10-20',
      paidDate: '2025-10-15',
      projectId: '2',
      items: [
        { description: '1 YouTube video (Sponsored)', amount: 5000 },
        { description: '3 Instagram stories', amount: 1500 },
        { description: '2 TikTok videos', amount: 1500 }
      ]
    },
    {
      id: '2',
      invoiceNumber: 'INV-2025-002',
      brand: 'Fashion Brand',
      amount: 12000,
      status: 'sent',
      issueDate: '2025-10-01',
      dueDate: '2025-11-01',
      projectId: '3',
      items: [
        { description: '5 Instagram posts', amount: 7500 },
        { description: '1 Instagram reel', amount: 2500 },
        { description: '3 Instagram stories', amount: 2000 }
      ]
    },
    {
      id: '3',
      invoiceNumber: 'INV-2025-003',
      brand: 'Food Company',
      amount: 5500,
      status: 'draft',
      issueDate: '2025-10-08',
      dueDate: '2025-11-08',
      items: [
        { description: '3 TikTok videos', amount: 4500 },
        { description: 'Usage rights (6 months)', amount: 1000 }
      ]
    }
  ])

  const [showDocuments, setShowDocuments] = useState(false)

  const documents = [
    { id: '1', name: 'W-9 Form', type: 'Tax Document', uploadDate: '2025-01-15', status: 'Current' },
    { id: '2', name: 'Banking Details', type: 'Payment Info', uploadDate: '2025-01-15', status: 'Current' },
    { id: '3', name: 'Rep Agreement - TalentCo', type: 'Contract', uploadDate: '2025-03-20', status: 'Active' },
    { id: '4', name: 'W-2 (2024)', type: 'Tax Document', uploadDate: '2025-02-01', status: 'Current' }
  ]

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'paid': return 'bg-green-100 text-green-800'
      case 'overdue': return 'bg-red-100 text-red-800'
    }
  }

  const getStatusIcon = (status: Invoice['status']) => {
    switch (status) {
      case 'draft': return <FileText className="h-4 w-4" />
      case 'sent': return <Clock className="h-4 w-4" />
      case 'paid': return <CheckCircle className="h-4 w-4" />
      case 'overdue': return <AlertCircle className="h-4 w-4" />
    }
  }

  const totalRevenue = invoices.reduce((sum, inv) => inv.status === 'paid' ? sum + inv.amount : sum, 0)
  const pendingRevenue = invoices.reduce((sum, inv) => inv.status === 'sent' ? sum + inv.amount : sum, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Invoicing & Payments</h1>
              <p className="text-gray-600 mt-1">Manage invoices and payment documents</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Generate Invoice</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Revenue Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Received</span>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">All time</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Pending Payment</span>
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">${pendingRevenue.toLocaleString()}</p>
            <p className="text-sm text-blue-600 mt-1">Awaiting payment</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Invoices</span>
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{invoices.length}</p>
            <p className="text-sm text-gray-600 mt-1">{invoices.filter(i => i.status === 'draft').length} drafts</p>
          </div>
        </div>

        {/* Invoices List */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{invoice.invoiceNumber}</h3>
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        <span className="ml-1">{invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="font-medium">{invoice.brand}</span>
                      <span>•</span>
                      <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                      {invoice.paidDate && (
                        <>
                          <span>•</span>
                          <span className="text-green-600">Paid: {new Date(invoice.paidDate).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${invoice.amount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Invoice Items */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Items:</h4>
                  <div className="space-y-2">
                    {invoice.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{item.description}</span>
                        <span className="font-medium text-gray-900">${item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  {invoice.status === 'draft' && (
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      <Send className="h-4 w-4" />
                      <span>Send Invoice</span>
                    </button>
                  )}
                  {invoice.status === 'sent' && (
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Set Payment Date</span>
                    </button>
                  )}
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Eye className="h-4 w-4" />
                    <span>Preview</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Payment Documents</h2>
              <p className="text-sm text-gray-600 mt-1">W2, W4, banking details, and rep agreements</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="h-4 w-4" />
              <span>Upload Document</span>
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Folder className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{doc.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.uploadDate}</span>
                    </div>
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {doc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

