import { useState } from 'react'
import {
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    HandThumbUpIcon,
    InformationCircleIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const initialActiveVotings = [
    {
        id: 1,
        title: 'Renovación de Gimnasio',
        description: 'Votación para aprobar el presupuesto de renovación de máquinas del gimnasio.',
        deadline: '2025-11-30',
        options: [
            { id: 'opt1', text: 'Aprobar Presupuesto', votes: 45 },
            { id: 'opt2', text: 'Rechazar Presupuesto', votes: 12 },
            { id: 'opt3', text: 'Postergar Decisión', votes: 5 }
        ],
        totalVoters: 120,
        participation: 62, // votos actuales
        status: 'Activa',
        userVoted: null
    },
    {
        id: 2,
        title: 'Cambio de Empresa de Seguridad',
        description: 'Elección de nueva empresa de seguridad para el condominio.',
        deadline: '2025-12-05',
        options: [
            { id: 'optA', text: 'Seguridad Total S.A.', votes: 30 },
            { id: 'optB', text: 'Protección 24/7', votes: 28 },
            { id: 'optC', text: 'Mantener Actual', votes: 15 }
        ],
        totalVoters: 120,
        participation: 73,
        status: 'Activa',
        userVoted: null
    }
]

const initialCompletedVotings = [
    {
        id: 3,
        title: 'Pintura de Fachada',
        description: 'Elección de color para la pintura exterior de los edificios.',
        deadline: '2025-10-15',
        options: [
            { id: 'c1', text: 'Blanco Invierno', votes: 80 },
            { id: 'c2', text: 'Gris Perla', votes: 30 }
        ],
        totalVoters: 120,
        participation: 110,
        status: 'Finalizada',
        winner: 'Blanco Invierno',
        userVoted: 'c1'
    }
]

export default function ResidentVoting() {
    const [activeVotings, setActiveVotings] = useState(initialActiveVotings)
    const [completedVotings, setCompletedVotings] = useState(initialCompletedVotings)
    const [activeTab, setActiveTab] = useState('active')
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [selectedVote, setSelectedVote] = useState(null)

    const handleVoteClick = (votingId, optionId) => {
        const voting = activeVotings.find(v => v.id === votingId)
        const option = voting.options.find(o => o.id === optionId)
        setSelectedVote({ voting, option })
        setShowConfirmModal(true)
    }

    const confirmVote = () => {
        if (!selectedVote) return

        const updatedVotings = activeVotings.map(voting => {
            if (voting.id === selectedVote.voting.id) {
                return {
                    ...voting,
                    userVoted: selectedVote.option.id,
                    participation: voting.participation + 1,
                    options: voting.options.map(opt =>
                        opt.id === selectedVote.option.id
                            ? { ...opt, votes: opt.votes + 1 }
                            : opt
                    )
                }
            }
            return voting
        })

        setActiveVotings(updatedVotings)
        toast.success('¡Voto registrado correctamente!')
        setShowConfirmModal(false)
        setSelectedVote(null)
    }

    const getParticipationPercentage = (current, total) => {
        return Math.round((current / total) * 100)
    }

    return (
        <div className="w-full h-full p-6 lg:p-8">
            <div className="w-full mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Votaciones y Encuestas</h1>
                    <p className="mt-1 text-sm text-gray-500">Participa en las decisiones importantes de tu comunidad</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <ChartBarIcon className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Votaciones Activas</p>
                                <h3 className="text-2xl font-bold text-gray-900">{activeVotings.length}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <CheckCircleIcon className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Mis Votos</p>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {activeVotings.filter(v => v.userVoted).length + completedVotings.filter(v => v.userVoted).length}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                <HandThumbUpIcon className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Participación Promedio</p>
                                <h3 className="text-2xl font-bold text-gray-900">78%</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`${activeTab === 'active'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            En Curso
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`${activeTab === 'completed'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Finalizadas
                        </button>
                    </nav>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {activeTab === 'active' ? (
                        activeVotings.map((voting) => (
                            <div key={voting.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">
                                                Activa hasta {voting.deadline}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-900">{voting.title}</h3>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-500">Participación</div>
                                            <div className="text-lg font-bold text-blue-600">
                                                {getParticipationPercentage(voting.participation, voting.totalVoters)}%
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-6">{voting.description}</p>

                                    {voting.userVoted ? (
                                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                                            <div className="flex items-center">
                                                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                                                <span className="font-medium text-blue-900">Ya has votado en esta encuesta</span>
                                            </div>
                                            <p className="mt-1 text-sm text-blue-700 ml-7">
                                                Tu voto: <span className="font-bold">{voting.options.find(o => o.id === voting.userVoted)?.text}</span>
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {voting.options.map((option) => (
                                                <button
                                                    key={option.id}
                                                    onClick={() => handleVoteClick(voting.id, option.id)}
                                                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium text-gray-900 group-hover:text-blue-700">
                                                            {option.text}
                                                        </span>
                                                        <span className="text-gray-400 group-hover:text-blue-500">
                                                            Votar →
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <InformationCircleIcon className="h-4 w-4 mr-1" />
                                        Tu voto es anónimo y seguro
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        completedVotings.map((voting) => (
                            <div key={voting.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-2">
                                                Finalizada el {voting.deadline}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-900">{voting.title}</h3>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-500">Ganador</div>
                                            <div className="text-lg font-bold text-green-600">{voting.winner}</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4">{voting.description}</p>

                                    <div className="space-y-4">
                                        {voting.options.map((option) => {
                                            const percentage = Math.round((option.votes / voting.participation) * 100)
                                            const isWinner = option.text === voting.winner
                                            return (
                                                <div key={option.id}>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className={`font-medium ${isWinner ? 'text-green-700' : 'text-gray-700'}`}>
                                                            {option.text}
                                                        </span>
                                                        <span className="text-gray-500">{percentage}% ({option.votes} votos)</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div
                                                            className={`h-2.5 rounded-full ${isWinner ? 'bg-green-600' : 'bg-gray-400'}`}
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Confirm Vote Modal */}
                {showConfirmModal && selectedVote && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                                    <HandThumbUpIcon className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Confirmar Voto</h3>
                                <p className="text-sm text-gray-500 mb-6">
                                    Estás a punto de votar por: <br />
                                    <span className="font-bold text-gray-900 text-base block mt-2">
                                        "{selectedVote.option.text}"
                                    </span>
                                    <br />
                                    Esta acción no se puede deshacer.
                                </p>
                                <div className="flex gap-3 justify-center">
                                    <button
                                        onClick={() => setShowConfirmModal(false)}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={confirmVote}
                                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium"
                                    >
                                        Confirmar Voto
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
