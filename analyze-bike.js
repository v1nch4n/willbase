import OpenAI from 'openai'
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const { image, note } = req.body
  try{
    const systemPrompt = `Du analysierst das Bild und gibst zurück was das für ein Model ist, was der Zustand ist und was der Wert ist. Schweizermarkt. Bitte stelle keine Fragen.`
    const userContent = `IMG_BASE64:\n${image}\nHinweis: ${note || ''}`
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent }
      ]
    })
    const text = response?.choices?.[0]?.message?.content || JSON.stringify(response)
    return res.status(200).json({raw: text})
  }catch(err){
    console.error(err)
    return res.status(500).json({error: err.message || String(err)})
  }
}