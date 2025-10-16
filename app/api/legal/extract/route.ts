import { NextResponse } from 'next/server'

// We intentionally avoid persisting any uploads; everything is processed in-memory

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const filename = (file as any).name || 'upload'
    const mime = file.type || ''
    const ab = await file.arrayBuffer()
    const buf = Buffer.from(ab)

    let text = ''

    if (mime === 'application/pdf' || filename.toLowerCase().endsWith('.pdf')) {
      // For now, return a helpful message about PDF support
      // PDF extraction requires server-side dependencies that don't work well in Vercel serverless
      return NextResponse.json({ 
        error: 'PDF extraction is temporarily unavailable. Please copy and paste the text content directly, or convert the PDF to a text file first.' 
      }, { status: 400 })
    } else if (mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || filename.toLowerCase().endsWith('.docx')) {
      const mammoth = await import('mammoth')
      const result = await mammoth.extractRawText({ buffer: buf })
      text = result.value || ''
    } else if (mime === 'text/plain' || filename.toLowerCase().endsWith('.txt')) {
      text = buf.toString('utf8')
    } else {
      return NextResponse.json({ error: 'Unsupported file type. Please upload PDF, DOCX, or TXT.' }, { status: 400 })
    }

    text = text.replace(/\u0000/g, '')
    if (!text || text.trim().length < 10) {
      return NextResponse.json({ error: 'Could not extract text. Please ensure the file contains selectable text.' }, { status: 400 })
    }

    // Enforce a max size of ~1MB of text
    const MAX_CHARS = 1_000_000
    if (text.length > MAX_CHARS) {
      text = text.slice(0, MAX_CHARS)
    }

    return NextResponse.json({ text })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to extract text' }, { status: 500 })
  }
}


