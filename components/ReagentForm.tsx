'use client'

import { useState, useEffect } from 'react'

interface ReagentFormData {
  name: string
  brand: string
  quantity: string
  unit: string
  expirationDate: string
  location: string
  shelf: string
  sector: string
  notes: string
}

interface ReagentFormProps {
  initialData?: Partial<ReagentFormData>
  onSubmit: (data: ReagentFormData) => void
  loading: boolean
}

const units = [
  { value: 'KG', label: 'kg' },
  { value: 'L', label: 'L' },
  { value: 'G', label: 'g' },
  { value: 'ML', label: 'mL' },
  { value: 'UNIDADES', label: 'unidades' },
  { value: 'CAIXA', label: 'caixa' },
  { value: 'FRASCO', label: 'frasco' },
]

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

export default function ReagentForm({ initialData, onSubmit, loading }: ReagentFormProps) {
  const [formData, setFormData] = useState<ReagentFormData>({
    name: initialData?.name || '',
    brand: initialData?.brand || '',
    quantity: initialData?.quantity || '',
    unit: initialData?.unit || 'KG',
    expirationDate: initialData?.expirationDate || '',
    location: initialData?.location || '',
    shelf: initialData?.shelf || '',
    sector: initialData?.sector || '',
    notes: initialData?.notes || '',
  })

  const [errors, setErrors] = useState<Partial<ReagentFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<ReagentFormData> = {}

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!formData.brand.trim()) newErrors.brand = 'Marca é obrigatória'
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantidade deve ser maior que zero'
    }
    if (!formData.expirationDate) newErrors.expirationDate = 'Data de validade é obrigatória'
    if (!formData.location.trim()) newErrors.location = 'Localização é obrigatória'
    if (!formData.shelf.trim()) newErrors.shelf = 'Prateleira é obrigatória'
    if (!formData.sector.trim()) newErrors.sector = 'Setor é obrigatório'

    // Validar data futura
    if (formData.expirationDate) {
      const selectedDate = new Date(formData.expirationDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        newErrors.expirationDate = 'Data de validade deve ser futura'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    onSubmit(formData)
  }

  const handleChange = (field: keyof ReagentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpar erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome do Reagente */}
        <div className="md:col-span-2">
          <label htmlFor="name" className="label">
            Nome do Reagente *
          </label>
          <input
            type="text"
            id="name"
            className={`input-field ${errors.name ? 'border-red-500' : ''}`}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ex: Ácido Sulfúrico"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Marca */}
        <div>
          <label htmlFor="brand" className="label">
            Marca *
          </label>
          <input
            type="text"
            id="brand"
            className={`input-field ${errors.brand ? 'border-red-500' : ''}`}
            value={formData.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            placeholder="Ex: Química Pura"
          />
          {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
        </div>

        {/* Quantidade */}
        <div>
          <label htmlFor="quantity" className="label">
            Quantidade *
          </label>
          <input
            type="number"
            id="quantity"
            step="0.01"
            min="0"
            className={`input-field ${errors.quantity ? 'border-red-500' : ''}`}
            value={formData.quantity}
            onChange={(e) => handleChange('quantity', e.target.value)}
            placeholder="Ex: 25.5"
          />
          {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
        </div>

        {/* Unidade */}
        <div>
          <label htmlFor="unit" className="label">
            Unidade *
          </label>
          <select
            id="unit"
            className="input-field"
            value={formData.unit}
            onChange={(e) => handleChange('unit', e.target.value)}
          >
            {units.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>

        {/* Data de Validade */}
        <div>
          <label htmlFor="expirationDate" className="label">
            Data de Validade *
          </label>
          <input
            type="date"
            id="expirationDate"
            className={`input-field ${errors.expirationDate ? 'border-red-500' : ''}`}
            value={formData.expirationDate}
            onChange={(e) => handleChange('expirationDate', e.target.value)}
          />
          {errors.expirationDate && <p className="mt-1 text-sm text-red-600">{errors.expirationDate}</p>}
        </div>

        {/* Localização */}
        <div>
          <label htmlFor="location" className="label">
            Localização *
          </label>
          <input
            type="text"
            id="location"
            className={`input-field ${errors.location ? 'border-red-500' : ''}`}
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Ex: Laboratório Principal"
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>

        {/* Prateleira */}
        <div>
          <label htmlFor="shelf" className="label">
            Prateleira *
          </label>
          <input
            type="text"
            id="shelf"
            className={`input-field ${errors.shelf ? 'border-red-500' : ''}`}
            value={formData.shelf}
            onChange={(e) => handleChange('shelf', e.target.value)}
            placeholder="Ex: A-01"
          />
          {errors.shelf && <p className="mt-1 text-sm text-red-600">{errors.shelf}</p>}
        </div>

        {/* Setor */}
        <div>
          <label htmlFor="sector" className="label">
            Setor *
          </label>
          <select
            id="sector"
            className={`input-field ${errors.sector ? 'border-red-500' : ''}`}
            value={formData.sector}
            onChange={(e) => handleChange('sector', e.target.value)}
          >
            <option value="">Selecione um setor</option>
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
          {errors.sector && <p className="mt-1 text-sm text-red-600">{errors.sector}</p>}
        </div>

        {/* Observações */}
        <div className="md:col-span-2">
          <label htmlFor="notes" className="label">
            Observações
          </label>
          <textarea
            id="notes"
            rows={3}
            className="input-field"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Informações adicionais sobre o reagente..."
          />
        </div>
      </div>

      {/* Botões */}
      <div className="mt-8 flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="btn-secondary"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar Reagente'}
        </button>
      </div>
    </form>
  )
}

