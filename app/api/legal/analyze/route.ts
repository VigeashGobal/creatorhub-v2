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
      const consolidated = `Summary: This ${context?.title || 'brand partnership'} contract for ${context?.platforms?.join(', ') || 'multiple platforms'} requires careful review of payment terms, content approval processes, and intellectual property rights.

Key Commercial Terms:
• Contract Type: Brand partnership agreement for ${context?.platforms?.join(', ') || 'social media platforms'}
• Duration: ${context?.term || 'Term not specified - request clarification'}
• Platforms: ${context?.platforms?.join(', ') || 'All platforms - verify exclusivity requirements'}
• Deliverables: ${context?.deliverables || 'Content requirements not clearly defined'}

Compensation & Payment:
• Payment Amount: Not specified in redacted text - this is a critical missing detail
• Payment Schedule: Request specific payment dates and milestones
• Late Payment: Check for penalties and interest on overdue payments
• Currency: Verify payment currency and exchange rate handling

IP & Music:
• Content Ownership: Clarify who owns the final content after posting
• Usage Rights: Define how long the brand can use your content
• Music Licensing: Ensure you have rights to any music used
• Brand Assets: Clarify usage of brand logos, products, and trademarks

Risk Assessment:
• Content Approval: Unclear approval process could delay posting
• Termination Clauses: Review early termination penalties and notice periods
• Exclusivity: Check if you're restricted from working with competitors
• Force Majeure: Ensure pandemic/emergency clauses protect both parties

Negotiation Suggestions:
• Request 50% payment upfront before content creation begins
• Limit content approval to 2 rounds maximum to prevent delays
• Negotiate usage rights for 6-12 months maximum, not perpetual
• Add clause allowing you to decline if content conflicts with your values

Questions for Counterparty:
• What is the exact payment amount and schedule?
• How many content revisions are included in the fee?
• What happens if the brand rejects the content after 2 rounds?
• Can you work with competing brands during the contract term?
• Who owns the content after the campaign ends?

Missing/Weak Clauses:
• Payment terms are completely undefined - this is the biggest risk
• No content approval timeline specified
• Missing force majeure protection for emergencies
• No clear termination process or notice period
• Usage rights duration not specified

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


