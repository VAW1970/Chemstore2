'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'react-toastify'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Verificar se há parâmetros na URL para login automático
  useEffect(() => {
    // Verificar se estamos no browser (window disponível)
    if (typeof window === 'undefined') {
      return
    }

    const urlParams = new URLSearchParams(window.location.search)
    const emailParam = urlParams.get('email')
    const passwordParam = urlParams.get('password')

    if (emailParam && passwordParam) {
      setEmail(emailParam)
      setPassword(passwordParam)
      // Executar login automático
      handleAutoLogin(emailParam, passwordParam)
    }
  }, [])

  const handleAutoLogin = async (emailParam: string, passwordParam: string) => {
    setLoading(true)
    console.log('🚀 Iniciando login automático...')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailParam, password: passwordParam }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log('✅ Login automático bem-sucedido')

        // Salvar token
        localStorage.setItem('token', data.token)
        document.cookie = `token=${data.token}; path=/; max-age=86400; samesite=lax`

        // Redirecionamento
        window.location.href = '/dashboard'
      } else {
        console.error('❌ Login automático falhou:', data.error)
        alert(data.error || 'Erro ao fazer login')
      }
    } catch (error) {
      console.error('❌ Erro no login automático:', error)
      alert('Erro interno do servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Importante: incluir cookies na requisição
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Salvar token no localStorage (para desenvolvimento)
        localStorage.setItem('token', data.token)

        // Redirecionamento para dashboard
        window.location.href = '/dashboard'
      } else {
        alert(data.error || 'Erro ao fazer login')
      }
    } catch (error) {
      console.error('Erro no login:', error)
      alert('Erro interno do servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="ChemStore Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            ChemStore
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sistema de Gerenciamento de Estoque de Reagentes Químicos
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white py-8 px-6 shadow-lg rounded-lg space-y-4">
            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input-field"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Credenciais de Teste
              </h3>
              <div className="text-xs text-blue-600 space-y-1">
                <p><strong>Admin:</strong> admin@chemstore.com / admin123</p>
                <p><strong>Usuário:</strong> user@chemstore.com / user123</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
