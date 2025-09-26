import { NextRequest, NextResponse } from 'next/server'

const APIFY_API_KEY = process.env.APIFY_API_KEY || ''
const APIFY_USER_ID = process.env.APIFY_USER_ID || ''

export async function POST(request: NextRequest) {
  try {
    const { name, email, youtube, instagram, tiktok } = await request.json()
    
    console.log('Received data:', { name, email, youtube, instagram, tiktok })
    
    const analyticsData: any = {
      user: { name, email },
      platforms: {}
    }

    // Fetch TikTok data
    if (tiktok) {
      console.log('Fetching TikTok data for:', tiktok)
      try {
        const tiktokData = await fetchTikTokData(tiktok)
        analyticsData.platforms.tiktok = tiktokData
      } catch (error) {
        console.error('TikTok fetch error:', error)
        analyticsData.platforms.tiktok = { error: 'Failed to fetch TikTok data' }
      }
    } else {
      console.log('No TikTok handle provided')
    }

    // Fetch Instagram data
    if (instagram) {
      console.log('Fetching Instagram data for:', instagram)
      try {
        const instagramData = await fetchInstagramData(instagram)
        analyticsData.platforms.instagram = instagramData
      } catch (error) {
        console.error('Instagram fetch error:', error)
        analyticsData.platforms.instagram = { error: 'Failed to fetch Instagram data' }
      }
    } else {
      console.log('No Instagram handle provided')
    }

    // Fetch YouTube data
    if (youtube) {
      console.log('Fetching YouTube data for:', youtube)
      try {
        const youtubeData = await fetchYouTubeData(youtube)
        analyticsData.platforms.youtube = youtubeData
      } catch (error) {
        console.error('YouTube fetch error:', error)
        analyticsData.platforms.youtube = { error: 'Failed to fetch YouTube data' }
      }
    } else {
      console.log('No YouTube handle provided')
    }

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}

async function fetchTikTokData(handle: string) {
  console.log('Fetching TikTok data for:', handle)
  const inputData = {
    profiles: [handle.replace('@', '')],
    excludePinnedPosts: false,
    resultsPerPage: 1,
    shouldDownloadCovers: false,
    shouldDownloadSlideshowImages: false,
    shouldDownloadSubtitles: false,
    shouldDownloadVideos: false
  }
  
  console.log('TikTok API Request:', JSON.stringify(inputData, null, 2))
  console.log('APIFY_API_KEY exists:', !!APIFY_API_KEY)
  
  const response = await fetch(`https://api.apify.com/v2/acts/clockworks~free-tiktok-scraper/runs?token=${APIFY_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputData)
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('TikTok API Error:', response.status, errorText)
    throw new Error(`Failed to start TikTok scraper: ${response.status} - ${errorText}`)
  }

  const run = await response.json()
  console.log('TikTok run started:', run.data.id)
  
  // Wait for completion and get results
  const results = await waitForCompletion(run.data.id)
  console.log('TikTok results:', JSON.stringify(results, null, 2))
  
  // Handle case where results is null or empty
  if (!results) {
    console.log('TikTok: No results returned')
    return {
      followers: 0,
      following: 0,
      likes: 0,
      videos: 0,
      verified: false,
      bio: '',
      avatar: ''
    }
  }
  
  return {
    followers: results?.authorMeta?.fans || 0,
    following: results?.authorMeta?.following || 0,
    likes: results?.authorMeta?.heart || 0,
    videos: results?.authorMeta?.video || 0,
    verified: results?.authorMeta?.verified || false,
    bio: results?.authorMeta?.signature || '',
    avatar: results?.authorMeta?.avatar || ''
  }
}

async function fetchInstagramData(handle: string) {
  console.log('Fetching Instagram data for:', handle)
  const inputData = {
    usernames: [handle.replace('@', '')],
    resultsLimit: 1
  }
  
  console.log('Instagram API Request:', JSON.stringify(inputData, null, 2))
  
  const response = await fetch(`https://api.apify.com/v2/acts/apify~instagram-profile-scraper/runs?token=${APIFY_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputData)
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Instagram API Error:', response.status, errorText)
    throw new Error(`Failed to start Instagram scraper: ${response.status} - ${errorText}`)
  }

  const run = await response.json()
  console.log('Instagram run started:', run.data.id)
  
  // Wait for completion and get results
  const results = await waitForCompletion(run.data.id)
  console.log('Instagram results:', JSON.stringify(results, null, 2))
  
  // Handle case where results is null or empty
  if (!results) {
    console.log('Instagram: No results returned')
    return {
      followers: 0,
      following: 0,
      posts: 0,
      verified: false,
      bio: '',
      avatar: ''
    }
  }
  
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
  console.log('Fetching YouTube data for:', handle)
  const cleanHandle = handle.replace('@', '')
  
  // Try different URL formats for YouTube channels
  const possibleUrls = [
    `https://www.youtube.com/@${cleanHandle}`,
    `https://www.youtube.com/c/${cleanHandle}`,
    `https://www.youtube.com/user/${cleanHandle}`,
    `https://www.youtube.com/channel/${cleanHandle}`
  ]
  
  // Use searchQueries as fallback if direct URLs don't work
  const inputData = {
    searchQueries: [cleanHandle],
    maxResults: 1,
    maxResultsShorts: 0,
    maxResultStreams: 0
  }
  
  console.log('YouTube API Request:', JSON.stringify(inputData, null, 2))
  
  const response = await fetch(`https://api.apify.com/v2/acts/streamers~youtube-scraper/runs?token=${APIFY_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputData)
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('YouTube API Error:', response.status, errorText)
    throw new Error(`Failed to start YouTube scraper: ${response.status} - ${errorText}`)
  }

  const run = await response.json()
  console.log('YouTube run started:', run.data.id)
  
  // Wait for completion and get results
  const results = await waitForCompletion(run.data.id)
  console.log('YouTube results:', JSON.stringify(results, null, 2))
  
  // Handle case where results is null or empty
  if (!results) {
    console.log('YouTube: No results returned')
    return {
      subscribers: 0,
      videos: 0,
      views: 0,
      verified: false,
      title: '',
      avatar: ''
    }
  }
  
  // Extract channel data from the first video result
  const channelData = results?.channel || {}
  
  return {
    subscribers: channelData?.subscriberCount || 0,
    videos: channelData?.videoCount || 0,
    views: channelData?.viewCount || 0,
    verified: channelData?.verified || false,
    title: channelData?.title || channelData?.name || '',
    avatar: channelData?.avatar || channelData?.thumbnail || ''
  }
}

async function waitForCompletion(runId: string) {
  let attempts = 0
  const maxAttempts = 30 // 5 minutes max wait time
  
  while (attempts < maxAttempts) {
    const statusResponse = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_API_KEY}`)
    
    const status = await statusResponse.json()
    
    if (status.data.status === 'SUCCEEDED') {
      const resultsResponse = await fetch(`https://api.apify.com/v2/actor-runs/${runId}/dataset/items?token=${APIFY_API_KEY}`)
      
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
