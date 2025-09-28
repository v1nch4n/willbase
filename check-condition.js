import OpenAI from 'openai'
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const { answers } = req.body
  try{
    const systemPrompt = `Du nutzt diese Informationen und gibst eine Beurteilung was gemacht werden sollte und weshalb. Bitte stelle keine Fragen. Am Schluss gibst du eine Kostenschätzung-Spanne für 2 Szenarien: \"für mehr sicherheit\" und \"für werterhalt\". Drittes Szenario ist Tuning tips für \"mehr performance\".`
    const userText = `Antworten:\n${JSON.stringify(answers)}`
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userText }
      ]
    })
    const text = response?.choices?.[0]?.message?.content || JSON.stringify(response)
    return res.status(200).json({raw: text})
  }catch(err){
    console.error(err)
    return res.status(500).json({error: err.message || String(err)})
  }
}