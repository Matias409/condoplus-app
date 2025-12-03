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
import { createClient } from '@supabase/supabase-js'
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

    // Edit State
    const [editingResident, setEditingResident] = useState(null)
    const [editFormData, setEditFormData] = useState({
        full_name: '',
        rut: '',
        unit_id: '',
        phone: '',
        user_type: 'Propietario',
        status: 'Activo'
    })

    // Create State
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        email: '',
        password: '',
        full_name: '',
        rut: '',
        unit_id: '',
        phone: '',
        user_type: 'Propietario'
    })

    useEffect(() => {
        fetchResidents()
    }, [])

    const fetchResidents = async () => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .neq('role', 'admin')
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
        setEditFormData({
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
                .update(editFormData)
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

    const handleCreate = async (e) => {
        e.preventDefault()

        // Validate required fields
        if (!createFormData.email || !createFormData.password || !createFormData.full_name) {
            toast.error('Email, contraseña y nombre son obligatorios')
            return
        }

        try {
            // Call backend to invite user
            // In production (Vercel/Railway), use relative path or env var. In dev, use localhost
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

            const response = await fetch(`${backendUrl}/api/residents/invite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createFormData)
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar invitación')
            }

            toast.success('Invitación enviada correctamente')
            setShowCreateModal(false)
            setCreateFormData({
                email: '',
                full_name: '',
                rut: '',
                unit_id: '',
                phone: '',
                user_type: 'Propietario'
            })
            fetchResidents()

        } catch (error) {
            console.error('Error inviting resident:', error)
            toast.error('Error al invitar residente: ' + error.message)
        }
    }

    const filteredResidents = residents.filter(r =>
        (r.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (r.unit_id?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (r.rut?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (r.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    )

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar a este residente?')) {
            return
        }

        try {
            const { error } = await supabase
                .from('users')
                .delete()
                .eq('id', id)

            if (error) throw error

            toast.success('Residente eliminado correctamente')
            setEditingResident(null)
            fetchResidents()
        } catch (error) {
            console.error('Error deleting resident:', error)
            toast.error('Error al eliminar: ' + error.message)
        }
    }

    return (
        <div className="w-full h-full p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Directorio de Residentes</h2>
                    <p className="mt-1 text-sm text-gray-500">Gestión de propietarios y arrendatarios</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full md:w-auto"
                >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Nuevo Residente
                </button>
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
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
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
                                    value={editFormData.full_name}
                                    onChange={(e) => setEditFormData({ ...editFormData, full_name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">RUT (ID)</label>
                                    <input
                                        type="text"
                                        value={editFormData.rut}
                                        onChange={(e) => setEditFormData({ ...editFormData, rut: e.target.value })}
                                        placeholder="12.345.678-9"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Unidad (Depto)</label>
                                    <input
                                        type="text"
                                        value={editFormData.unit_id}
                                        onChange={(e) => setEditFormData({ ...editFormData, unit_id: e.target.value })}
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
                                        value={editFormData.phone}
                                        onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                    <select
                                        value={editFormData.user_type}
                                        onChange={(e) => setEditFormData({ ...editFormData, user_type: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Propietario">Propietario</option>
                                        <option value="Arrendatario">Arrendatario</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={() => handleDelete(editingResident.id)}
                                    className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-medium transition-colors border border-red-200"
                                >
                                    Eliminar Residente
                                </button>
                                <div className="flex gap-3">
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
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Nuevo Residente</h3>
                            <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={createFormData.email}
                                    onChange={(e) => setCreateFormData({ ...createFormData, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="correo@ejemplo.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña *</label>
                                <input
                                    type="password"
                                    required
                                    minLength={6}
                                    value={createFormData.password}
                                    onChange={(e) => setCreateFormData({ ...createFormData, password: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Mínimo 6 caracteres"
                                />
                            </div>



                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
                                <input
                                    type="text"
                                    required
                                    value={createFormData.full_name}
                                    onChange={(e) => setCreateFormData({ ...createFormData, full_name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Juan Pérez"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">RUT (ID)</label>
                                    <input
                                        type="text"
                                        value={createFormData.rut}
                                        onChange={(e) => setCreateFormData({ ...createFormData, rut: e.target.value })}
                                        placeholder="12.345.678-9"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Unidad (Depto)</label>
                                    <input
                                        type="text"
                                        value={createFormData.unit_id}
                                        onChange={(e) => setCreateFormData({ ...createFormData, unit_id: e.target.value })}
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
                                        value={createFormData.phone}
                                        onChange={(e) => setCreateFormData({ ...createFormData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                    <select
                                        value={createFormData.user_type}
                                        onChange={(e) => setCreateFormData({ ...createFormData, user_type: e.target.value })}
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
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
                                >
                                    Crear Residente
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
