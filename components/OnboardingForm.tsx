'use client'

import { useState } from 'react'
import { User, Mail, Youtube, Instagram, Music, ArrowRight } from 'lucide-react'

interface OnboardingFormProps {
  onComplete: (data: any) => void
}

export default function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    youtube: '',
    instagram: '',
    tiktok: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call API to fetch social media data
      const response = await fetch('/api/fetch-analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }

      const analyticsData = await response.json()
      
      onComplete({
        ...formData,
        analytics: analyticsData
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
      // Still complete onboarding even if analytics fail
      onComplete({
        ...formData,
        analytics: null
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1A1A2E' }}>
      <div 
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Get Started</h2>
          <p className="text-gray-600">Enter your details to start tracking your performance</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <User className="inline w-4 h-4 mr-2" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
              placeholder="Enter your full name"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Mail className="inline w-4 h-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
              placeholder="Enter your email"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Youtube className="inline w-4 h-4 mr-2 text-red-600" />
              YouTube Handle
            </label>
            <input
              type="text"
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
              placeholder="@yourhandle or channel name"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Instagram className="inline w-4 h-4 mr-2 text-pink-600" />
              Instagram Handle
            </label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
              placeholder="@yourhandle"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Music className="inline w-4 h-4 mr-2 text-black" />
              TikTok Handle
            </label>
            <input
              type="text"
              name="tiktok"
              value={formData.tiktok}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
              placeholder="@yourhandle"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95"
            style={{
              boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Fetching Analytics...
              </>
            ) : (
              <>
                Get My Analytics
                <ArrowRight className="ml-3 w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}