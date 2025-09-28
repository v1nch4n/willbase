import Link from 'next/link'
export default function Home(){
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">willbase</h1>
        <p className="mb-6">Was möchtest du machen?</p>
        <div className="flex gap-4">
          <Link href="/analyze"><a className="px-4 py-2 bg-blue-600 text-white rounded">Mehr über mein Velo erfahren</a></Link>
          <Link href="/check"><a className="px-4 py-2 border rounded">Zustand check</a></Link>
        </div>
      </div>
    </div>
  )
}