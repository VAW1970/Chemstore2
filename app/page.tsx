'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Verificar se usuário já está logado
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="ChemStore Logo"
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">ChemStore</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sistema de Gerenciamento de Estoque de Reagentes Químicos
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-4">Redirecionando...</p>
      </div>
    </div>
  )
}


