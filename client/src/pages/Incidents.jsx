import { useState, useEffect } from 'react'
import {
    PlusIcon,
    MapPinIcon,
    ClockIcon,
    XMarkIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { supabase } from '../config/supabase'
import toast from 'react-hot-toast'

const PriorityBadge = ({ priority }) => {
    const styles = {
        Alta: 'bg-red-50 text-red-600 border-red-100',
        Media: 'bg-amber-50 text-amber-600 border-amber-100',
        Baja: 'bg-blue-50 text-blue-600 border-blue-100'
    }

    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-md border ${styles[priority] || styles.Media}`}>
            {priority}
        </span>
    )
}

const TicketCard = ({ ticket, onClick }) => (
    <div
        onClick={() => onClick(ticket)}
        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow mb-3 cursor-pointer"
    >
        <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-gray-400 font-mono">{ticket.ticket_number || ticket.id.slice(0, 8)}</span>
            <PriorityBadge priority={ticket.priority} />
        </div>

        <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2">
            {ticket.title}
        </h3>

        <div className="flex items-center text-xs text-gray-500 mb-3">
            <MapPinIcon className="h-3.5 w-3.5 mr-1" />
            {ticket.category}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-50">
            <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
                    U
                </div>
                <span className="text-xs text-gray-500">Residente</span>
            </div>
            <div className="flex items-center text-xs text-gray-400">
                <ClockIcon className="h-3.5 w-3.5 mr-1" />
                {new Date(ticket.created_at).toLocaleDateString()}
            </div>
        </div>
    </div>
)

const Column = ({ title, status, count, tickets, onTicketClick }) => (
    <div className="flex-1 min-w-[300px] bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-700">{title}</h3>
            <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                {count}
            </span>
        </div>
        <div className="space-y-3">
            {tickets.filter(t => t.status === status).map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} onClick={onTicketClick} />
            ))}
        </div>
    </div>
)

export default function Incidents() {
    const [incidents, setIncidents] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [editForm, setEditForm] = useState({
        status: '',
        admin_comment: ''
    })

    useEffect(() => {
        fetchIncidents()
    }, [])

    const fetchIncidents = async () => {
        try {
            const { data, error } = await supabase
                .from('incidents')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setIncidents(data || [])
        } catch (error) {
            console.error('Error fetching incidents:', error)
            toast.error('Error al cargar incidencias')
        } finally {
            setLoading(false)
        }
    }

    const handleTicketClick = (ticket) => {
        setSelectedTicket(ticket)
        setEditForm({
            status: ticket.status,
            admin_comment: ticket.admin_comment || ''
        })
        setShowModal(true)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { error } = await supabase
                .from('incidents')
                .update({
                    status: editForm.status,
                    admin_comment: editForm.admin_comment,
                    updated_at: new Date().toISOString()
                })
                .eq('id', selectedTicket.id)

            if (error) throw error

            // Mock WhatsApp Notification
            if (editForm.admin_comment && editForm.admin_comment !== selectedTicket.admin_comment) {
                toast.success('Notificación WhatsApp enviada al residente', { icon: '📱' })
            }

            toast.success('Incidencia actualizada correctamente')
            setShowModal(false)
            fetchIncidents()
        } catch (error) {
            console.error('Error updating incident:', error)
            toast.error('Error al actualizar la incidencia')
        }
    }

    // Sort incidents by priority (High -> Medium -> Low)
    const sortedIncidents = [...incidents].sort((a, b) => {
        const priorityOrder = { 'Alta': 1, 'Media': 2, 'Baja': 3 }
        return (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99)
    })

    return (
        <div className="w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Gestión de Incidencias</h2>
                    <p className="mt-1 text-sm text-gray-500">Reportes de mantenimiento y seguridad</p>
                </div>
                <button
                    onClick={() => toast.success('Función de crear ticket manual próximamente')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Crear Ticket
                </button>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto">
                <div className="flex gap-6 h-full min-w-full pb-4">
                    <Column
                        title="Abierto"
                        status="Abierta"
                        count={sortedIncidents.filter(t => t.status === 'Abierta').length}
                        tickets={sortedIncidents}
                        onTicketClick={handleTicketClick}
                    />
                    <Column
                        title="En Proceso"
                        status="En Proceso"
                        count={sortedIncidents.filter(t => t.status === 'En Proceso').length}
                        tickets={sortedIncidents}
                        onTicketClick={handleTicketClick}
                    />
                    <Column
                        title="Resuelto"
                        status="Resuelta"
                        count={sortedIncidents.filter(t => t.status === 'Resuelta').length}
                        tickets={sortedIncidents}
                        onTicketClick={handleTicketClick}
                    />
                </div>
            </div>

            {/* Edit Modal */}
            {showModal && selectedTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Gestionar Incidencia</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="p-6 space-y-4">
                            <div>
                                <h4 className="font-medium text-gray-900">{selectedTicket.title}</h4>
                                <p className="text-sm text-gray-500 mt-1">{selectedTicket.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                                    <div className="mt-1">
                                        <PriorityBadge priority={selectedTicket.priority} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                    <p className="text-sm text-gray-900">{selectedTicket.category}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                                <select
                                    value={editForm.status}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Abierta">Abierta</option>
                                    <option value="En Proceso">En Proceso</option>
                                    <option value="Resuelta">Resuelta</option>
                                    <option value="Cerrada">Cerrada</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Comentario para el Residente</label>
                                <textarea
                                    value={editForm.admin_comment}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, admin_comment: e.target.value }))}
                                    rows="3"
                                    placeholder="Escribe un comentario para notificar al residente (ej: Técnico en camino)..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="mt-1 text-xs text-gray-500 flex items-center">
                                    <ChatBubbleLeftRightIcon className="h-3 w-3 mr-1" />
                                    Este comentario será visible para el residente y se enviará por WhatsApp.
                                </p>
                            </div>

                            <div className="pt-4 flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
                                >
                                    Guardar y Notificar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
