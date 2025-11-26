import {
    CreditCardIcon,
    ExclamationTriangleIcon,
    CalendarIcon,
    QrCodeIcon,
    ArrowRightIcon,
    BellIcon
} from '@heroicons/react/24/outline'

const stats = [
    {
        id: 1,
        name: 'Próximo Pago',
        value: '$85.000',
        detail: 'Vence: 05/12/2025',
        status: 'Pendiente',
        statusColor: 'bg-yellow-100 text-yellow-800',
        icon: CreditCardIcon,
        action: 'Pagar Ahora',
        color: 'bg-yellow-500'
    },
    {
        id: 2,
        name: 'Mis Incidencias',
        value: '2 Activas',
        detail: '1 En Proceso, 1 Abierta',
        status: 'En Proceso',
        statusColor: 'bg-blue-100 text-blue-800',
        icon: ExclamationTriangleIcon,
        action: 'Ver Todas',
        color: 'bg-blue-500'
    },
    {
        id: 3,
        name: 'Próxima Reserva',
        value: 'Quincho',
        detail: '23/11/2025 18:00',
        status: 'Confirmada',
        statusColor: 'bg-green-100 text-green-800',
        icon: CalendarIcon,
        action: 'Ver Detalles',
        color: 'bg-green-500'
    },
    {
        id: 4,
        name: 'Visitas Este Mes',
        value: '5 Visitas',
        detail: '2 activas hoy',
        status: 'Activo',
        statusColor: 'bg-teal-100 text-teal-800',
        icon: QrCodeIcon,
        action: 'Generar QR',
        color: 'bg-teal-500'
    },
]

const recentComms = [
    {
        id: 1,
        title: "Corte de agua programado",
        type: "Urgente",
        badgeColor: "bg-red-100 text-red-800",
        date: "Hace 2 horas",
        preview: "Mañana 8:00 AM a 14:00 PM habrá corte de agua por mantención..."
    },
    {
        id: 2,
        title: "Junta de vecinos",
        type: "Evento",
        badgeColor: "bg-green-100 text-green-800",
        date: "Ayer",
        preview: "Los invitamos a participar en la junta de vecinos este sábado..."
    },
    {
        id: 3,
        title: "Nuevas medidas de seguridad",
        type: "General",
        badgeColor: "bg-blue-100 text-blue-800",
        date: "Hace 1 semana",
        preview: "A partir del 01/12 implementaremos nuevas medidas de seguridad..."
    }
]

export default function ResidentDashboard() {
    return (
        <div className="w-full h-full p-6 lg:p-8">
            <div className="w-full mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Mi Espacio</h1>
                    <p className="mt-1 text-sm text-gray-500">Bienvenido Carlos Ruiz - Unidad A-402</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    {stats.map((item) => (
                        <div
                            key={item.id}
                            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <dt>
                                <div className={`absolute rounded-md p-3 ${item.color}`}>
                                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
                            </dt>
                            <dd className="ml-16 pb-6 flex flex-col items-start sm:pb-7">
                                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                                <p className="text-sm text-gray-500 mt-1">{item.detail}</p>
                                <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-teal-600 hover:text-teal-500 flex items-center">
                                            {item.action}
                                            <ArrowRightIcon className="ml-1 h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </dd>
                        </div>
                    ))}
                </div>

                {/* Recent Communications */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                            <BellIcon className="h-5 w-5 mr-2 text-gray-400" />
                            Comunicados Recientes
                        </h3>
                        <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-500">
                            Ver todos
                        </a>
                    </div>
                    <ul role="list" className="divide-y divide-gray-200">
                        {recentComms.map((comm) => (
                            <li key={comm.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <div className="flex items-center mb-1">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${comm.badgeColor} mr-2`}>
                                                {comm.type}
                                            </span>
                                            <p className="text-sm font-medium text-teal-600 truncate">{comm.title}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{comm.preview}</p>
                                    </div>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                            {comm.date}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
