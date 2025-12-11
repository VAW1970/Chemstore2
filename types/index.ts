export interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'USER'
  createdAt: string
  updatedAt: string
}

export interface Reagent {
  id: string
  name: string
  brand: string
  quantity: number
  unit: 'KG' | 'L' | 'G' | 'ML' | 'UNIDADES' | 'CAIXA' | 'FRASCO'
  expirationDate: string
  location: string
  shelf: string
  sector: string
  verification: 'PENDING' | 'VERIFIED' | 'REJECTED'
  userId: string
  notes?: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
  }
  status?: 'valid' | 'warning' | 'expired'
}

export interface ReagentFormData {
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

export interface AuthResponse {
  message: string
  user: User
  token: string
}

export interface ApiError {
  error: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}


