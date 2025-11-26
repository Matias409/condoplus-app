import { useState } from 'react'
import {
    CalendarIcon,
    ClockIcon,
    UsersIcon,
    CurrencyDollarIcon,
    CheckCircleIcon,
    XCircleIcon,
    FireIcon,
    MusicalNoteIcon,
    TrophyIcon,
    LifebuoyIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const spaces = [
    {
        id: 1,
        name: 'Quincho',
        capacity: '30 personas',
        hours: '10:00 - 00:00',
        price: '$25.000/día',
        icon: FireIcon,
        color: 'bg-orange-100 text-orange-600',
        description: 'Ideal para asados y reuniones familiares.'
    },
    {
        id: 2,
        name: 'Sala de Eventos',
        capacity: '50 personas',
        hours: '09:00 - 01:00',
        price: '$40.000/día',
        icon: MusicalNoteIcon,
        color: 'bg-purple-100 text-purple-600',
        description: 'Espacio amplio para celebraciones y eventos.'
    },
    {
        id: 3,
        name: 'Cancha de Tenis',
        capacity: '4 personas',
        hours: '08:00 - 22:00',
        price: '$8.000/hora',
        icon: TrophyIcon,
        color: 'bg-green-100 text-green-600',
        description: 'Cancha profesional con iluminación nocturna.'
    },
    {
        id: 4,
        name: 'Piscina',
        capacity: 'Uso común',
        hours: '10:00 - 20:00',
        price: 'Incluido',
        icon: LifebuoyIcon,
        color: 'bg-blue-100 text-blue-600',
        description: 'Disponible solo en temporada de verano.',
        status: 'Temporada'
    }
]

const initialReservations = [
    {
        id: 1,
        space: 'Quincho',
        date: '23/11/2025',
        time: '18:00 - 00:00',
        status: 'Confirmada',
        statusColor: 'bg-green-100 text-green-800'
    },
    {
        id: 2,
        name: 'Sala de Eventos',
        space: 'Sala de Eventos',
        date: '15/12/2025',
        time: '15:00 - 19:00',
        status: 'Pendiente',
        statusColor: 'bg-yellow-100 text-yellow-800'
    }
]

export default function ReserveSpaces() {
    const [reservations, setReservations] = useState(initialReservations)
    const [selectedSpace, setSelectedSpace] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        date: '',
        timeSlot: 'Tarde (15:00 - 19:00)',
        guests: '',
        reason: 'Familiar',
        observations: '',
        agreed: false
    })

    const handleOpenModal = (space) => {
        setSelectedSpace(space)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedSpace(null)
        setFormData({
            date: '',
            timeSlot: 'Tarde (15:00 - 19:00)',
            guests: '',
            reason: 'Familiar',
            observations: '',
            agreed: false
        })
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.date || !formData.guests || !formData.agreed) {
            toast.error('Por favor completa todos los campos requeridos')
            return
        }

        const reservationCode = `RES-2025-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`

        const newReservation = {
            id: Date.now(),
            space: selectedSpace.name,
            date: new Date(formData.date).toLocaleDateString('es-CL'),
            time: formData.timeSlot,
            status: 'Confirmada',
            statusColor: 'bg-green-100 text-green-800',
            code: reservationCode
        }

        setReservations([newReservation, ...reservations])
        toast.success(`¡Reserva confirmada! Código: ${reservationCode}`)
        handleCloseModal()
    }

    const handleCancelReservation = (id) => {
        if (window.confirm('¿Seguro que deseas cancelar esta reserva?')) {
            setReservations(reservations.map(res =>
                res.id === id
                    ? { ...res, status: 'Cancelada', statusColor: 'bg-red-100 text-red-800' }
                    : res
            ))
            toast.success('Reserva cancelada')
        }
    }

    return (
        <div className="w-full h-full p-6 lg:p-8">
            <div className="w-full mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Reservar Espacios Comunes</h1>
                    <p className="mt-1 text-sm text-gray-500">Agenda el uso de áreas recreativas del condominio</p>
                </div>

                {/* Spaces Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {spaces.map((space) => {
                        const Icon = space.icon
                        return (
                            <div key={space.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-lg ${space.color}`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        {space.status && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {space.status}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{space.name}</h3>
                                    <p className="text-sm text-gray-500 mb-4 h-10">{space.description}</p>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <UsersIcon className="h-4 w-4 mr-2 text-gray-400" />
                                            {space.capacity}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                                            {space.hours}
                                        </div>
                                        <div className="flex items-center text-sm font-medium text-gray-900">
                                            <CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-400" />
                                            {space.price}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleOpenModal(space)}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                    >
                                        Ver Disponibilidad
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* My Reservations */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Mis Reservas</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Espacio
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha y Horario
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Acciones</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reservations.map((res) => (
                                    <tr key={res.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {res.space}
                                            {res.code && <span className="block text-xs text-gray-500">{res.code}</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {res.date} <span className="mx-1">•</span> {res.time}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${res.statusColor}`}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {res.status !== 'Cancelada' && (
                                                <button
                                                    onClick={() => handleCancelReservation(res.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Cancelar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Reservation Modal */}
                {showModal && selectedSpace && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">

                            {/* HEADER */}
                            <div className="p-6 border-b border-slate-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold text-slate-800">
                                        Reservar {selectedSpace?.name}
                                    </h3>
                                    <button
                                        onClick={handleCloseModal}
                                        className="text-slate-400 hover:text-slate-600"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            {/* INFO DEL ESPACIO */}
                            <div className="p-6 bg-slate-50 border-b border-slate-200">
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500">Capacidad</p>
                                        <p className="font-bold text-slate-800">{selectedSpace?.capacity}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Horario</p>
                                        <p className="font-bold text-slate-800">{selectedSpace?.hours}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Precio</p>
                                        <p className="font-bold text-teal-600">{selectedSpace?.price}</p>
                                    </div>
                                </div>
                            </div>

                            {/* FORMULARIO */}
                            <div className="p-6 space-y-4">

                                {/* Fecha */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Fecha de Reserva
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        required
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>

                                {/* Horario */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Horario
                                    </label>
                                    <select
                                        name="timeSlot"
                                        value={formData.timeSlot}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option>Mañana (10:00 - 14:00)</option>
                                        <option>Tarde (15:00 - 19:00)</option>
                                        <option>Noche (20:00 - 00:00)</option>
                                        <option>Día Completo</option>
                                    </select>
                                </div>

                                {/* Cantidad de Invitados */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Cantidad de Invitados
                                    </label>
                                    <input
                                        type="number"
                                        name="guests"
                                        required
                                        value={formData.guests}
                                        onChange={handleInputChange}
                                        min="1"
                                        max={parseInt(selectedSpace.capacity)}
                                        placeholder="Número de personas"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                {/* Motivo */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Motivo de la Reserva
                                    </label>
                                    <select
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option>Cumpleaños</option>
                                        <option>Reunión Familiar</option>
                                        <option>Evento Social</option>
                                        <option>Otro</option>
                                    </select>
                                </div>

                                {/* Observaciones */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Observaciones (Opcional)
                                    </label>
                                    <textarea
                                        name="observations"
                                        value={formData.observations}
                                        onChange={handleInputChange}
                                        rows="3"
                                        placeholder="Información adicional..."
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                {/* Checkbox */}
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        name="agreed"
                                        required
                                        checked={formData.agreed}
                                        onChange={handleInputChange}
                                        className="mt-1 w-4 h-4 text-teal-600 rounded"
                                    />
                                    <label className="text-sm text-slate-600">
                                        Acepto el reglamento de uso de espacios comunes
                                    </label>
                                </div>

                            </div>

                            {/* BOTONES */}
                            <div className="p-6 bg-slate-50 border-t border-slate-200 flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100 font-semibold"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold"
                                >
                                    Confirmar Reserva
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
