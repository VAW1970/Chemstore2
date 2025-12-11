'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import StatsCards from '@/components/StatsCards'
import ReagentsTable from '@/components/ReagentsTable'
import { toast } from 'react-toastify'

interface Reagent {
  id: string
  name: string
  brand: string
  quantity: number
  unit: string
  expirationDate: string
  location: string
  shelf: string
  sector: string
  status: 'valid' | 'warning' | 'expired'
  verification: string
  user: {
    name: string
    email: string
  }
  createdAt: string
}

interface Stats {
  total: number
  valid: number
  warning: number
  expired: number
}

export default function ReagentsPage() {
  const [reagents, setReagents] = useState<Reagent[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, valid: 0, warning: 0, expired: 0 })
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const router = useRouter()

  const fetchReagents = async (page = 1, searchTerm = '', status = '') => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      })

      if (searchTerm) params.append('search', searchTerm)
      if (status) params.append('status', status)

      const token = localStorage.getItem('token')
      const response = await fetch(`/api/reagents?${params}`, {
        headers: token ? {
          'Authorization': `Bearer ${token.trim()}`,
        } : {},
      })

      if (response.ok) {
        const data = await response.json()
        setReagents(data.reagents)
        setCurrentPage(data.pagination.page)
        setTotalPages(data.pagination.pages)

        // Calcular estatísticas
        const total = data.pagination.total
        const valid = data.reagents.filter((r: Reagent) => r.status === 'valid').length
        const warning = data.reagents.filter((r: Reagent) => r.status === 'warning').length
        const expired = data.reagents.filter((r: Reagent) => r.status === 'expired').length

        setStats({ total, valid, warning, expired })
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Erro ao carregar reagentes')
      }
    } catch (error) {
      console.error('Erro ao buscar reagentes:', error)
      toast.error('Erro interno do servidor')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReagents()
  }, [])

  const handleSearch = () => {
    setCurrentPage(1)
    fetchReagents(1, search, statusFilter)
  }

  const handlePageChange = (page: number) => {
    fetchReagents(page, search, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    setCurrentPage(1)
    fetchReagents(1, search, status)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este reagente?')) return

    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        toast.error('Token não encontrado. Faça login novamente.')
        router.push('/login')
        return
      }

      const response = await fetch(`/api/reagents/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token.trim()}`,
        },
      })

      if (response.ok) {
        toast.success('Reagente excluído com sucesso!')
        fetchReagents(currentPage, search, statusFilter)
      } else {
        const data = await response.json()
        toast.error(data.error || 'Erro ao excluir reagente')
      }
    } catch (error) {
      console.error('Erro ao excluir reagente:', error)
      toast.error('Erro interno do servidor')
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Título */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Reagentes</h1>
          <button
            onClick={() => router.push('/reagents/new')}
            className="btn-primary"
          >
            Novo Reagente
          </button>
        </div>

        {/* Cards de Estatísticas */}
        <StatsCards stats={stats} />

        {/* Filtros e Busca */}
        <div className="card">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar reagentes..."
                className="input-field"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="input-field md:w-48"
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
              >
                <option value="">Todos os status</option>
                <option value="valid">Válidos</option>
                <option value="warning">Por vencer</option>
                <option value="expired">Vencidos</option>
              </select>
              <button
                onClick={handleSearch}
                className="btn-secondary"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>

        {/* Tabela de Reagentes */}
        <ReagentsTable
          reagents={reagents}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onDelete={handleDelete}
          onEdit={(id) => router.push(`/reagents/${id}/edit`)}
        />
      </div>
    </DashboardLayout>
  )
}
