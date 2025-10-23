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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface FinanceDashboardProps {
  userData: any
  onReset: () => void
}

// Mock data for revenue chart
const revenueData = [
  { day: 1, revenue: 1200 },
  { day: 2, revenue: 1800 },
  { day: 3, revenue: 1500 },
  { day: 4, revenue: 2200 },
  { day: 5, revenue: 1900 },
  { day: 6, revenue: 2400 },
  { day: 7, revenue: 2100 },
  { day: 8, revenue: 1800 },
  { day: 9, revenue: 2500 },
  { day: 10, revenue: 2300 },
  { day: 11, revenue: 2000 },
  { day: 12, revenue: 2800 },
  { day: 13, revenue: 2600 },
  { day: 14, revenue: 2400 },
  { day: 15, revenue: 3000 },
  { day: 16, revenue: 2700 },
  { day: 17, revenue: 2500 },
  { day: 18, revenue: 3200 },
  { day: 19, revenue: 2900 },
  { day: 20, revenue: 2700 },
  { day: 21, revenue: 3400 },
  { day: 22, revenue: 3100 },
  { day: 23, revenue: 2800 },
  { day: 24, revenue: 3600 },
  { day: 25, revenue: 3300 },
  { day: 26, revenue: 3000 },
  { day: 27, revenue: 3800 },
  { day: 28, revenue: 3500 },
  { day: 29, revenue: 3200 },
  { day: 30, revenue: 4000 }
]

// Mock transaction data
const transactions = [
  { id: 1, date: 'Oct 20', description: 'Brand Collab', amount: 1240, type: 'credit' },
  { id: 2, date: 'Oct 15', description: 'Ad Revenue', amount: 920, type: 'credit' },
  { id: 3, date: 'Oct 10', description: 'Platform Fee', amount: 120, type: 'debit' }
]

// Mock upcoming payments
const upcomingPayments = [
  { date: 'Nov 01', platform: 'TikTok', amount: 780 },
  { date: 'Nov 04', platform: 'YouTube', amount: 1120 },
  { date: 'Nov 08', platform: 'IG Collab', amount: 540 }
]

// Mock invoices
const invoices = [
  { id: 'INV-2041', company: 'Glow Studio', status: 'Overdue', statusColor: 'error' },
  { id: 'INV-2042', company: 'Nimbus Co.', status: 'Due Soon', statusColor: 'warning' },
  { id: 'INV-2043', company: 'Orbit Labs', status: 'Pending', statusColor: 'info' }
]

export default function FinanceDashboard({ userData, onReset }: FinanceDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d')

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--dark-bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Finance
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Track your earnings and manage payments
          </p>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          <div className="card-dark p-6">
            <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              Available
            </div>
            <div className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              $6,240
            </div>
          </div>
          
          <div className="card-dark p-6">
            <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              Pending
            </div>
            <div className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              $3,510
            </div>
          </div>
          
          <div className="card-dark p-6">
            <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              Overdue
            </div>
            <div className="text-3xl font-bold" style={{ color: 'var(--status-error)' }}>
              $1,240
            </div>
          </div>
        </div>

        {/* Pay Me Now Button */}
        <div className="text-center mb-8">
          <button className="btn-primary flex items-center mx-auto px-8 py-4 text-lg">
            <Zap className="w-6 h-6 mr-3" />
            Pay Me Now
          </button>
        </div>

        {/* Revenue Section */}
        <div className="card-dark p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Revenue (Last 30d)
            </h3>
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" style={{ color: 'var(--status-success)' }} />
              <span className="text-lg font-semibold" style={{ color: 'var(--status-success)' }}>
                +12.4%
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--accent-blue)" 
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming & Invoices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* Upcoming Payments */}
          <div className="card-dark p-6">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 mr-3" style={{ color: 'var(--accent-blue)' }} />
              <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Upcoming
              </h3>
            </div>
            
            <div className="space-y-4">
              {upcomingPayments.map((payment, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {payment.date} · {payment.platform}
                    </div>
                  </div>
                  <div className="text-lg font-semibold" style={{ color: 'var(--accent-blue)' }}>
                    ${payment.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invoices */}
          <div className="card-dark p-6">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 mr-3" style={{ color: 'var(--accent-blue)' }} />
              <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Invoices
              </h3>
            </div>
            
            <div className="space-y-4">
              {invoices.map((invoice, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {invoice.id} · {invoice.company}
                    </div>
                  </div>
                  <div className={`badge-dark badge-${invoice.statusColor}`}>
                    {invoice.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="card-dark p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="w-6 h-6 mr-3" style={{ color: 'var(--accent-blue)' }} />
              <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Payment Methods
              </h3>
            </div>
            <button className="flex items-center text-sm" style={{ color: 'var(--accent-blue)' }}>
              Manage
              <ArrowUp className="w-4 h-4 ml-1 rotate-90" />
            </button>
          </div>
          
          <div className="mt-4">
            <div className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Visa •••• 4242
            </div>
          </div>
        </div>

        {/* Next Payout */}
        <div className="flex items-center mb-8">
          <Clock className="w-6 h-6 mr-3" style={{ color: 'var(--accent-blue)' }} />
          <span className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Next payout in <span className="font-semibold" style={{ color: 'var(--accent-blue)' }}>3 days</span>
          </span>
        </div>

        {/* Transaction History */}
        <div className="card-dark p-8">
          <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Transaction History
          </h3>
          
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {transaction.date} · {transaction.description}
                  </div>
                </div>
                <div 
                  className={`text-lg font-semibold ${
                    transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
