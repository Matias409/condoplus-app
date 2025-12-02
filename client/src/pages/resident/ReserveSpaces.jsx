import { useState, useMemo } from 'react'
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
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon
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
        date: '2025-11-23', // ISO format for easier comparison
        startTime: '18:00',
        endTime: '23:59',
        status: 'Confirmada',
        statusColor: 'bg-green-100 text-green-800',
        user: 'Juan Pérez'
    },
    {
        id: 2,
        space: 'Sala de Eventos',
        date: '2025-12-15',
        startTime: '15:00',
        endTime: '19:00',
        status: 'Pendiente',
        statusColor: 'bg-yellow-100 text-yellow-800',
        user: 'Maria Gonzalez'
    },
    // Mock data for visualization
    {
        id: 3,
        space: 'Cancha de Tenis',
        date: new Date().toISOString().split('T')[0], // Today
        startTime: '10:00',
        endTime: '11:30',
        status: 'Ocupado',
        statusColor: 'bg-red-100 text-red-800',
        user: 'Pedro Soto'
    }
]

// Helper to generate time slots
const generateTimeSlots = () => {
    const slots = []
    for (let i = 8; i <= 23; i++) {
        slots.push(`${i.toString().padStart(2, '0')}:00`)
        slots.push(`${i.toString().padStart(2, '0')}:30`)
    }
    return slots
}

const DayCalendar = ({ date, spaceName, reservations, onSelectSlot }) => {
    const timeSlots = generateTimeSlots()

    // Filter reservations for this day and space
    const dayReservations = reservations.filter(r =>
        r.date === date && r.space === spaceName
    ).sort((a, b) => a.startTime.localeCompare(b.startTime))

    const getPosition = (time) => {
        const [hours, minutes] = time.split(':').map(Number)
        const startHour = 8 // Calendar starts at 8:00
        const totalMinutes = (hours - startHour) * 60 + minutes
        return totalMinutes * 2 // 2px per minute height
    }

    const getDurationHeight = (start, end) => {
        const startPos = getPosition(start)
        const endPos = getPosition(end === '00:00' || end === '23:59' ? '24:00' : end)
        return endPos - startPos
    }

    // Calculate available slots
    const getAvailableSlots = () => {
        const slots = []
        let currentTime = '08:00'
        const endTime = '24:00'

        dayReservations.forEach(res => {
            if (res.startTime > currentTime) {
                slots.push({
                    id: `free-${currentTime}`,
                    startTime: currentTime,
                    endTime: res.startTime,
                    status: 'Disponible'
                })
            }
            currentTime = res.endTime === '00:00' || res.endTime === '23:59' ? '24:00' : res.endTime
        })

        if (currentTime < endTime) {
            slots.push({
                id: `free-${currentTime}`,
                startTime: currentTime,
                endTime: '23:59', // Display as 23:59 for logic but height calc handles 24:00
                status: 'Disponible'
            })
        }

        return slots
    }

    const availableSlots = getAvailableSlots()
    const allBlocks = [...dayReservations, ...availableSlots]

    return (
        <div className="border rounded-lg bg-white overflow-hidden flex flex-col h-[400px]">
            {/* Header */}
            <div className="bg-gray-50 p-3 border-b flex justify-between items-center sticky top-0 z-10">
                <span className="font-semibold text-gray-700">
                    {new Date(date).toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
                <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div> Ocupado</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-50 border border-green-200 rounded"></div> Disponible</span>
                </div>
            </div>

            {/* Grid */}
            <div className="overflow-y-auto flex-1 relative custom-scrollbar">
                <div className="flex relative min-h-[1920px]"> {/* 16 hours * 60 mins * 2px */}
                    {/* Time Labels */}
                    <div className="w-16 flex-shrink-0 bg-gray-50 border-r">
                        {timeSlots.map(time => (
                            <div key={time} className="h-[60px] border-b border-gray-100 text-xs text-gray-500 text-right pr-2 pt-1 relative">
                                {time.endsWith('00') ? time : ''}
                            </div>
                        ))}
                    </div>

                    {/* Columns */}
                    <div className="flex-1 relative bg-white">
                        {/* Grid Lines */}
                        {timeSlots.map(time => (
                            <div key={time} className="h-[60px] border-b border-gray-50 w-full absolute" style={{ top: `${getPosition(time)}px` }}></div>
                        ))}

                        {/* Blocks (Reservations + Available) */}
                        {allBlocks.map(block => (
                            <div
                                key={block.id}
                                className={`absolute left-1 right-1 rounded-md border p-2 text-xs shadow-sm overflow-hidden flex flex-col justify-center
                                    ${block.status === 'Disponible'
                                        ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100 cursor-pointer transition-colors'
                                        : block.status === 'Confirmada' || block.status === 'Ocupado'
                                            ? 'bg-red-50 border-red-200 text-red-700'
                                            : 'bg-yellow-50 border-yellow-200 text-yellow-700'
                                    }`}
                                style={{
                                    top: `${getPosition(block.startTime)}px`,
                                    height: `${Math.max(getDurationHeight(block.startTime, block.endTime), 20)}px` // Min height for visibility
                                }}
                            >
                                <div className="font-bold truncate">
                                    {block.status === 'Disponible' ? 'Disponible' : (block.status === 'Ocupado' ? 'Reservado' : block.user)}
                                </div>
                                <div className="truncate">{block.startTime} - {block.endTime}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ReserveSpaces() {
    const [reservations, setReservations] = useState(initialReservations)
    const [selectedSpace, setSelectedSpace] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
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
            date: new Date().toISOString().split('T')[0],
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

        // Parse time slot string to start/end for storage
        // This is a simplification; in a real app we'd parse the specific times
        const timeMapping = {
            'Mañana (10:00 - 14:00)': { start: '10:00', end: '14:00' },
            'Tarde (15:00 - 19:00)': { start: '15:00', end: '19:00' },
            'Noche (20:00 - 00:00)': { start: '20:00', end: '23:59' },
            'Día Completo': { start: '10:00', end: '23:59' }
        }
        const times = timeMapping[formData.timeSlot] || { start: '12:00', end: '13:00' }

        const newReservation = {
            id: Date.now(),
            space: selectedSpace.name,
            date: formData.date,
            startTime: times.start,
            endTime: times.end,
            status: 'Confirmada',
            statusColor: 'bg-green-100 text-green-800',
            code: reservationCode,
            user: 'Yo'
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
                                            {res.date} <span className="mx-1">•</span> {res.startTime} - {res.endTime}
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row overflow-hidden">

                            {/* Left Side: Calendar & Info */}
                            <div className="w-full md:w-1/2 bg-slate-50 p-6 border-r border-slate-200 flex flex-col">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-800 mb-1">
                                        {selectedSpace?.name}
                                    </h3>
                                    <p className="text-sm text-slate-500">{selectedSpace?.description}</p>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Seleccionar Fecha
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

                                <div className="flex-1 min-h-[300px]">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Disponibilidad
                                    </label>
                                    <DayCalendar
                                        date={formData.date}
                                        spaceName={selectedSpace.name}
                                        reservations={reservations}
                                    />
                                </div>
                            </div>

                            {/* Right Side: Form */}
                            <div className="w-full md:w-1/2 p-6 flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-slate-800">Detalles de Reserva</h3>
                                    <button
                                        onClick={handleCloseModal}
                                        className="text-slate-400 hover:text-slate-600"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="space-y-4 flex-1 overflow-y-auto pr-2">
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
                                        <p className="text-xs text-slate-500 mt-1">
                                            Revisa el calendario a la izquierda para ver disponibilidad.
                                        </p>
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
                                        <p className="text-xs text-slate-500 mt-1">
                                            Máximo: {selectedSpace.capacity}
                                        </p>
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
                                    <div className="flex items-start gap-3 pt-2">
                                        <input
                                            type="checkbox"
                                            name="agreed"
                                            required
                                            checked={formData.agreed}
                                            onChange={handleInputChange}
                                            className="mt-1 w-4 h-4 text-teal-600 rounded"
                                        />
                                        <label className="text-sm text-slate-600">
                                            Acepto el reglamento de uso de espacios comunes y me comprometo a cuidar las instalaciones.
                                        </label>
                                    </div>
                                </div>

                                {/* BOTONES */}
                                <div className="pt-6 mt-4 border-t border-slate-200 flex gap-3 justify-end">
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
                                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold shadow-lg shadow-teal-500/30"
                                    >
                                        Confirmar Reserva
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
