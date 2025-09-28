import { useState } from 'react'
export default function ImageUploader({onSubmit}){
  const [file,setFile]=useState(null)
  const readerAndSend=()=>{
    if(!file) return
    const reader=new FileReader()
    reader.onloadend=()=> onSubmit(reader.result)
    reader.readAsDataURL(file)
  }
  return (
    <div>
      <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <div className="mt-2">
        <button onClick={readerAndSend} className="px-3 py-2 bg-green-600 text-white rounded">Analysieren</button>
      </div>
    </div>
  )
}