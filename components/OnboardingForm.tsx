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
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Started</h2>
        <p className="text-gray-600">Enter your details to start tracking your performance</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-2" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="inline w-4 h-4 mr-2" />
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Youtube className="inline w-4 h-4 mr-2 text-red-600" />
            YouTube Handle
          </label>
          <input
            type="text"
            name="youtube"
            value={formData.youtube}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="@yourhandle or channel name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Instagram className="inline w-4 h-4 mr-2 text-pink-600" />
            Instagram Handle
          </label>
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="@yourhandle"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Music className="inline w-4 h-4 mr-2 text-black" />
            TikTok Handle
          </label>
          <input
            type="text"
            name="tiktok"
            value={formData.tiktok}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="@yourhandle"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Fetching Analytics...
            </>
          ) : (
            <>
              Get My Analytics
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
