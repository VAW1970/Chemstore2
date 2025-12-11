'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { toast } from 'react-toastify'
import { DocumentTextIcon, PrinterIcon } from '@heroicons/react/24/outline'

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false)
  const [filters, setFilters] = useState({
    status: 'all',
    sector: '',
  })

  const sectors = [
    'Ácidos',
    'Bases',
    'Solventes',
    'Sais',
    'Indicadores',
    'Padrões',
    'Reagentes Orgânicos',
    'Reagentes Inorgânicos',
    'Materiais de Consumo',
    'Equipamentos',
  ]

  const handleGenerateReport = async () => {
    setGenerating(true)
    try {
      const params = new URLSearchParams()
      if (filters.status !== 'all') params.append('status', filters.status)
      if (filters.sector) params.append('sector', filters.sector)

      const response = await fetch(`/api/reports/inventory?${params}`)

      if (response.ok) {
        // Criar blob e download
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'inventario-chemstore.pdf'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        toast.success('Relatório gerado com sucesso!')
      } else {
        const data = await response.json()
        toast.error(data.error || 'Erro ao gerar relatório')
      }
    } catch (error) {
      console.error('Erro ao gerar relatório:', error)
      toast.error('Erro interno do servidor')
    } finally {
      setGenerating(false)
    }
  }

  const reportTypes = [
    {
      id: 'inventory',
      title: 'Relatório de Inventário',
      description: 'Relatório completo de todos os reagentes com status de vencimento',
      icon: DocumentTextIcon,
    },
    {
      id: 'expiring',
      title: 'Reagentes por Vencer',
      description: 'Lista de reagentes que vencem nos próximos 30 dias',
      icon: PrinterIcon,
    },
    {
      id: 'expired',
      title: 'Reagentes Vencidos',
      description: 'Lista de reagentes já vencidos',
      icon: DocumentTextIcon,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Título */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gere relatórios personalizados do seu estoque de reagentes.
          </p>
        </div>

        {/* Filtros */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Filtros do Relatório</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Status de Vencimento</label>
              <select
                className="input-field"
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="all">Todos os status</option>
                <option value="valid">Válidos</option>
                <option value="warning">Por vencer (30 dias)</option>
                <option value="expired">Vencidos</option>
              </select>
            </div>

            <div>
              <label className="label">Setor</label>
              <select
                className="input-field"
                value={filters.sector}
                onChange={(e) => setFilters(prev => ({ ...prev, sector: e.target.value }))}
              >
                <option value="">Todos os setores</option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tipos de Relatório */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reportTypes.map((report) => {
            const Icon = report.icon
            return (
              <div key={report.id} className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                </div>

                <p className="text-sm text-gray-600 mb-4">{report.description}</p>

                <button
                  onClick={() => {
                    setFilters(prev => ({ ...prev, status: report.id === 'expiring' ? 'warning' : report.id === 'expired' ? 'expired' : 'all' }))
                    setTimeout(handleGenerateReport, 100)
                  }}
                  disabled={generating}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? 'Gerando...' : 'Gerar PDF'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Relatório Personalizado */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Relatório Personalizado</h3>
          <p className="text-sm text-gray-600 mb-4">
            Use os filtros acima para gerar um relatório personalizado com os critérios desejados.
          </p>

          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Gerando Relatório...
              </div>
            ) : (
              'Gerar Relatório Personalizado'
            )}
          </button>
        </div>

        {/* Informações sobre impressão */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">💡 Dicas para Impressão</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Os relatórios são gerados em formato A4 padrão</li>
            <li>• Use impressão em cores para visualizar melhor os status</li>
            <li>• Recomendamos usar Chrome ou Firefox para melhor compatibilidade</li>
            <li>• Os PDFs incluem cabeçalho, filtros aplicados e estatísticas</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
}


