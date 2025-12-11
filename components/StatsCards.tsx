import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline'

interface StatsCardsProps {
  stats: {
    total: number
    valid: number
    warning: number
    expired: number
  }
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      name: 'Total de Reagentes',
      value: stats.total,
      icon: BeakerIcon,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      name: 'Válidos',
      value: stats.valid,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      name: 'Por Vencer (30 dias)',
      value: stats.warning,
      icon: ExclamationTriangleIcon,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
    },
    {
      name: 'Vencidos',
      value: stats.expired,
      icon: XCircleIcon,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div key={card.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.name}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`p-3 rounded-full ${card.bgColor}`}>
                <Icon className={`h-6 w-6 ${card.textColor}`} />
              </div>
            </div>
            {stats.total > 0 && (
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${card.color}`}
                      style={{
                        width: `${(card.value / stats.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="ml-2 text-xs text-gray-500">
                    {Math.round((card.value / stats.total) * 100)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}


