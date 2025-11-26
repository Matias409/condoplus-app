import {
    PlusIcon,
    MagnifyingGlassIcon,
    EnvelopeIcon,
    PhoneIcon
} from '@heroicons/react/24/outline'
import {
    MessageSquare,
    MoreVertical
} from 'lucide-react'

const residents = [
    {
        id: 1,
        name: 'Carlos Ruiz',
        unit: 'A-402',
        tower: 'A',
        type: 'Propietario',
        email: 'carlos.ruiz@email.com',
        phone: '+56 9 1234 5678',
        status: 'Activo',
        avatar: { initial: 'C', color: 'bg-blue-500' }
    },
    {
        id: 2,
        name: 'Ana María Polo',
        unit: 'B-105',
        tower: 'B',
        type: 'Arrendatario',
        email: 'ana.polo@email.com',
        phone: '+56 9 8765 4321',
        status: 'Activo',
        avatar: { initial: 'A', color: 'bg-cyan-500' }
    },
    {
        id: 3,
        name: 'Jorge Alis',
        unit: 'A-202',
        tower: 'A',
        type: 'Propietario',
        email: 'jorge.alis@email.com',
        phone: '+56 9 1111 2222',
        status: 'Moroso',
        avatar: { initial: 'J', color: 'bg-purple-500' }
    },
    {
        id: 4,
        name: 'Lucía Mendez',
        unit: 'C-808',
        tower: 'C',
        type: 'Arrendatario',
        email: 'lucia.m@email.com',
        phone: '+56 9 3333 4444',
        status: 'Activo',
        avatar: { initial: 'L', color: 'bg-pink-500' }
    },
    {
        id: 5,
        name: 'Pedro Pascal',
        unit: 'B-303',
        tower: 'B',
        type: 'Propietario',
        email: 'pedro.p@email.com',
        phone: '+56 9 5555 6666',
        status: 'Activo',
        avatar: { initial: 'P', color: 'bg-orange-500' }
    },
    {
        id: 6,
        name: 'Marta Sanchez',
        unit: 'A-101',
        tower: 'A',
        type: 'Propietario',
        email: 'marta.s@email.com',
        phone: '+56 9 7777 8888',
        status: 'Activo',
        avatar: { initial: 'M', color: 'bg-teal-500' }
    },
    {
        id: 7,
        name: 'Roberto Gómez',
        unit: 'C-505',
        tower: 'C',
        type: 'Arrendatario',
        email: 'roberto.g@email.com',
        phone: '+56 9 9999 0000',
        status: 'Inactivo',
        avatar: { initial: 'R', color: 'bg-indigo-500' }
    },
    {
        id: 8,
        name: 'Sofía Martínez',
        unit: 'B-204',
        tower: 'B',
        type: 'Propietario',
        email: 'sofia.m@email.com',
        phone: '+56 9 1122 3344',
        status: 'Activo',
        avatar: { initial: 'S', color: 'bg-rose-500' }
    }
]

const ResidentCard = ({ resident }) => (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="p-6">
            {/* Header with avatar and menu */}
            <div className="flex items-start justify-between mb-4">
                <div className={`h-16 w-16 rounded-full ${resident.avatar.color} flex items-center justify-center text-2xl text-white font-bold shadow-lg`}>
                    {resident.avatar.initial}
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-5 w-5" />
                </button>
            </div>

            {/* Name and Unit */}
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{resident.name}</h3>
            <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                    {resident.unit}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${resident.type === 'Propietario' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                    }`}>
                    {resident.type}
                </span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                    <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="truncate">{resident.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{resident.phone}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Ver Pagos
                </button>
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Mensaje
                </button>
            </div>
        </div>
    </div>
)

export default function Residents() {
    return (
        <div className="w-full h-full p-6 lg:p-8">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between mb-6">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold text-gray-900">Directorio de Residentes</h2>
                    <p className="mt-1 text-sm text-gray-500">Gestión de propietarios y arrendatarios</p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-4">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                        Nuevo Residente
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                            placeholder="Buscar por nombre, unidad o rut..."
                        />
                    </div>
                    <select className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md">
                        <option>Todas las Torres</option>
                        <option>Torre A</option>
                        <option>Torre B</option>
                        <option>Torre C</option>
                    </select>
                    <select className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md">
                        <option>Todos los Tipos</option>
                        <option>Propietario</option>
                        <option>Arrendatario</option>
                    </select>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {residents.map(resident => (
                    <ResidentCard key={resident.id} resident={resident} />
                ))}
            </div>
        </div>
    )
}
