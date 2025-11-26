import { useState } from 'react'
import {
    ChartBarIcon,
    PlusIcon,
    CheckCircleIcon,
    ClockIcon,
    XMarkIcon,
    TrashIcon,
    EyeIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const initialVotings = [
    {
        id: 1,
        title: 'Renovación de Gimnasio',
        description: 'Votación para aprobar el presupuesto de renovación de máquinas.',
        deadline: '2025-11-30',
        status: 'Activa',
        totalVoters: 120,
        votes: 75,
        options: [
            { id: 1, text: 'Aprobar', votes: 45 },
            { id: 2, text: 'Rechazar', votes: 20 },
            { id: 3, text: 'Abstención', votes: 10 }
        ]
    },
    {
        id: 2,
        title: 'Pintura de Fachada',
        description: 'Elección de color para la pintura exterior.',
        deadline: '2025-10-15',
        status: 'Finalizada',
        totalVoters: 120,
        votes: 110,
        options: [
            { id: 1, text: 'Blanco', votes: 80 },
            { id: 2, text: 'Gris', votes: 30 }
        ]
    }
]

export default function Voting() {
    const [votings, setVotings] = useState(initialVotings)
    const [filter, setFilter] = useState('all') // all, active, finished
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        options: ['', '']
    })

    const handleInputChange = (e, index = null) => {
        if (index !== null) {
            const newOptions = [...formData.options]
            newOptions[index] = e.target.value
            setFormData({ ...formData, options: newOptions })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const addOption = () => {
        setFormData({ ...formData, options: [...formData.options, ''] })
    }

    const removeOption = (index) => {
        if (formData.options.length > 2) {
            const newOptions = formData.options.filter((_, i) => i !== index)
            setFormData({ ...formData, options: newOptions })
        }
    }

    const handleCreateVoting = (e) => {
        e.preventDefault()
        if (!formData.title || !formData.deadline || formData.options.some(opt => !opt.trim())) {
            toast.error('Por favor completa todos los campos')
            return
        }

        const newVoting = {
            id: Date.now(),
            ...formData,
            status: 'Activa',
            totalVoters: 120, // Simulado
            votes: 0,
            options: formData.options.map((opt, i) => ({ id: i, text: opt, votes: 0 }))
        }

        setVotings([newVoting, ...votings])
        toast.success('Votación creada exitosamente')
        setShowCreateModal(false)
        setFormData({ title: '', description: '', deadline: '', options: ['', ''] })
    }

    const handleCloseVoting = (id) => {
        if (window.confirm('¿Estás seguro de finalizar esta votación?')) {
            setVotings(votings.map(v => v.id === id ? { ...v, status: 'Finalizada' } : v))
            toast.success('Votación finalizada')
        }
    }

    const filteredVotings = votings.filter(v => {
        if (filter === 'active') return v.status === 'Activa'
        if (filter === 'finished') return v.status === 'Finalizada'
        return true
    })

    const getParticipationPercentage = (votes, total) => {
        return Math.round((votes / total) * 100)
    }

    return (
        <div className="w-full h-full p-6 lg:p-8">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Votaciones</h1>
                        <p className="mt-1 text-sm text-gray-500">Gestiona las consultas y decisiones comunitarias</p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                        Nueva Votación
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <ChartBarIcon className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Votaciones Activas</p>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {votings.filter(v => v.status === 'Activa').length}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <CheckCircleIcon className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Participación Promedio</p>
                                <h3 className="text-2xl font-bold text-gray-900">72%</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                <ClockIcon className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Finalizadas este mes</p>
                                <h3 className="text-2xl font-bold text-gray-900">3</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex space-x-2 mb-6">
                    {['all', 'active', 'finished'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${filter === f
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            {f === 'all' ? 'Todas' : f === 'active' ? 'Activas' : 'Finalizadas'}
                        </button>
                    ))}
                </div>

                {/* Votings List */}
                <div className="grid gap-6">
                    {filteredVotings.map((voting) => (
                        <div key={voting.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${voting.status === 'Activa'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {voting.status}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                Vence: {voting.deadline}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">{voting.title}</h3>
                                        <p className="text-gray-500 mt-1">{voting.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {voting.status === 'Activa' && (
                                            <button
                                                onClick={() => handleCloseVoting(voting.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
                                                title="Finalizar Votación"
                                            >
                                                <XMarkIcon className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Progress Bars */}
                                <div className="space-y-4 mt-6">
                                    {voting.options.map((option) => {
                                        const percentage = voting.votes > 0
                                            ? Math.round((option.votes / voting.votes) * 100)
                                            : 0
                                        return (
                                            <div key={option.id}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-medium text-gray-700">{option.text}</span>
                                                    <span className="text-gray-500">{percentage}% ({option.votes} votos)</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                                    <div
                                                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Footer Stats */}
                                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-4">
                                        <span>Total Votos: {voting.votes}</span>
                                        <span>Participación: {getParticipationPercentage(voting.votes, voting.totalVoters)}%</span>
                                    </div>
                                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                                        Ver Detalles Completos →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Create Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-900">Nueva Votación</h3>
                                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateVoting} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ej: Renovación de Gimnasio"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Detalles de la votación..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Límite</label>
                                    <input
                                        type="date"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Opciones</label>
                                    <div className="space-y-3">
                                        {formData.options.map((opt, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={opt}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    placeholder={`Opción ${index + 1}`}
                                                />
                                                {formData.options.length > 2 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeOption(index)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addOption}
                                            className="text-sm text-blue-600 font-medium hover:text-blue-800 flex items-center"
                                        >
                                            <PlusIcon className="h-4 w-4 mr-1" />
                                            Agregar Opción
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-200 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                    >
                                        Crear Votación
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
