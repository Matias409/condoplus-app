import { useState } from 'react'
import {
    Send,
    Plus,
    MessageSquare,
    MoreVertical,
    Calendar,
    Users,
    X
} from 'lucide-react'
import toast from 'react-hot-toast'

const initialCommunications = [
    {
        id: 1,
        title: "Corte de agua programado para mañana",
        type: "Urgente",
        target: "Todas las Torres",
        content: "Mañana 8:00 AM a 14:00 PM habrá corte de agua por mantención de matrices principales. Se recomienda juntar agua.",
        date: "Hace 2 horas",
        status: "Enviado por WhatsApp"
    },
    {
        id: 2,
        title: "Junta de vecinos este sábado 23/11",
        type: "Evento",
        target: "Todos los residentes",
        content: "Los invitamos a participar en la junta de vecinos este sábado a las 18:00 hrs en el salón de eventos. Temas: seguridad y presupuesto 2026.",
        date: "Ayer",
        status: "Publicado"
    },
    {
        id: 3,
        title: "Mantención de ascensores Torre B",
        type: "Mantenimiento",
        target: "Torre B",
        content: "Se realizará mantención preventiva de ascensores el jueves 21/11. Rogamos usar las escaleras durante el periodo de 10:00 a 12:00.",
        date: "Hace 3 días",
        status: "Enviado por WhatsApp"
    },
    {
        id: 4,
        title: "Nuevas medidas de seguridad",
        type: "General",
        target: "Todos los residentes",
        content: "A partir del 01/12 implementaremos nuevas medidas de seguridad en el acceso peatonal. Todos deberán usar su tarjeta magnética.",
        date: "Hace 1 semana",
        status: "Publicado"
    },
    {
        id: 5,
        title: "Cierre temporal del quincho por reparaciones",
        type: "Mantenimiento",
        target: "Todos",
        content: "El quincho estará cerrado del 18 al 22 de noviembre por reparaciones en la parrilla y cambio de luminarias.",
        date: "Hace 10 días",
        status: "Enviado por WhatsApp"
    },
    {
        id: 6,
        title: "Feliz día de los vecinos",
        type: "Evento",
        target: "Todos",
        content: "El condominio celebra el Día del Vecino con actividades el domingo en los jardines. ¡Habrá sorpresas para los niños!",
        date: "Hace 2 semanas",
        status: "Publicado"
    }
]

const Badge = ({ type }) => {
    const styles = {
        General: 'bg-blue-50 text-blue-700 border-blue-200',
        Urgente: 'bg-red-50 text-red-700 border-red-200',
        Mantenimiento: 'bg-amber-50 text-amber-700 border-amber-200',
        Evento: 'bg-green-50 text-green-700 border-green-200'
    }
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[type] || styles.General}`}>
            {type}
        </span>
    )
}

export default function Communications() {
    const [communications, setCommunications] = useState(initialCommunications)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'General',
        target: 'Todos los residentes',
        whatsapp: false
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.title && formData.content.length >= 10) {
            const newComm = {
                id: Date.now(),
                ...formData,
                date: "Ahora",
                status: formData.whatsapp ? "Enviado por WhatsApp" : "Publicado"
            }
            setCommunications([newComm, ...communications])
            setShowForm(false)
            setFormData({
                title: '',
                content: '',
                type: 'General',
                target: 'Todos los residentes',
                whatsapp: false
            })
            toast.success('Comunicado publicado correctamente')
            if (formData.whatsapp) {
                toast.success('Enviando mensajes a 450 residentes...', { icon: '📱' })
            }
        } else {
            toast.error('Por favor completa todos los campos requeridos')
        }
    }

    return (
        <div className="w-full h-full p-6 lg:p-8">
            {/* Header & Stats */}
            <div className="mb-8">
                <div className="md:flex md:items-center md:justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Centro de Comunicaciones</h2>
                        <p className="mt-1 text-sm text-gray-500">Gestiona anuncios y comunicados para residentes</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-3">
                        <button
                            onClick={() => toast.success('Enviando mensajes masivos...', { icon: '📱' })}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <Send className="-ml-1 mr-2 h-4 w-4" />
                            Enviar WhatsApp Masivo
                        </button>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            {showForm ? <X className="-ml-1 mr-2 h-4 w-4" /> : <Plus className="-ml-1 mr-2 h-4 w-4" />}
                            {showForm ? 'Cancelar' : 'Nuevo Comunicado'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Comunicados</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">24</dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Enviados Este Mes</dt>
                            <dd className="mt-1 text-3xl font-semibold text-green-600">8</dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Alcance Total</dt>
                            <dd className="mt-1 text-3xl font-semibold text-blue-600">450 <span className="text-sm text-gray-500 font-normal">residentes</span></dd>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Communication Form */}
            {showForm && (
                <div className="bg-white shadow sm:rounded-lg mb-8 overflow-hidden transition-all duration-300 ease-in-out">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Nuevo Comunicado</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título del comunicado</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            placeholder="Ej: Corte de agua programado"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo</label>
                                    <div className="mt-1">
                                        <select
                                            id="type"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        >
                                            <option>General</option>
                                            <option>Urgente</option>
                                            <option>Mantenimiento</option>
                                            <option>Evento</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="target" className="block text-sm font-medium text-gray-700">Destinatarios</label>
                                    <div className="mt-1">
                                        <select
                                            id="target"
                                            name="target"
                                            value={formData.target}
                                            onChange={handleInputChange}
                                            className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        >
                                            <option>Todos los residentes</option>
                                            <option>Torre A</option>
                                            <option>Torre B</option>
                                            <option>Torre C</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenido del mensaje</label>
                                    <div className="mt-1">
                                        <textarea
                                            id="content"
                                            name="content"
                                            rows={3}
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            placeholder="Escribe el contenido del comunicado aquí..."
                                            required
                                            minLength={10}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="whatsapp"
                                                name="whatsapp"
                                                type="checkbox"
                                                checked={formData.whatsapp}
                                                onChange={handleInputChange}
                                                className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="whatsapp" className="font-medium text-gray-700">Enviar también por WhatsApp</label>
                                            <p className="text-gray-500">Se enviará una notificación instantánea a los residentes seleccionados.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    📢 Publicar Comunicado
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Communications Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {communications.map((comm) => (
                    <div key={comm.id} className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <Badge type={comm.type} />
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreVertical className="h-5 w-5" />
                                </button>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2">{comm.title}</h3>

                            <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1.5" />
                                    {comm.date}
                                </div>
                                <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-1.5" />
                                    {comm.target}
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {comm.content}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center text-sm">
                                    {comm.status.includes('WhatsApp') ? (
                                        <span className="flex items-center text-green-600 font-medium">
                                            <Send className="h-3.5 w-3.5 mr-1.5" />
                                            {comm.status}
                                        </span>
                                    ) : (
                                        <span className="flex items-center text-blue-600 font-medium">
                                            <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                                            {comm.status}
                                        </span>
                                    )}
                                </div>
                                <button className="text-primary hover:text-orange-700 text-sm font-medium">
                                    Ver Detalle
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
