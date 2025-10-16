import { NextResponse } from 'next/server'
import { z } from 'zod'
import { redactAggressive } from '@/lib/redaction'
import { chunkText } from '@/lib/chunk'
import { askOpenAI } from '@/lib/openai'

const BodySchema = z.object({
  originalText: z.string().min(1).max(1_000_000),
  mime: z.string().optional(),
  context: z.object({
    title: z.string().optional(),
    platforms: z.array(z.string()).optional(),
    campaignType: z.string().optional(),
    deliverables: z.string().optional(),
    term: z.string().optional(),
    territory: z.string().optional(),
    compModel: z.string().optional(),
  }).optional()
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = BodySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
    const { originalText, context } = parsed.data

    // Aggressive redaction (only redacted text leaves server)
    const { redacted } = redactAggressive(originalText)
    if (!redacted || redacted.trim().length < 50) {
      return NextResponse.json({ error: 'Document appears empty after redaction. Please upload a text-based version.' }, { status: 400 })
    }

    const headerParts: string[] = []
    if (context?.title) headerParts.push(`Title: ${context.title}`)
    if (context?.platforms?.length) headerParts.push(`Platforms: ${context.platforms.join(', ')}`)
    if (context?.campaignType) headerParts.push(`Campaign: ${context.campaignType}`)
    if (context?.deliverables) headerParts.push(`Deliverables: ${context.deliverables}`)
    if (context?.term) headerParts.push(`Term: ${context.term}`)
    if (context?.territory) headerParts.push(`Territory: ${context.territory}`)
    if (context?.compModel) headerParts.push(`Compensation: ${context.compModel}`)
    const contextHeader = headerParts.length ? `Context:\n${headerParts.join('\n')}\n\n` : ''

    const chunks = chunkText(redacted)
    const analyses: string[] = []
    for (let i = 0; i < chunks.length; i++) {
      const prompt = `${contextHeader}Only use the following redacted contract excerpt. Do not ask for unredacted data. Provide creator-focused guidance, not legal advice.\n\nExcerpt ${i + 1}/${chunks.length}:\n\n${chunks[i]}\n\nFor this excerpt, identify any key terms, risks, and negotiation suggestions relevant to influencer/creator/media contracts.`
      const piece = await askOpenAI(prompt)
      analyses.push(piece)
    }

    // Final consolidation prompt
    const consolidationPrompt = `${contextHeader}You previously produced per-excerpt notes. Consolidate into a single structured guidance output with these sections: Summary; Key Commercial Terms; Compensation & Payment; IP & Music; Risk Assessment; Negotiation Suggestions; Questions for Counterparty; Missing/Weak Clauses; Final Disclaimer (informational only).\n\nPer-excerpt notes:\n${analyses.join('\n\n---\n\n')}`
    const consolidated = await askOpenAI(consolidationPrompt)

    return NextResponse.json({
      disclaimer: 'This output provides general information and is not legal advice. Consult a qualified attorney.',
      redactedPreview: redacted.slice(0, 4000),
      result: consolidated
    })
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}


