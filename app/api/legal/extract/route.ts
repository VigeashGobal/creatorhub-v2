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
      // Use pdf2json for serverless compatibility
      const PDFParser = await import('pdf2json')
      const pdfParser = new (PDFParser as any).default()
      
      const extractedText = await new Promise<string>((resolve, reject) => {
        pdfParser.on('pdfParser_dataError', (errData: any) => {
          reject(new Error('Failed to parse PDF: ' + errData.parserError))
        })
        
        pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
          try {
            // Extract text from all pages
            let text = ''
            if (pdfData.Pages) {
              for (const page of pdfData.Pages) {
                if (page.Texts) {
                  for (const textItem of page.Texts) {
                    if (textItem.R) {
                      for (const r of textItem.R) {
                        if (r.T) {
                          text += decodeURIComponent(r.T) + ' '
                        }
                      }
                    }
                  }
                }
              }
            }
            resolve(text.trim())
          } catch (error) {
            reject(new Error('Failed to extract text from PDF'))
          }
        })
        
        pdfParser.parseBuffer(buf)
      })
      
      text = extractedText
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


