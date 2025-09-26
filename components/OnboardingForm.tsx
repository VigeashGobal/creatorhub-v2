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
    <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <User className="inline w-4 h-4 mr-2" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 transition-all duration-200"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Mail className="inline w-4 h-4 mr-2" />
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 transition-all duration-200"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Youtube className="inline w-4 h-4 mr-2 text-red-600" />
            YouTube Handle
          </label>
          <input
            type="text"
            name="youtube"
            value={formData.youtube}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 transition-all duration-200"
            placeholder="@yourhandle or channel name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Instagram className="inline w-4 h-4 mr-2 text-pink-600" />
            Instagram Handle
          </label>
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 transition-all duration-200"
            placeholder="@yourhandle"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Music className="inline w-4 h-4 mr-2 text-black" />
            TikTok Handle
          </label>
          <input
            type="text"
            name="tiktok"
            value={formData.tiktok}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 transition-all duration-200"
            placeholder="@yourhandle"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
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
  )
}
