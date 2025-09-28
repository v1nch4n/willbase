import { useState } from 'react'
import ImageUploader from '../components/ImageUploader'
export default function Analyze(){
  const [result,setResult]=useState(null)
  const [loading,setLoading]=useState(false)
  async function handleSubmit(base64){
    setLoading(true)
    const res = await fetch('/api/analyze-bike',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({image: base64, note: 'Seitenansicht - Kettenblattseite'})
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Mehr über mein Velo erfahren</h2>
      <ImageUploader onSubmit={handleSubmit} />
      {loading && <p>Analysiere...</p>}
      {result && (
        <div className="mt-6">
          <h3 className="font-semibold">Ergebnis</h3>
          <pre className="whitespace-pre-wrap">{JSON.stringify(result,null,2)}</pre>
          <a className="inline-block mt-3 px-3 py-2 bg-gray-800 text-white rounded" href="#">PDF herunterladen</a>
        </div>
      )}
    </div>
  )
}