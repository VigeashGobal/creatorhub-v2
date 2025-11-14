import { z } from 'zod'

const YouTubeSchema = z.object({
  subscribers: z.number(),
  videos: z.number(),
  views: z.number(),
  verified: z.boolean(),
  title: z.string(),
  avatar: z.string(),
})

const InstagramSchema = z.object({
  followers: z.number(),
  following: z.number(),
  posts: z.number(),
  verified: z.boolean(),
  bio: z.string(),
  avatar: z.string(),
})

const TikTokSchema = z.object({
  followers: z.number(),
  following: z.number(),
  likes: z.number(),
  videos: z.number(),
  verified: z.boolean(),
  bio: z.string(),
  avatar: z.string(),
})

const AnalyticsSchema = z.object({
  user: z.object({ name: z.string(), email: z.string() }).optional(),
  platforms: z.object({
    youtube: YouTubeSchema.optional(),
    instagram: InstagramSchema.optional(),
    tiktok: TikTokSchema.optional(),
  }),
  demo: z.boolean().optional(),
})

export type Analytics = z.infer<typeof AnalyticsSchema>

export type GetAnalyticsInput = {
  name?: string
  email?: string
  youtube?: string
  instagram?: string
  tiktok?: string
}

export async function getAnalytics(baseUrl: string, body: GetAnalyticsInput): Promise<Analytics> {
  const res = await fetch(`${baseUrl.replace(/\/$/, '')}/api/fetch-analytics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error(`getAnalytics failed: ${res.status}`)
  }
  const json = await res.json()
  return AnalyticsSchema.parse(json)
}


