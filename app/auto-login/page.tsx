'use client'

import { useEffect } from 'react'

export default function AutoLoginPage() {
  useEffect(() => {
    console.log('🚀 Auto-login page loaded, executing login...')

    // Fazer login automático
    const performLogin = async () => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Importante: incluir cookies
          body: JSON.stringify({
            email: 'admin@chemstore.com',
            password: 'admin123'
          }),
        })

        const data = await response.json()

        if (response.ok) {
          console.log('✅ Auto-login successful')

          // Salvar token no localStorage
          if (data.token) {
            localStorage.setItem('token', data.token)
            console.log('💾 Token salvo no localStorage')
          }

          // Cookie HttpOnly é definido pelo servidor
          console.log('🔄 Redirecting to dashboard...')
          window.location.href = '/dashboard'
        } else {
          console.error('❌ Auto-login failed:', data.error)
          alert('Erro no login automático: ' + data.error)
          window.location.href = '/login'
        }
      } catch (error) {
        console.error('❌ Auto-login error:', error)
        alert('Erro interno no login automático')
        window.location.href = '/login'
      }
    }

    performLogin()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          🔄 Fazendo Login Automático...
        </h1>
        <p className="text-gray-600">
          Aguarde enquanto fazemos login com as credenciais de teste.
        </p>
        <div className="mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
