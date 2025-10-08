'use client'

import { useState } from 'react'
import { Youtube, Instagram, Music, TrendingUp, Heart, MessageCircle, Eye } from 'lucide-react'
import Image from 'next/image'

interface CompetitorContent {
  id: string
  title: string
  thumbnail: string
  views: string
  likes: string
  comments: string
  platform: 'youtube' | 'instagram' | 'tiktok'
  creator: string
  duration?: string
}

export default function CompetitorCarousel() {
  const [activePlatform, setActivePlatform] = useState<'youtube' | 'instagram' | 'tiktok'>('youtube')

  // Dummy competitor content data
  const competitorContent: Record<'youtube' | 'instagram' | 'tiktok', CompetitorContent[]> = {
    youtube: [
      {
        id: '1',
        title: 'How I Grew My Channel to 1M Subscribers',
        thumbnail: 'https://via.placeholder.com/320x180/FF0000/FFFFFF?text=YouTube+Video',
        views: '2.5M',
        likes: '125K',
        comments: '3.2K',
        platform: 'youtube',
        creator: '@CreatorPro'
      },
      {
        id: '2',
        title: 'Ultimate Content Strategy Guide 2025',
        thumbnail: 'https://via.placeholder.com/320x180/FF0000/FFFFFF?text=YouTube+Video',
        views: '1.8M',
        likes: '98K',
        comments: '2.1K',
        platform: 'youtube',
        creator: '@VideoExpert'
      },
      {
        id: '3',
        title: 'Behind the Scenes: My Creative Process',
        thumbnail: 'https://via.placeholder.com/320x180/FF0000/FFFFFF?text=YouTube+Video',
        views: '950K',
        likes: '54K',
        comments: '1.5K',
        platform: 'youtube',
        creator: '@BehindTheCamera'
      },
      {
        id: '4',
        title: 'Monetization Tips That Actually Work',
        thumbnail: 'https://via.placeholder.com/320x180/FF0000/FFFFFF?text=YouTube+Video',
        views: '1.2M',
        likes: '67K',
        comments: '1.8K',
        platform: 'youtube',
        creator: '@MoneyMaker'
      },
      {
        id: '5',
        title: 'My Best Performing Video Ever - Here&apos;s Why',
        thumbnail: 'https://via.placeholder.com/320x180/FF0000/FFFFFF?text=YouTube+Video',
        views: '3.1M',
        likes: '156K',
        comments: '4.5K',
        platform: 'youtube',
        creator: '@ViralKing'
      }
    ],
    instagram: [
      {
        id: '6',
        title: 'Luxury Lifestyle Content That Converts',
        thumbnail: 'https://via.placeholder.com/320x320/E4405F/FFFFFF?text=Instagram+Post',
        views: '850K',
        likes: '125K',
        comments: '890',
        platform: 'instagram',
        creator: '@LuxuryLife'
      },
      {
        id: '7',
        title: 'Reels Strategy for Maximum Engagement',
        thumbnail: 'https://via.placeholder.com/320x320/E4405F/FFFFFF?text=Instagram+Post',
        views: '1.2M',
        likes: '98K',
        comments: '1.2K',
        platform: 'instagram',
        creator: '@ReelsQueen'
      },
      {
        id: '8',
        title: 'Day in the Life: Content Creator Edition',
        thumbnail: 'https://via.placeholder.com/320x320/E4405F/FFFFFF?text=Instagram+Post',
        views: '645K',
        likes: '76K',
        comments: '654',
        platform: 'instagram',
        creator: '@DailyCreator'
      },
      {
        id: '9',
        title: 'Brand Deal Breakdown: What I Earned',
        thumbnail: 'https://via.placeholder.com/320x320/E4405F/FFFFFF?text=Instagram+Post',
        views: '920K',
        likes: '112K',
        comments: '2.1K',
        platform: 'instagram',
        creator: '@BrandPartner'
      },
      {
        id: '10',
        title: 'My Setup Tour: Camera, Lights & More',
        thumbnail: 'https://via.placeholder.com/320x320/E4405F/FFFFFF?text=Instagram+Post',
        views: '1.5M',
        likes: '145K',
        comments: '1.8K',
        platform: 'instagram',
        creator: '@TechSetup'
      }
    ],
    tiktok: [
      {
        id: '11',
        title: 'Viral Trend Alert: Join Before It&apos;s Too Late',
        thumbnail: 'https://via.placeholder.com/320x400/000000/FFFFFF?text=TikTok+Video',
        views: '4.2M',
        likes: '580K',
        comments: '12K',
        platform: 'tiktok',
        creator: '@TrendSetter'
      },
      {
        id: '12',
        title: 'How to Edit Like a Pro in 60 Seconds',
        thumbnail: 'https://via.placeholder.com/320x400/000000/FFFFFF?text=TikTok+Video',
        views: '2.8M',
        likes: '420K',
        comments: '8.5K',
        platform: 'tiktok',
        creator: '@EditMaster'
      },
      {
        id: '13',
        title: 'Behind the Algorithm: What Really Works',
        thumbnail: 'https://via.placeholder.com/320x400/000000/FFFFFF?text=TikTok+Video',
        views: '3.5M',
        likes: '512K',
        comments: '15K',
        platform: 'tiktok',
        creator: '@AlgoExpert'
      },
      {
        id: '14',
        title: 'My Most Controversial Take on Content',
        thumbnail: 'https://via.placeholder.com/320x400/000000/FFFFFF?text=TikTok+Video',
        views: '5.1M',
        likes: '680K',
        comments: '22K',
        platform: 'tiktok',
        creator: '@HotTakes'
      },
      {
        id: '15',
        title: 'Secret Hack All Creators Should Know',
        thumbnail: 'https://via.placeholder.com/320x400/000000/FFFFFF?text=TikTok+Video',
        views: '6.8M',
        likes: '890K',
        comments: '28K',
        platform: 'tiktok',
        creator: '@HackGuru'
      }
    ]
  }

  const platformIcons = {
    youtube: Youtube,
    instagram: Instagram,
    tiktok: Music
  }

  const platformColors = {
    youtube: 'bg-red-600',
    instagram: 'bg-pink-600',
    tiktok: 'bg-black'
  }

  const PlatformIcon = platformIcons[activePlatform]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Competitor Intelligence</h3>
          <p className="text-sm text-gray-600 mt-1">Top-performing content from your industry</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span>Live monitoring</span>
        </div>
      </div>
      
      {/* Enhanced Platform Tabs */}
      <div className="flex space-x-3 mb-8">
        {(['youtube', 'instagram', 'tiktok'] as const).map((platform) => {
          const Icon = platformIcons[platform]
          return (
            <button
              key={platform}
              onClick={() => setActivePlatform(platform)}
              className={`flex items-center px-6 py-3 rounded-xl transition-all duration-200 font-semibold ${
                activePlatform === platform
                  ? `${platformColors[platform]} text-white shadow-lg transform scale-105`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
              {activePlatform === platform && (
                <div className="ml-2 w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          )
        })}
      </div>

      {/* Content Carousel */}
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {competitorContent[activePlatform].map((content) => (
            <div
              key={content.id}
              className="flex-shrink-0 w-72 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="relative">
                <Image
                  src={content.thumbnail}
                  alt={content.title}
                  width={288}
                  height={192}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute top-3 right-3 ${platformColors[activePlatform]} text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg`}>
                  <PlatformIcon className="h-3 w-3 inline mr-1" />
                  {activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1)}
                </div>
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium">
                  {content.duration || '2:30'}
                </div>
              </div>
              
              <div className="p-5">
                <h4 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {content.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4 font-medium">{content.creator}</p>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Eye className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="text-xs font-bold text-gray-900">{content.views}</div>
                    <div className="text-xs text-gray-500">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Heart className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="text-xs font-bold text-gray-900">{content.likes}</div>
                    <div className="text-xs text-gray-500">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="text-xs font-bold text-gray-900">{content.comments}</div>
                    <div className="text-xs text-gray-500">Comments</div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg text-sm font-bold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Analyze Content
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

