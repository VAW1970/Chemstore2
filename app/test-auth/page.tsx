export default function TestAuthPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-4">
          ✅ Autenticação Funcionando!
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Você conseguiu acessar uma página protegida.
        </p>
        <p className="text-sm text-gray-500 text-center mb-6">
          Isso significa que o middleware está funcionando corretamente.
        </p>
        <div className="space-y-3">
          <a
            href="/dashboard"
            className="w-full block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Tentar Dashboard
          </a>
          <a
            href="/login"
            className="w-full block text-center bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Voltar ao Login
          </a>
        </div>
      </div>
    </div>
  )
}


