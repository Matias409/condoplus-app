import { useState, useEffect } from 'react'
import {
    ExclamationTriangleIcon,
    CheckCircleIcon,
    ClockIcon,
    PlusIcon,
    XMarkIcon,
    PhotoIcon,
    ClipboardDocumentListIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { supabase } from '../../config/supabase'
import toast from 'react-hot-toast'

export default function MyIncidents() {
    const [incidents, setIncidents] = useState([])
    const [loading, setLoading] = useState(true)
    const [showReportModal, setShowReportModal] = useState(false)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [selectedIncident, setSelectedIncident] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        category: 'Plomería',
        urgency: 'Media',
        description: '',
        photos: null
    })

    useEffect(() => {
        fetchIncidents()
    }, [])

    const fetchIncidents = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data, error } = await supabase
                .from('incidents')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) throw error
            setIncidents(data || [])
        } catch (error) {
            console.error('Error fetching incidents:', error)
            toast.error('Error al cargar tus incidencias')
        } finally {
            setLoading(false)
        }
    }

    // Statistics
    const totalIncidents = incidents.length
    const inProcessIncidents = incidents.filter(i => i.status === 'En Proceso').length
    const resolvedIncidents = incidents.filter(i => i.status === 'Resuelta' || i.status === 'Cerrada').length

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Alta': return 'bg-red-50 text-red-700 border-red-200'
            case 'Media': return 'bg-amber-50 text-amber-700 border-amber-200'
            case 'Baja': return 'bg-blue-50 text-blue-700 border-blue-200'
            default: return 'bg-gray-50 text-gray-700 border-gray-200'
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Abierta': return 'bg-yellow-50 text-yellow-700'
            case 'En Proceso': return 'bg-green-50 text-green-700'
            case 'Resuelta': return 'bg-blue-50 text-blue-700'
            case 'Cerrada': return 'bg-slate-50 text-slate-700'
            default: return 'bg-gray-50 text-gray-700'
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.title || !formData.description) {
            toast.error('Por favor completa los campos requeridos')
            return
        }

        if (formData.description.length < 20) {
            toast.error('La descripción debe tener al menos 20 caracteres')
            return
        }

        try {
            const { data: { user } } = await supabase.auth.getUser()

            const newIncident = {
                ticket_number: `INC-2025-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
                title: formData.title,
                category: 'Pendiente', // Default value
                priority: 'Media',     // Default value
                status: 'Abierta',
                description: formData.description,
                user_id: user.id
            }

            const { error } = await supabase
                .from('incidents')
                .insert([newIncident])

            if (error) throw error

            toast.success('Incidencia reportada exitosamente')
            setShowReportModal(false)
            setFormData({
                title: '',
                category: 'Plomería',
                urgency: 'Media',
                description: '',
                photos: null
            })
            fetchIncidents()
        } catch (error) {
            console.error('Error creating incident:', error)
            toast.error('Error al crear la incidencia')
        }
    }

    const openDetailModal = (incident) => {
        setSelectedIncident(incident)
        setShowDetailModal(true)
    }

    return (
        <div className="w-full h-full p-6 lg:p-8">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="mb-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Mis Incidencias</h1>
                        <p className="mt-1 text-sm text-gray-500">Reporta y da seguimiento a problemas en tu unidad</p>
                    </div>
                    <button
                        onClick={() => setShowReportModal(true)}
                        className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Reportar Incidencia
                    </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                        <div className="p-3 rounded-full bg-teal-50 text-teal-600 mr-4">
                            <ClipboardDocumentListIcon className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Reportadas</p>
                            <p className="text-2xl font-bold text-gray-900">{totalIncidents}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                        <div className="p-3 rounded-full bg-green-50 text-green-600 mr-4">
                            <ClockIcon className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">En Proceso</p>
                            <p className="text-2xl font-bold text-gray-900">{inProcessIncidents}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                        <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
                            <CheckCircleIcon className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Resueltas</p>
                            <p className="text-2xl font-bold text-gray-900">{resolvedIncidents}</p>
                        </div>
                    </div>
                </div>

                {/* Incidents List */}
                <div className="grid grid-cols-1 gap-6">
                    {loading ? (
                        <p className="text-center text-gray-500 py-8">Cargando incidencias...</p>
                    ) : incidents.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                            <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay incidencias</h3>
                            <p className="mt-1 text-sm text-gray-500">No has reportado ninguna incidencia todavía.</p>
                        </div>
                    ) : (
                        incidents.map((incident) => (
                            <div key={incident.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                            {incident.ticket_number}
                                        </span>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                                            {incident.status}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => openDetailModal(incident)}
                                        className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                                    >
                                        Ver Detalle
                                    </button>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{incident.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{incident.description}</p>

                                <div className="flex items-center gap-6 text-xs text-gray-500 border-t border-gray-100 pt-4">
                                    <span className="flex items-center">
                                        <ClockIcon className="h-4 w-4 mr-1" />
                                        Reportado: {new Date(incident.created_at).toLocaleDateString()}
                                    </span>
                                    <span className={`flex items-center px-2 py-0.5 rounded-full border ${getPriorityColor(incident.priority)}`}>
                                        Prioridad {incident.priority}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Report Modal */}
                {showReportModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-900">Reportar Nueva Incidencia</h3>
                                <button onClick={() => setShowReportModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Incidencia</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Fuga de agua en cocina"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        required
                                    />
                                </div>

                                {/* Category and Urgency removed - handled by AI/Admin */}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Detallada</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                        placeholder="Describe el problema con el mayor detalle posible (mínimo 20 caracteres)..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Adjuntar Fotos (Opcional)</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-teal-500 transition-colors cursor-pointer">
                                        <div className="space-y-1 text-center">
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600">
                                                <span className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500">
                                                    Subir un archivo
                                                </span>
                                                <p className="pl-1">o arrastrar y soltar</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3 justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowReportModal(false)}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium shadow-sm transition-colors"
                                    >
                                        Enviar Reporte
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Detail Modal */}
                {showDetailModal && selectedIncident && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-xl font-bold text-gray-900">{selectedIncident.ticket_number}</h3>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedIncident.status)}`}>
                                            {selectedIncident.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">Reportado: {new Date(selectedIncident.created_at).toLocaleString()}</p>
                                </div>
                                <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{selectedIncident.title}</h4>
                                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        {selectedIncident.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Categoría</p>
                                        <p className="font-semibold text-gray-900">{selectedIncident.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Prioridad</p>
                                        <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(selectedIncident.priority)}`}>
                                            {selectedIncident.priority}
                                        </span>
                                    </div>
                                </div>

                                {selectedIncident.admin_comment && (
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                        <h5 className="font-bold text-blue-900 mb-2 flex items-center">
                                            <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                                            Respuesta de Administración
                                        </h5>
                                        <p className="text-blue-800">
                                            {selectedIncident.admin_comment}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="px-6 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
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
