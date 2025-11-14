import { NextRequest, NextResponse } from 'next/server'

// In-memory store for demo purposes only. Replace with DB in production.
const deviceTokens = new Set<string>()

export async function POST(request: NextRequest) {
  try {
    const { deviceToken, platform, userId } = await request.json()
    if (!deviceToken) {
      return NextResponse.json({ ok: false, error: 'deviceToken required' }, { status: 400 })
    }

    deviceTokens.add(deviceToken)

    return NextResponse.json({ ok: true, stored: true, platform: platform || 'unknown', userId: userId || null })
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 })
  }
}

export async function GET() {
  // Expose count for quick verification during development
  return NextResponse.json({ ok: true, count: deviceTokens.size })
}


