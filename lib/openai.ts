import OpenAI from 'openai'

export function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY')
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

export async function askOpenAI(prompt: string, model = 'gpt-4o-mini', temperature = 0.2) {
  const client = getOpenAIClient()
  const res = await client.chat.completions.create({
    model,
    temperature,
    messages: [
      { role: 'system', content: 'You are a contracts analyst specializing in influencer, creator, and media agreements. Provide general guidance only and clearly state that this is not legal advice.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 1200
  })
  return res.choices?.[0]?.message?.content || ''
}


