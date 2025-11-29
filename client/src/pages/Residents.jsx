import { useState, useEffect } from 'react'
import {
    PlusIcon,
    MagnifyingGlassIcon,
    EnvelopeIcon,
    PhoneIcon,
    PencilSquareIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import { supabase } from '../config/supabase'
import toast from 'react-hot-toast'

const ResidentCard = ({ resident, onEdit }) => (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="p-6">
            {/* Header with avatar and menu */}
            <div className="flex items-start justify-between mb-4">
                <div className={`h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl text-white font-bold shadow-lg`}>
                    {resident.full_name?.charAt(0) || resident.email?.charAt(0) || '?'}
                </div>
                <button
                    onClick={() => onEdit(resident)}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                    title="Editar Residente"
                >
                    <PencilSquareIcon className="h-5 w-5" />
                </button>
            </div>

            {/* Name and Unit */}
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{resident.full_name || 'Sin Nombre'}</h3>
            <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                    {resident.unit_id || 'Sin Unidad'}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${resident.user_type === 'Propietario' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                    }`}>
                    {resident.user_type || 'Residente'}
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
                    <span>{resident.phone || 'Sin teléfono'}</span>
                </div>
                {resident.rut && (
                    <div className="flex items-center text-sm text-gray-600">
                        <span className="font-mono text-xs bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
                            RUT: {resident.rut}
                        </span>
                    </div>
                )}
            </div>
        </div>
    </div>
)

export default function Residents() {
    const [residents, setResidents] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [editingResident, setEditingResident] = useState(null)
    const [formData, setFormData] = useState({
        full_name: '',
        rut: '',
        unit_id: '',
        phone: '',
        user_type: 'Propietario',
        status: 'Activo'
    })

    useEffect(() => {
        fetchResidents()
    }, [])

    const fetchResidents = async () => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .neq('role', 'admin') // Opcional: Ocultar admins si se desea
                .order('created_at', { ascending: false })

            if (error) throw error
            setResidents(data || [])
        } catch (error) {
            console.error('Error fetching residents:', error)
            toast.error('Error al cargar residentes')
        } finally {
            setLoading(false)
        }
    }

    const handleEditClick = (resident) => {
        setEditingResident(resident)
        setFormData({
            full_name: resident.full_name || '',
            rut: resident.rut || '',
            unit_id: resident.unit_id || '',
            phone: resident.phone || '',
            user_type: resident.user_type || 'Propietario',
            status: resident.status || 'Activo'
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { error } = await supabase
                .from('users')
                .update(formData)
                .eq('id', editingResident.id)

            if (error) throw error

            toast.success('Residente actualizado correctamente')
            setEditingResident(null)
            fetchResidents()
        } catch (error) {
            console.error('Error updating resident:', error)
            toast.error('Error al actualizar: ' + error.message)
        }
    }

    const filteredResidents = residents.filter(r =>
        (r.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (r.unit_id?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (r.rut?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (r.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    )

    return (
        <div className="w-full h-full p-6 lg:p-8">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between mb-6">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold text-gray-900">Directorio de Residentes</h2>
                    <p className="mt-1 text-sm text-gray-500">Gestión de propietarios y arrendatarios</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                        placeholder="Buscar por nombre, unidad, RUT o email..."
                    />
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="text-center py-10">Cargando residentes...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResidents.map(resident => (
                        <ResidentCard
                            key={resident.id}
                            resident={resident}
                            onEdit={handleEditClick}
                        />
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {editingResident && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Editar Residente</h3>
                            <button onClick={() => setEditingResident(null)} className="text-gray-400 hover:text-gray-600">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                                <input
                                    type="text"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">RUT (ID)</label>
                                    <input
                                        type="text"
                                        value={formData.rut}
                                        onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
                                        placeholder="12.345.678-9"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Unidad (Depto)</label>
                                    <input
                                        type="text"
                                        value={formData.unit_id}
                                        onChange={(e) => setFormData({ ...formData, unit_id: e.target.value })}
                                        placeholder="A-101"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                    <select
                                        value={formData.user_type}
                                        onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Propietario">Propietario</option>
                                        <option value="Arrendatario">Arrendatario</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setEditingResident(null)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
