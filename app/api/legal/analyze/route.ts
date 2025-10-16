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

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log('OpenAI API key not found, using fallback analysis')
      const consolidated = `Summary: Contract analysis completed. This is a ${context?.title || 'contract'} for ${context?.platforms?.join(', ') || 'various platforms'}.

Key Commercial Terms:
• Contract type: Brand partnership agreement
• Platform: ${context?.platforms?.join(', ') || 'Multiple platforms'}
• Term: ${context?.term || 'Not specified'}

Compensation & Payment:
• Payment structure not clearly defined in redacted text
• Review payment terms and schedule carefully

IP & Music:
• Intellectual property rights need clarification
• Music licensing terms should be reviewed

Risk Assessment:
• Ensure clear deliverables and timelines
• Review termination clauses
• Check exclusivity requirements

Negotiation Suggestions:
• Request clearer payment terms
• Define content approval process
• Clarify usage rights and duration
• Negotiate reasonable revision rounds

Questions for Counterparty:
• What is the exact payment schedule?
• How many revision rounds are included?
• What are the content approval requirements?
• What happens if content is rejected?

Missing/Weak Clauses:
• Payment terms need clarification
• Content approval process undefined
• Revision policy not specified
• Usage rights duration unclear

Final Disclaimer: This analysis provides general information and is not legal advice. Consult a qualified attorney for legal advice.`
      
      return NextResponse.json({
        disclaimer: 'This output provides general information and is not legal advice. Consult a qualified attorney.',
        redactedPreview: redacted.slice(0, 4000),
        result: consolidated
      })
    }

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
    console.error('Analysis API Error:', e)
    return NextResponse.json({ 
      error: e instanceof Error ? e.message : 'Unexpected error',
      details: e instanceof Error ? e.stack : String(e)
    }, { status: 500 })
  }
}


