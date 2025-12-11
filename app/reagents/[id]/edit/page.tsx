'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import ReagentForm from '@/components/ReagentForm'
import { toast } from 'react-toastify'

export default function EditReagentPage() {
  const [reagent, setReagent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    fetchReagent()
  }, [params.id])

  const fetchReagent = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/reagents/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await response.json()

      if (response.ok) {
        setReagent(data)
      } else {
        toast.error(data.error || 'Erro ao carregar reagente')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Erro ao buscar reagente:', error)
      toast.error('Erro interno do servidor')
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (data: any) => {
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        toast.error('Token não encontrado. Faça login novamente.')
        router.push('/login')
        return
      }

      // Limpar token de espaços e verificar formato
      const cleanToken = token.trim()
      
      if (cleanToken.length < 10) {
        toast.error('Token inválido. Faça login novamente.')
        router.push('/login')
        return
      }

      console.log('📤 Editando reagente - Token presente:', !!cleanToken)
      console.log('📤 Editando reagente - Tamanho do token:', cleanToken.length)
      console.log('📤 Editando reagente - Primeiros 50 chars:', cleanToken.substring(0, 50) + '...')
      
      const response = await fetch(`/api/reagents/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cleanToken}`,
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Reagente atualizado com sucesso!')
        router.push('/dashboard')
      } else {
        toast.error(result.error || 'Erro ao atualizar reagente')
      }
    } catch (error) {
      console.error('Erro ao atualizar reagente:', error)
      toast.error('Erro interno do servidor')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!reagent) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Reagente não encontrado</h3>
          <button
            onClick={() => router.push('/dashboard')}
            className="btn-primary"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </DashboardLayout>
    )
  }

  // Formatar dados para o formulário
  const formData = {
    name: reagent.name,
    brand: reagent.brand,
    quantity: reagent.quantity.toString(),
    unit: reagent.unit,
    expirationDate: new Date(reagent.expirationDate).toISOString().split('T')[0],
    location: reagent.location,
    shelf: reagent.shelf,
    sector: reagent.sector,
    notes: reagent.notes || '',
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Editar Reagente</h1>
          <p className="mt-2 text-sm text-gray-600">
            Atualize as informações do reagente selecionado.
          </p>
        </div>

        <ReagentForm
          initialData={formData}
          onSubmit={handleSubmit}
          loading={saving}
        />
      </div>
    </DashboardLayout>
  )
}

