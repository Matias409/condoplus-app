import { useState } from 'react'
import {
    MegaphoneIcon,
    XMarkIcon,
    CalendarIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    WrenchScrewdriverIcon,
    SparklesIcon
} from '@heroicons/react/24/outline'

const initialCommunications = [
    {
        id: 1,
        title: 'Corte de agua programado para mañana',
        type: 'Urgente',
        date: 'Hace 2 horas',
        content: 'Estimados residentes, se informa que mañana habrá un corte de agua programado desde las 10:00 AM hasta las 14:00 PM debido a reparaciones en la matriz principal. Por favor tomen las precauciones necesarias. Agradecemos su comprensión.',
        recipients: 'Todas las Torres'
    },
    {
        id: 2,
        title: 'Junta de vecinos este sábado 23/11',
        type: 'Evento',
        date: 'Ayer',
        content: 'Les recordamos que este sábado 23 de noviembre se realizará la junta de vecinos anual en el salón de eventos a las 18:00 hrs. Se tratarán temas importantes sobre el presupuesto 2026 y nuevas mejoras para el condominio. ¡Su asistencia es muy importante!',
        recipients: 'Todas las Torres'
    },
    {
        id: 3,
        title: 'Mantención de ascensores Torre B',
        type: 'Mantenimiento',
        date: 'Hace 3 días',
        content: 'Informamos que se realizará la mantención mensual de los ascensores de la Torre B el día lunes. Uno de los ascensores estará fuera de servicio entre las 09:00 y las 13:00 hrs. Rogamos planificar sus salidas con anticipación.',
        recipients: 'Torre B'
    },
    {
        id: 4,
        title: 'Nuevas medidas de seguridad',
        type: 'General',
        date: 'Hace 1 semana',
        content: 'A partir del próximo mes se implementará un nuevo sistema de control de acceso biométrico en la entrada principal. Todos los residentes deberán registrar su huella en conserjería durante esta semana. El horario de atención para el registro es de 09:00 a 18:00 hrs.',
        recipients: 'Todas las Torres'
    },
    {
        id: 5,
        title: 'Cierre temporal del quincho',
        type: 'Mantenimiento',
        date: 'Hace 10 días',
        content: 'El quincho permanecerá cerrado por reparaciones en la parrilla y pintura general desde el lunes hasta el jueves de la próxima semana. Las reservas para esas fechas han sido bloqueadas. Disculpen las molestias.',
        recipients: 'Todas las Torres'
    },
    {
        id: 6,
        title: 'Feliz día de los vecinos',
        type: 'Evento',
        date: 'Hace 2 semanas',
        content: '¡Queremos desear un muy feliz día a todos nuestros vecinos! Gracias por hacer de esta comunidad un lugar agradable para vivir. Les invitamos a compartir un pequeño cóctel en el hall de acceso hoy a las 19:00 hrs.',
        recipients: 'Todas las Torres'
    }
]

export default function Communications() {
    const [communications] = useState(initialCommunications)
    const [filterType, setFilterType] = useState('Todos')
    const [selectedComm, setSelectedComm] = useState(null)

    const filteredCommunications = filterType === 'Todos'
        ? communications
        : communications.filter(c => c.type === filterType)

    const getTypeStyles = (type) => {
        switch (type) {
            case 'Urgente':
                return { badge: 'bg-red-100 text-red-800', icon: ExclamationCircleIcon, iconColor: 'text-red-500' }
            case 'Mantenimiento':
                return { badge: 'bg-orange-100 text-orange-800', icon: WrenchScrewdriverIcon, iconColor: 'text-orange-500' }
            case 'Evento':
                return { badge: 'bg-purple-100 text-purple-800', icon: SparklesIcon, iconColor: 'text-purple-500' }
            case 'General':
                return { badge: 'bg-blue-100 text-blue-800', icon: InformationCircleIcon, iconColor: 'text-blue-500' }
            default:
                return { badge: 'bg-gray-100 text-gray-800', icon: MegaphoneIcon, iconColor: 'text-gray-500' }
        }
    }

    return (
        <div className="w-full h-full p-6 lg:p-8">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Comunicaciones</h1>
                        <p className="mt-1 text-sm text-gray-500">Mantente informado de las novedades del condominio</p>
                    </div>
                    <div className="w-full sm:w-64">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        >
                            <option value="Todos">Todos los tipos</option>
                            <option value="Urgente">Urgente</option>
                            <option value="General">General</option>
                            <option value="Mantenimiento">Mantenimiento</option>
                            <option value="Evento">Evento</option>
                        </select>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCommunications.map((comm) => {
                        const styles = getTypeStyles(comm.type)
                        const Icon = styles.icon

                        return (
                            <div key={comm.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles.badge}`}>
                                            {comm.type}
                                        </span>
                                        <span className="text-xs text-gray-400 flex items-center">
                                            <CalendarIcon className="h-3 w-3 mr-1" />
                                            {comm.date}
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-3 mb-3">
                                        <div className={`mt-1 p-2 rounded-lg bg-gray-50 ${styles.iconColor}`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                                            {comm.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {comm.content}
                                    </p>

                                    <div className="flex items-center text-xs text-gray-500 bg-gray-50 p-2 rounded">
                                        <MegaphoneIcon className="h-3 w-3 mr-2" />
                                        Para: {comm.recipients}
                                    </div>
                                </div>

                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                    <button
                                        onClick={() => setSelectedComm(comm)}
                                        className="w-full text-center text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                                    >
                                        Leer Completo
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Modal */}
                {selectedComm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                                <div className="pr-8">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 ${getTypeStyles(selectedComm.type).badge}`}>
                                        {selectedComm.type}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 leading-snug">
                                        {selectedComm.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center">
                                        <CalendarIcon className="h-4 w-4 mr-1" />
                                        {selectedComm.date}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedComm(null)}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {selectedComm.content}
                                </p>

                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium text-gray-700">Destinatarios:</span> {selectedComm.recipients}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={() => setSelectedComm(null)}
                                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors shadow-sm"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
