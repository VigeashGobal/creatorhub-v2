'use client'

import { useState } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  FileText,
  CreditCard,
  Clock,
  ArrowUp,
  ArrowDown,
  Zap,
  CheckCircle,
  AlertCircle,
  AlertTriangle
} from 'lucide-react'

interface FinanceDashboardProps {
  userData: any
  onReset: () => void
}

export default function FinanceDashboard({ userData, onReset }: FinanceDashboardProps) {
  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#1A1A2E' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Finance</h1>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card-dark p-4 glow-blue">
          <div className="text-xs text-gray-400 mb-1">Available</div>
          <div className="text-2xl font-bold text-white">$6,240</div>
        </div>
        
        <div className="card-dark p-4 glow-purple">
          <div className="text-xs text-gray-400 mb-1">Pending</div>
          <div className="text-2xl font-bold text-white">$3,510</div>
        </div>
        
        <div className="card-dark p-4 glow-pink">
          <div className="text-xs text-gray-400 mb-1">Overdue</div>
          <div className="text-2xl font-bold text-red-400">$1,240</div>
        </div>
      </div>

      {/* Pay Me Now Button */}
      <div className="text-center mb-6">
        <button className="btn-primary px-6 py-3 flex items-center mx-auto">
          <Zap className="w-5 h-5 mr-2" />
          Pay Me Now
        </button>
      </div>

      {/* Revenue Section */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-6" style={{ backgroundColor: '#2A2A3A' }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Revenue (Last 30d)</h3>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-green-400 font-semibold">+12.4%</span>
          </div>
        </div>
        
        {/* Revenue Chart */}
        <div className="h-32 mb-4">
          <div className="h-full flex items-end justify-between">
            {[20, 35, 25, 45, 30, 55, 40, 65, 50, 75, 60, 85, 70, 90, 80, 95, 85, 100, 90, 95, 85, 100, 90, 95, 85, 100, 90, 95, 85, 100].map((height, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-blue-500 to-cyan-500 rounded-sm"
                style={{
                  width: '2px',
                  height: `${height}%`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming & Invoices Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Upcoming Payments */}
        <div className="bg-gray-800 rounded-xl p-4" style={{ backgroundColor: '#2A2A3A' }}>
          <div className="flex items-center mb-3">
            <Calendar className="w-4 h-4 text-blue-400 mr-2" />
            <h3 className="text-sm font-semibold text-white">Upcoming</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400">Nov 01 · TikTok</div>
              <div className="text-sm font-semibold text-blue-400">$780</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400">Nov 04 · YouTube</div>
              <div className="text-sm font-semibold text-blue-400">$1,120</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400">Nov 08 · IG Collab</div>
              <div className="text-sm font-semibold text-blue-400">$540</div>
            </div>
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-gray-800 rounded-xl p-4" style={{ backgroundColor: '#2A2A3A' }}>
          <div className="flex items-center mb-3">
            <FileText className="w-4 h-4 text-blue-400 mr-2" />
            <h3 className="text-sm font-semibold text-white">Invoices</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400">INV-2041 · Glow Studio</div>
              <div className="bg-red-500 text-white px-2 py-1 rounded text-xs">Overdue</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400">INV-2042 · Nimbus Co.</div>
              <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs">Due Soon</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400">INV-2043 · Orbit Labs</div>
              <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-800 rounded-xl p-4 mb-4" style={{ backgroundColor: '#2A2A3A' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CreditCard className="w-4 h-4 text-blue-400 mr-2" />
            <h3 className="text-sm font-semibold text-white">Payment Methods</h3>
          </div>
          <button className="text-blue-400 text-xs flex items-center">
            Manage
            <ArrowUp className="w-3 h-3 ml-1 rotate-90" />
          </button>
        </div>
        
        <div className="mt-2">
          <div className="text-sm text-gray-400">Visa •••• 4242</div>
        </div>
      </div>

      {/* Next Payout */}
      <div className="flex items-center mb-6">
        <Clock className="w-4 h-4 text-blue-400 mr-2" />
        <span className="text-sm text-gray-400">
          Next payout in <span className="font-semibold text-blue-400">3 days</span>
        </span>
      </div>

      {/* Transaction History */}
      <div className="bg-gray-800 rounded-2xl p-6" style={{ backgroundColor: '#2A2A3A' }}>
        <h3 className="text-lg font-bold text-white mb-4">Transaction History</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">Oct 20 · Brand Collab</div>
            <div className="text-green-400 font-semibold">+$1,240</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">Oct 15 · Ad Revenue</div>
            <div className="text-green-400 font-semibold">+$920</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">Oct 10 · Platform Fee</div>
            <div className="text-red-400 font-semibold">-$120</div>
          </div>
        </div>
      </div>
    </div>
  )
}