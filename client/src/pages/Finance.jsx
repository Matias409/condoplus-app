import { useState, useEffect, useMemo } from 'react'
import {
    PaperAirplaneIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowDownTrayIcon,
    EyeIcon,
    XMarkIcon,
    PencilIcon,
    TrashIcon,
    BanknotesIcon,
    ClockIcon,
    ExclamationCircleIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline'
import { supabase } from '../config/supabase'
import toast from 'react-hot-toast'

export default function Finance() {
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [filterPeriod, setFilterPeriod] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')

    // New States for Enhancements
    const [creationType, setCreationType] = useState('all') // 'all' or 'specific'
    const [residentsList, setResidentsList] = useState([])
    const [selectedResidents, setSelectedResidents] = useState([])

    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editingPayment, setEditingPayment] = useState(null)
    const [newAmount, setNewAmount] = useState('')

    // Bulk Actions State
    const [selectedPayments, setSelectedPayments] = useState([])

    // Form Data for new expense
    const [formData, setFormData] = useState({
        period: '',
        amount: '',
        due_date: '',
        description: ''
    })

    const periods = [
        'Enero 2025', 'Febrero 2025', 'Marzo 2025', 'Abril 2025',
        'Mayo 2025', 'Junio 2025', 'Julio 2025', 'Agosto 2025',
        'Septiembre 2025', 'Octubre 2025', 'Noviembre 2025', 'Diciembre 2025'
    ]

    useEffect(() => {
        fetchPayments()
    }, [])

    // Fetch residents when modal opens
    useEffect(() => {
        if (showModal) {
            fetchResidents()
        }
    }, [showModal])

    const fetchResidents = async () => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('id, email, full_name, unit_id')
                .eq('role', 'resident')
                .order('full_name')

            if (error) throw error
            setResidentsList(data || [])
        } catch (error) {
            console.error('Error fetching residents:', error)
            toast.error('Error al cargar lista de residentes')
        }
    }

    const fetchPayments = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('payments')
                .select(`
                    *,
                    user:user_id (
                        id,
                        email,
                        full_name
                    )
                `)
                .order('due_date', { ascending: false })
                .limit(100)

            if (error) throw error
            setPayments(data)
            setSelectedPayments([]) // Reset selection on reload
        } catch (error) {
            console.error('Error:', error)
            toast.error('Error al cargar pagos')
        } finally {
            setLoading(false)
        }
    }

    const handleCreateExpense = async (e) => {
        e.preventDefault()

        if (creationType === 'specific' && selectedResidents.length === 0) {
            toast.error('Debes seleccionar al menos un residente')
            return
        }

        try {
            let targetResidents = []

            if (creationType === 'all') {
                targetResidents = residentsList
            } else {
                targetResidents = residentsList.filter(r => selectedResidents.includes(r.id))
            }

            if (!targetResidents || targetResidents.length === 0) {
                toast.error('No hay residentes seleccionados')
                return
            }

            // Crear un pago para CADA residente seleccionado
            const paymentsToInsert = targetResidents.map(resident => ({
                user_id: resident.id,
                amount: parseFloat(formData.amount),
                due_date: formData.due_date,
                period: formData.period,
                description: formData.description,
                status: 'pending',
                payment_method: null,
                paid_at: null
            }))

            const { error: paymentsError } = await supabase
                .from('payments')
                .insert(paymentsToInsert)

            if (paymentsError) throw paymentsError

            toast.success(`✅ Gasto común creado para ${targetResidents.length} residentes`)
            setShowModal(false)
            setFormData({ period: '', amount: '', due_date: '', description: '' })
            setCreationType('all')
            setSelectedResidents([])
            await fetchPayments()

        } catch (error) {
            console.error('Error creating expense:', error)
            toast.error(`❌ Error al crear gasto común: ${error.message || 'Error desconocido'}`)
        }
    }

    const handleEditPayment = (payment) => {
        setEditingPayment(payment)
        setNewAmount(payment.amount)
        setEditModalOpen(true)
    }

    const handleUpdateAmount = async () => {
        if (!editingPayment) return

        try {
            const { error } = await supabase
                .from('payments')
                .update({ amount: parseFloat(newAmount) })
                .eq('id', editingPayment.id)

            if (error) throw error

            toast.success('Monto actualizado correctamente')
            setEditModalOpen(false)
            setEditingPayment(null)
            fetchPayments()
        } catch (error) {
            console.error('Error updating payment:', error)
            toast.error('Error al actualizar el monto')
        }
    }

    const handleDeletePayment = async (payment) => {
        if (payment.status === 'paid' || payment.status === 'approved') {
            toast.error('No se pueden eliminar pagos ya realizados')
            return
        }

        if (!window.confirm('¿Estás seguro de que deseas eliminar este pago? Esta acción no se puede deshacer.')) {
            return
        }

        try {
            const { error } = await supabase
                .from('payments')
                .delete()
                .eq('id', payment.id)

            if (error) throw error

            toast.success('Pago eliminado correctamente')
            fetchPayments()
        } catch (error) {
            console.error('Error deleting payment:', error)
            toast.error('Error al eliminar el pago')
        }
    }

    const handleBulkDelete = async () => {
        if (selectedPayments.length === 0) return

        if (!window.confirm(`¿Estás seguro de eliminar ${selectedPayments.length} pagos seleccionados?`)) {
            return
        }

        try {
            const { error } = await supabase
                .from('payments')
                .delete()
                .in('id', selectedPayments)

            if (error) throw error

            toast.success(`${selectedPayments.length} pagos eliminados correctamente`)
            fetchPayments()
        } catch (error) {
            console.error('Error bulk deleting:', error)
            toast.error('Error al eliminar pagos seleccionados')
        }
    }

    const toggleResidentSelection = (residentId) => {
        setSelectedResidents(prev => {
            if (prev.includes(residentId)) {
                return prev.filter(id => id !== residentId)
            } else {
                return [...prev, residentId]
            }
        })
    }

    const togglePaymentSelection = (paymentId) => {
        setSelectedPayments(prev => {
            if (prev.includes(paymentId)) {
                return prev.filter(id => id !== paymentId)
            } else {
                return [...prev, paymentId]
            }
        })
    }

    const toggleSelectAllPayments = () => {
        if (selectedPayments.length === filteredPayments.length) {
            setSelectedPayments([])
        } else {
            // Solo seleccionar los que se pueden borrar (no pagados)
            const deletablePayments = filteredPayments
                .filter(p => p.status !== 'paid' && p.status !== 'approved')
                .map(p => p.id)

            if (deletablePayments.length === 0) {
                toast('No hay pagos pendientes para seleccionar en esta vista', { icon: 'ℹ️' })
            }
            setSelectedPayments(deletablePayments)
        }
    }

    // Filter logic
    const filteredPayments = payments.filter(payment => {
        const matchesSearch =
            payment.user?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesPeriod = filterPeriod ? payment.period === filterPeriod : true
        const matchesStatus = filterStatus !== 'all' ? payment.status === filterStatus : true

        return matchesSearch && matchesPeriod && matchesStatus
    })

    // Calculate Stats
    const stats = useMemo(() => {
        const totalCollected = filteredPayments
            .filter(p => p.status === 'paid' || p.status === 'approved')
            .reduce((sum, p) => sum + (p.amount || 0), 0)

        const totalPending = filteredPayments
            .filter(p => p.status === 'pending')
            .reduce((sum, p) => sum + (p.amount || 0), 0)

        const totalOverdue = filteredPayments
            .filter(p => p.status === 'overdue')
            .reduce((sum, p) => sum + (p.amount || 0), 0)

        const totalCount = filteredPayments.length
        const paidCount = filteredPayments.filter(p => p.status === 'paid' || p.status === 'approved').length
        const collectionRate = totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0

        return {
            totalCollected,
            totalPending,
            totalOverdue,
            collectionRate
        }
    }, [filteredPayments])

    return (
        <div className="w-full h-full p-6 lg:p-8">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            Gestión Financiera
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Control de gastos comunes y recaudación
                        </p>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                        {selectedPayments.length > 0 && (
                            <button
                                type="button"
                                onClick={handleBulkDelete}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                Eliminar ({selectedPayments.length})
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Crear Gasto Común
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <BanknotesIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Recaudado</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">${stats.totalCollected.toLocaleString()}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <ClockIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Por Cobrar</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">${stats.totalPending.toLocaleString()}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <ExclamationCircleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Vencido</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">${stats.totalOverdue.toLocaleString()}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <ChartBarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Tasa de Cobro</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">{stats.collectionRate}%</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                                placeholder="Buscar por nombre o email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-3">
                            <select
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                value={filterPeriod}
                                onChange={(e) => setFilterPeriod(e.target.value)}
                            >
                                <option value="">Todos los períodos</option>
                                {periods.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            <select
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">Todos los estados</option>
                                <option value="pending">Pendiente</option>
                                <option value="paid">Pagado</option>
                                <option value="approved">Aprobado</option>
                                <option value="overdue">Vencido</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                {loading ? (
                                    <div className="p-10 text-center text-gray-500">Cargando pagos...</div>
                                ) : (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                        checked={selectedPayments.length > 0 && selectedPayments.length === filteredPayments.length}
                                                        onChange={toggleSelectAllPayments}
                                                    />
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Residente
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Período
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Vencimiento
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Monto
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Estado
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Fecha Pago
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredPayments.map((payment) => (
                                                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                            checked={selectedPayments.includes(payment.id)}
                                                            onChange={() => togglePaymentSelection(payment.id)}
                                                            disabled={payment.status === 'paid' || payment.status === 'approved'}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{payment.user?.full_name || 'Desconocido'}</div>
                                                        <div className="text-sm text-gray-500">{payment.user?.email || ''}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {payment.period}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(payment.due_date).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                        ${payment.amount?.toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${payment.status === 'paid' || payment.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                            payment.status === 'overdue' ? 'bg-red-100 text-red-800' :
                                                                'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {payment.status === 'paid' || payment.status === 'approved' ? 'Pagado' :
                                                                payment.status === 'overdue' ? 'Vencido' : 'Pendiente'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString() : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() => handleEditPayment(payment)}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                            title="Editar Monto"
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeletePayment(payment)}
                                                            className={`text-red-600 hover:text-red-900 ${(payment.status === 'paid' || payment.status === 'approved') ? 'opacity-50 cursor-not-allowed' : ''
                                                                }`}
                                                            disabled={payment.status === 'paid' || payment.status === 'approved'}
                                                            title="Eliminar Pago"
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Crear Gasto Común */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Crear Gasto Común
                                </h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-500 transition-colors"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateExpense} className="space-y-6">
                                <div>
                                    <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">Período</label>
                                    <select
                                        id="period"
                                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                        value={formData.period}
                                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                        required
                                    >
                                        <option value="">Seleccionar período</option>
                                        {periods.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Monto Base</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input
                                            type="number"
                                            id="amount"
                                            className="focus:ring-primary focus:border-primary block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="85000"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento</label>
                                    <input
                                        type="date"
                                        id="due_date"
                                        className="focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        value={formData.due_date}
                                        onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <textarea
                                        id="description"
                                        rows={3}
                                        className="focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Incluye: agua, luz, gas común, mantención áreas verdes..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Selección de Residentes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Destinatarios</label>
                                    <div className="flex items-center space-x-4 mb-3">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio text-primary"
                                                name="creationType"
                                                value="all"
                                                checked={creationType === 'all'}
                                                onChange={() => setCreationType('all')}
                                            />
                                            <span className="ml-2">Todos los residentes</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio text-primary"
                                                name="creationType"
                                                value="specific"
                                                checked={creationType === 'specific'}
                                                onChange={() => setCreationType('specific')}
                                            />
                                            <span className="ml-2">Residentes específicos</span>
                                        </label>
                                    </div>

                                    {creationType === 'specific' && (
                                        <div className="border rounded-md p-3 max-h-40 overflow-y-auto bg-gray-50">
                                            {residentsList.length > 0 ? (
                                                residentsList.map(resident => (
                                                    <div key={resident.id} className="flex items-center mb-2 last:mb-0">
                                                        <input
                                                            type="checkbox"
                                                            id={`res-${resident.id}`}
                                                            checked={selectedResidents.includes(resident.id)}
                                                            onChange={() => toggleResidentSelection(resident.id)}
                                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                        />
                                                        <label htmlFor={`res-${resident.id}`} className="ml-2 block text-sm text-gray-900">
                                                            {resident.full_name} <span className="text-gray-500">({resident.email})</span>
                                                        </label>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-500">Cargando residentes...</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
                                    >
                                        {creationType === 'all' ? 'Crear para Todos' : `Crear para ${selectedResidents.length} Residentes`}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Editar Monto */}
            {editModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Editar Monto</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Modificar monto para: <br />
                                <span className="font-semibold">{editingPayment?.user?.full_name}</span>
                            </p>

                            <div className="mb-4">
                                <label htmlFor="edit-amount" className="block text-sm font-medium text-gray-700 mb-1">Nuevo Monto</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        id="edit-amount"
                                        className="focus:ring-primary focus:border-primary block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                                        value={newAmount}
                                        onChange={(e) => setNewAmount(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setEditModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleUpdateAmount}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-orange-600"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
