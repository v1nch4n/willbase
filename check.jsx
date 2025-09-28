import { useState } from 'react'
const initial = {q1:'',q2:'',q3:'',q4:'',q5:'',q6:'',q7:'',q8:''}
export default function Check(){
  const [state,setState]=useState(initial)
  const [result,setResult]=useState(null)
  const [loading,setLoading]=useState(false)
  async function submit(){
    setLoading(true)
    const res = await fetch('/api/check-condition',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({answers: state})
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Zustand Check</h2>
      <div className="grid gap-3">
        {Object.keys(initial).map(k=>(
          <label key={k} className="block">
            <div className="text-sm font-medium">{k}</div>
            <input value={state[k]} onChange={e=>setState({...state,[k]:e.target.value})} className="w-full border px-2 py-1 rounded" />
          </label>
        ))}
      </div>
      <div className="mt-4">
        <button onClick={submit} className="px-4 py-2 bg-blue-600 text-white rounded">Prüfen</button>
      </div>
      {loading && <p>Analysiere...</p>}
      {result && (
        <div className="mt-6">
          <pre className="whitespace-pre-wrap">{JSON.stringify(result,null,2)}</pre>
        </div>
      )}
    </div>
  )
}