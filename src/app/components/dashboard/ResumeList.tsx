'use client'

import { FilePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

const ResumeList = () => {
  const router = useRouter()

  return (
    <div 
      className="border rounded-sm bg-white p-8 w-56 h-80 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition duration-200 cursor-pointer"
      onClick={() => router.push('/resume/contact')}
    >
      <FilePlus size={40} className="text-blue-600 mb-4" />
      <h2 className="text-lg font-semibold text-gray-300 text-center">
        Create new
      </h2>
    </div>
  )
}

export default ResumeList
