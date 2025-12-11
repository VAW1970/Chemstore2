'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import StatsCards from '@/components/StatsCards'
import { toast } from 'react-toastify'
import {
  ExclamationTriangleIcon,
  XCircleIcon,
  ArrowRightIcon,
  PlusIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline'
import { formatUnit } from '@/utils/units'

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

export default function DashboardPage() {
  const [criticalReagents, setCriticalReagents] = useState<Reagent[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, valid: 0, warning: 0, expired: 0 })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      
      // Buscar estatísticas gerais
      const statsResponse = await fetch('/api/reagents?limit=1000', {
        headers: token ? {
          'Authorization': `Bearer ${token.trim()}`,
        } : {},
      })
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        const allReagents = statsData.reagents as Reagent[]
        
        // Calcular estatísticas
        const total = statsData.pagination.total
        const valid = allReagents.filter((r: Reagent) => r.status === 'valid').length
        const warning = allReagents.filter((r: Reagent) => r.status === 'warning').length
        const expired = allReagents.filter((r: Reagent) => r.status === 'expired').length
        
        setStats({ total, valid, warning, expired })
        
        // Buscar apenas reagentes críticos (por vencer ou vencidos)
        const critical = allReagents
          .filter((r: Reagent) => r.status === 'warning' || r.status === 'expired')
          .sort((a, b) => {
            // Ordenar por data de validade (mais próximos do vencimento primeiro)
            return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
          })
          .slice(0, 10) // Limitar a 10 mais críticos
        
        setCriticalReagents(critical)
      } else {
        const errorData = await statsResponse.json()
        toast.error(errorData.error || 'Erro ao carregar dados do dashboard')
      }
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error)
      toast.error('Erro interno do servidor')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'expired':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="h-3 w-3 mr-1" />
            Vencido
          </span>
        )
      case 'warning':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            Por Vencer
          </span>
        )
      default:
        return null
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
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Visão geral do estoque de reagentes químicos
            </p>
          </div>
          <button
            onClick={() => router.push('/reagents/new')}
            className="btn-primary flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Novo Reagente
          </button>
        </div>

        {/* Cards de Estatísticas */}
        <StatsCards stats={stats} />

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/reagents"
            className="card hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Ver Todos Reagentes</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Acesse a lista completa de reagentes
                </p>
              </div>
              <ArrowRightIcon className="h-6 w-6 text-indigo-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/reports"
            className="card hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Relatórios</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Gere relatórios em PDF do estoque
                </p>
              </div>
              <ArrowRightIcon className="h-6 w-6 text-indigo-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/reagents/new"
            className="card hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Adicionar Reagente</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Cadastre um novo reagente no sistema
                </p>
              </div>
              <PlusIcon className="h-6 w-6 text-indigo-600 group-hover:scale-110 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Reagentes Críticos */}
        {criticalReagents.length > 0 && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Reagentes que Requerem Atenção</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Reagentes por vencer ou vencidos que precisam de verificação
                </p>
              </div>
              <Link
                href="/reagents"
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
              >
                Ver todos
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reagente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Marca
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Validade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Localização
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {criticalReagents.map((reagent) => (
                    <tr key={reagent.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{reagent.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{reagent.brand}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {reagent.quantity} {formatUnit(reagent.unit)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(reagent.expirationDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {reagent.location} - {reagent.shelf} - {reagent.sector}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(reagent.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => router.push(`/reagents/${reagent.id}/edit`)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Ver detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mensagem quando não há reagentes críticos */}
        {criticalReagents.length === 0 && stats.total > 0 && (
          <div className="card text-center py-12">
            <BeakerIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tudo em ordem! 🎉
            </h3>
            <p className="text-gray-500 mb-4">
              Não há reagentes por vencer ou vencidos no momento.
            </p>
            <Link
              href="/reagents"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Ver todos os reagentes
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
        )}

        {/* Mensagem quando não há reagentes */}
        {stats.total === 0 && (
          <div className="card text-center py-12">
            <BeakerIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum reagente cadastrado
            </h3>
            <p className="text-gray-500 mb-4">
              Comece adicionando seu primeiro reagente ao sistema.
            </p>
            <button
              onClick={() => router.push('/reagents/new')}
              className="btn-primary inline-flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Adicionar Primeiro Reagente
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
