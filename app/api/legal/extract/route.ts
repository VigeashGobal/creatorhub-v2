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
      // Use pdfjs-dist for serverless compatibility with proper worker setup
      const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
      
      // Set up worker for serverless environment
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
      
      const loadingTask = pdfjs.getDocument({ data: buf })
      const pdf = await loadingTask.promise
      
      let extractedText = ''
      const maxPages = Math.min(pdf.numPages, 50) // Limit to 50 pages for performance
      
      for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const content = await page.getTextContent()
        const pageText = content.items.map((item: any) => item.str || '').join(' ')
        extractedText += pageText + '\n\n'
      }
      
      text = extractedText.trim()
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


