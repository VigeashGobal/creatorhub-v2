import { NextRequest, NextResponse } from 'next/server'

const APIFY_API_KEY = process.env.APIFY_API_KEY || ''
const APIFY_USER_ID = process.env.APIFY_USER_ID || ''

export async function POST(request: NextRequest) {
  try {
    const { name, email, youtube, instagram, tiktok } = await request.json()
    
    const analyticsData: any = {
      user: { name, email },
      platforms: {}
    }

    // Fetch TikTok data
    if (tiktok) {
      try {
        const tiktokData = await fetchTikTokData(tiktok)
        analyticsData.platforms.tiktok = tiktokData
      } catch (error) {
        console.error('TikTok fetch error:', error)
        analyticsData.platforms.tiktok = { error: 'Failed to fetch TikTok data' }
      }
    }

    // Fetch Instagram data
    if (instagram) {
      try {
        const instagramData = await fetchInstagramData(instagram)
        analyticsData.platforms.instagram = instagramData
      } catch (error) {
        console.error('Instagram fetch error:', error)
        analyticsData.platforms.instagram = { error: 'Failed to fetch Instagram data' }
      }
    }

    // Fetch YouTube data
    if (youtube) {
      try {
        const youtubeData = await fetchYouTubeData(youtube)
        analyticsData.platforms.youtube = youtubeData
      } catch (error) {
        console.error('YouTube fetch error:', error)
        analyticsData.platforms.youtube = { error: 'Failed to fetch YouTube data' }
      }
    }

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}

async function fetchTikTokData(handle: string) {
  const actorId = '0FXVyOXXEmdGcV88a' // clockworks/tiktok-profile-scraper
  
  const response = await fetch(`https://api.apify.com/v2/acts/${actorId}/runs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${APIFY_API_KEY}`
    },
    body: JSON.stringify({
      input: {
        directUrls: [`https://www.tiktok.com/@${handle.replace('@', '')}`]
      }
    })
  })

  if (!response.ok) {
    throw new Error('Failed to start TikTok scraper')
  }

  const run = await response.json()
  
  // Wait for completion and get results
  const results = await waitForCompletion(run.data.id)
  
  return {
    followers: results?.followerCount || 0,
    following: results?.followingCount || 0,
    likes: results?.heartCount || 0,
    videos: results?.videoCount || 0,
    verified: results?.verified || false,
    bio: results?.signature || '',
    avatar: results?.avatarLarger || ''
  }
}

async function fetchInstagramData(handle: string) {
  const actorId = 'dSCLg0C3YEZ83HzYX' // apify/instagram-profile-scraper
  
  const response = await fetch(`https://api.apify.com/v2/acts/${actorId}/runs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${APIFY_API_KEY}`
    },
    body: JSON.stringify({
      input: {
        directUrls: [`https://www.instagram.com/${handle.replace('@', '')}/`]
      }
    })
  })

  if (!response.ok) {
    throw new Error('Failed to start Instagram scraper')
  }

  const run = await response.json()
  
  // Wait for completion and get results
  const results = await waitForCompletion(run.data.id)
  
  return {
    followers: results?.followersCount || 0,
    following: results?.followsCount || 0,
    posts: results?.postsCount || 0,
    verified: results?.isVerified || false,
    bio: results?.biography || '',
    avatar: results?.profilePicUrl || ''
  }
}

async function fetchYouTubeData(handle: string) {
  const actorId = 'h7sDV53CddomktSi5' // streamers/youtube-scraper
  
  const response = await fetch(`https://api.apify.com/v2/acts/${actorId}/runs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${APIFY_API_KEY}`
    },
    body: JSON.stringify({
      input: {
        searchTerms: [handle.replace('@', '')],
        maxResults: 1
      }
    })
  })

  if (!response.ok) {
    throw new Error('Failed to start YouTube scraper')
  }

  const run = await response.json()
  
  // Wait for completion and get results
  const results = await waitForCompletion(run.data.id)
  
  return {
    subscribers: results?.subscriberCount || 0,
    videos: results?.videoCount || 0,
    views: results?.viewCount || 0,
    verified: results?.verified || false,
    title: results?.title || '',
    avatar: results?.avatar || ''
  }
}

async function waitForCompletion(runId: string) {
  let attempts = 0
  const maxAttempts = 30 // 5 minutes max wait time
  
  while (attempts < maxAttempts) {
    const statusResponse = await fetch(`https://api.apify.com/v2/actor-runs/${runId}`, {
      headers: {
        'Authorization': `Bearer ${APIFY_API_KEY}`
      }
    })
    
    const status = await statusResponse.json()
    
    if (status.data.status === 'SUCCEEDED') {
      const resultsResponse = await fetch(`https://api.apify.com/v2/actor-runs/${runId}/dataset/items`, {
        headers: {
          'Authorization': `Bearer ${APIFY_API_KEY}`
        }
      })
      
      const results = await resultsResponse.json()
      return results.items?.[0] || null
    }
    
    if (status.data.status === 'FAILED') {
      throw new Error('Scraper run failed')
    }
    
    // Wait 10 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 10000))
    attempts++
  }
  
  throw new Error('Scraper run timed out')
}
