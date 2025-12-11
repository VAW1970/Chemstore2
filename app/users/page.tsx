import DashboardLayout from '@/components/DashboardLayout'

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Usuários</h1>
        </div>

        <div className="card">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Gerenciamento de Usuários</h3>
            <p className="text-gray-500">Funcionalidade em desenvolvimento.</p>
            <p className="text-sm text-gray-400 mt-2">Apenas administradores podem acessar esta área.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

