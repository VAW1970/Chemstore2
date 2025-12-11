'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import ReagentForm from '@/components/ReagentForm'
import { toast } from 'react-toastify'

export default function NewReagentPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/reagents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Reagente criado com sucesso!')
        router.push('/dashboard')
      } else {
        toast.error(result.error || 'Erro ao criar reagente')
      }
    } catch (error) {
      console.error('Erro ao criar reagente:', error)
      toast.error('Erro interno do servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Novo Reagente</h1>
          <p className="mt-2 text-sm text-gray-600">
            Adicione um novo reagente ao estoque do laboratório.
          </p>
        </div>

        <ReagentForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </DashboardLayout>
  )
}

